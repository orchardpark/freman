import jwt
import oauthlib.oauth2.rfc6749.errors
from flask import Flask, jsonify, request
from flask_cors import CORS
from entities.entity import Session, engine, Base
from entities.loggedtime import NO_TASK, LoggedTime, LoggedTimeSchema
from entities.task import Task, TaskSchema
from entities.user import User, GithubUser, BlackListError, UserSchema, AuthTokenType
from sqlalchemy import func
from typing import List
import logging
import requests
from requests.exceptions import JSONDecodeError
from oauthlib.oauth2 import WebApplicationClient
import config

logging.basicConfig(level=logging.INFO)
# creating the Flask application
app = Flask(__name__)

CORS(app, origins=['http://localhost:3000', 'https://freman.pro:3000', 'https://localhost:3000'])

# if needed, generate database schema
Base.metadata.create_all(engine)


def get_token_data_from_header():
    # fetch user token
    auth_header = request.headers.get('Authorization')
    if auth_header:
        auth_token = auth_header.split(' ')[1]
        logging.info('Getting token {}'.format(auth_token))
    else:
        auth_token = ''
    user_id, user_type = User.decode_auth_token(Session, auth_token)

    return int(user_id), AuthTokenType[user_type]


# region LOGIN


@app.route('/github_login')
def github_login():
    """
    :return: JWT authentication token
    """
    code = request.args.get('code')

    client_id = config.github['client_id']
    client_secret = config.github['client_secret']
    client = WebApplicationClient(client_id)

    x = requests.post('https://github.com/login/oauth/access_token',
                      {'client_id': client_id, 'client_secret': client_secret, 'code': code})
    try:
        res = client.parse_request_body_response(x.text)
        logging.info('Access token' + res['access_token'])
        user_info = requests.get('https://api.github.com/user',
                                 headers={'Authorization': 'token {}'.format(res['access_token'])}).json()
        # create user if not exists
        session = Session()
        github_id = int(user_info['id'])
        user = session.query(GithubUser).filter(GithubUser.id == github_id).first()
        if not user:
            new_user = User(user_info['name'])
            session.add(new_user)
            session.commit()
            new_github_user = GithubUser(id=github_id,
                                         login=user_info['login'],
                                         user_id=new_user.id,
                                         name=user_info['name'],
                                         company=user_info['company'],
                                         twitter_username=user_info['twitter_username'],
                                         email=user_info['email'],
                                         location=user_info['location'])
            session.add(new_github_user)
            user = new_github_user
        token = User.encode_auth_token(user.user_id)
        logging.info('Created token {} for user {}'.format(token, user.user_id))
        session.commit()
        session.close()
        return jsonify(token)

    except (JSONDecodeError, oauthlib.oauth2.rfc6749.errors.CustomOAuth2Error) as error:
        logging.info('Failed to decode: '+x.text)
        return 'Failed to obtain token', 400


@app.route('/account')
def get_account():
    try:
        user_id, user_type = get_token_data_from_header()
    except BlackListError:
        logging.error('token blacklisted')
        return 'Authentication token blacklisted', 401
    except jwt.ExpiredSignatureError:
        logging.error('token expired')
        return 'Expired Signature', 401
    except jwt.InvalidTokenError:
        logging.error('token invalid')
        return 'Invalid token', 401
    if user_type != AuthTokenType.USER:
        logging.error('token type wrong', user_id, user_type)
        return 'Wrong token type', 401
    session = Session()
    user = session.query(User).filter(User.id == user_id).first()
    session.close()
    schema = UserSchema()
    return jsonify(schema.dump(user))


@app.route('/request_api_token')
def request_api_token():
    try:
        user_id, user_type = get_token_data_from_header()
    except BlackListError:
        return 'Authentication token blacklisted', 401
    except jwt.ExpiredSignatureError:
        return 'Expired Signature', 401
    except jwt.InvalidTokenError:
        return 'Invalid token', 401
    if user_type != AuthTokenType.USER:
        return 'Wrong token type', 401
    token = User.encode_api_token(user_id)
    return jsonify(token)


@app.route('/validate_token')
def validate_token():
    try:
        logging.info(request.headers)
        user_id, user_type = get_token_data_from_header()
    except BlackListError:
        logging.info("Blacklisted token")
        return 'Authentication token blacklisted', 401
    except jwt.ExpiredSignatureError:
        logging.info("Expired token")
        return 'Expired Signature', 401
    except jwt.InvalidTokenError:
        logging.info("Invalid token")
        return 'Invalid token', 401
    return 'OK: {} token'.format(user_type.name), 200

# endregion

# region LOGGED TIME


@app.route('/logged')
def get_logged_time():
    """
    :return: The logged items that have not been assigned
    """
    try:
        user_id, user_type = get_token_data_from_header()
    except BlackListError:
        return 'Authentication token blacklisted', 401
    except jwt.ExpiredSignatureError:
        return 'Expired Signature', 401
    except jwt.InvalidTokenError:
        return 'Invalid token', 401
    if user_type != AuthTokenType.USER:
        return 'Wrong token type', 401

    # fetching from the database
    session = Session()
    # group logged time by (application_name)
    logged_time_objects = \
        session.query(LoggedTime.application_name,
                      func.sum(LoggedTime.logged_time_seconds).label('logged_time_seconds'),
                      func.min(LoggedTime.created_at).label('created_at'),
                      func.max(LoggedTime.updated_at).label('updated_at'),
                      func.min(LoggedTime.id).label('id')
                      ) \
        .filter(LoggedTime.task_id == NO_TASK, LoggedTime.user_id == user_id) \
        .group_by(LoggedTime.application_name) \
        .all()

    # transforming into JSON-serializable objects
    schema = LoggedTimeSchema(many=True)
    logged_time = schema.dump(logged_time_objects)

    # serializing as JSON
    session.close()
    return jsonify(logged_time)


@app.route('/logtime', methods=['POST'])
def log_time():
    try:
        user_id, user_type = get_token_data_from_header()
    except BlackListError:
        return 'Authentication token blacklisted', 401
    except jwt.ExpiredSignatureError:
        return 'Expired Signature', 401
    except jwt.InvalidTokenError:
        return 'Invalid token', 401

    if user_type != AuthTokenType.LOGGER:
        return 'Wrong token type', 401

    logged_time = LoggedTimeSchema(only=('application_name', 'logged_time_seconds'), many=True) \
        .load(request.get_json())
    logged_time_objects = list(map(lambda x: LoggedTime(**x, user_id=user_id), logged_time))

    session = Session()
    session.bulk_save_objects(logged_time_objects)
    session.commit()
    session.close()
    return 'OK'

# endregion
# region BOOKED TIME


@app.route('/bookedtime')
def get_booked_time():
    try:
        user_id, user_type = get_token_data_from_header()
    except BlackListError:
        return 'Authentication token blacklisted', 401
    except jwt.ExpiredSignatureError:
        return 'Expired Signature', 401
    except jwt.InvalidTokenError:
        return 'Invalid token', 401

    if user_type != AuthTokenType.USER:
        return 'Wrong token type', 401

    # fetching from the database
    session = Session()
    booked_time_objects = session.query(LoggedTime).filter(LoggedTime.task_id != NO_TASK, LoggedTime.user_id == user_id).all()

    # transforming into JSON-serializable objects
    schema = LoggedTimeSchema(many=True)
    booked_time = schema.dump(booked_time_objects)

    # serializing as JSON
    session.close()
    return jsonify(booked_time)


@app.route('/booktime', methods=['POST'])
def book_time():
    try:
        user_id, user_type = get_token_data_from_header()
    except BlackListError:
        return 'Authentication token blacklisted', 401
    except jwt.ExpiredSignatureError:
        return 'Expired Signature', 401
    except jwt.InvalidTokenError:
        return 'Invalid token', 401

    if user_type != AuthTokenType.USER:
        return 'Wrong token type', 401

    data = request.get_json()
    application_name = data.get('application_name')
    task_id = data.get('task_id')
    logging.info(f"Logging application {application_name} on task_id {task_id}, for user {user_id}")

    session = Session()
    booked_time_objects: List[LoggedTime] = session.query(LoggedTime). \
        filter(LoggedTime.application_name == application_name,
               LoggedTime.task_id == -1,
               LoggedTime.user_id == user_id
               ).all()
    for booked_time_object in booked_time_objects:
        booked_time_object.task_id = task_id
    session.commit()
    session.close()
    return 'OK'

# endregion
# region TASKS


@app.route('/removetask', methods=['POST'])
def remove_task():
    try:
        user_id, user_type = get_token_data_from_header()
    except BlackListError:
        return 'Authentication token blacklisted', 401
    except jwt.ExpiredSignatureError:
        return 'Expired Signature', 401
    except jwt.InvalidTokenError:
        return 'Invalid token', 401

    if user_type != AuthTokenType.USER:
        return 'Wrong token type', 401

    id_object = request.get_json()
    logging.info(f"Removing task {id_object['id']}, for user {user_id}")

    session = Session()
    # mark booked time on this task as unbooked
    booked_entries_on_this_task = session.query(LoggedTime)\
        .filter(LoggedTime.task_id == id_object['id'],
                LoggedTime.user_id == user_id
                ).all()
    for entry in booked_entries_on_this_task:
        entry.task_id = NO_TASK
    # delete task
    session.query(Task).filter(Task.id == id_object['id'], Task.user_id == user_id).delete()
    session.commit()
    session.close()
    return 'OK'


@app.route('/togglecompletetask', methods=['POST'])
def toggle_complete_task():
    try:
        user_id, user_type = get_token_data_from_header()
    except BlackListError:
        return 'Authentication token blacklisted', 401
    except jwt.ExpiredSignatureError:
        return 'Expired Signature', 401
    except jwt.InvalidTokenError:
        return 'Invalid token', 401

    if user_type != AuthTokenType.USER:
        return 'Wrong token type', 401

    id_object = request.get_json()
    session = Session()
    task = session.query(Task).filter(Task.id == id_object['id'], Task.user_id == user_id).first()
    task.is_finished = not task.is_finished
    session.commit()
    session.close()
    return 'OK'


@app.route('/createtask', methods=['POST'])
def create_task():
    try:
        user_id, user_type = get_token_data_from_header()
    except BlackListError:
        return 'Authentication token blacklisted', 401
    except jwt.ExpiredSignatureError:
        return 'Expired Signature', 401
    except jwt.InvalidTokenError:
        return 'Invalid token', 401
    except TypeError:
        return 'Failed to decode', 401

    if user_type != AuthTokenType.USER:
        return 'Wrong token type', 401

    task = TaskSchema(only=('title', 'description', 'estimated_time_minutes', 'deadline')). \
        load(request.get_json())
    logging.info('Creating task {} for user {}'.format(task.get('title'), user_id))
    task_objects = Task(**task, user_id=user_id)

    session = Session()
    session.add(task_objects)
    session.commit()
    session.close()
    return 'OK'


@app.route('/tasks')
def get_tasks():
    try:
        user_id, user_type = get_token_data_from_header()
    except BlackListError:
        return 'Authentication token blacklisted', 401
    except jwt.ExpiredSignatureError:
        return 'Expired Signature', 401
    except jwt.InvalidTokenError:
        return 'Invalid token', 401

    if user_type != AuthTokenType.USER:
        return 'Wrong token type', 401

    # fetching from the database
    session = Session()
    task_objects = session.query(Task).filter(Task.user_id == user_id).all()

    # transforming into JSON-serializable objects
    schema = TaskSchema(many=True)
    tasks = schema.dump(task_objects)

    # serializing as JSON
    session.close()
    return jsonify(tasks)

# endregion
