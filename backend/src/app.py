from flask import Flask, jsonify, request
from flask_cors import CORS
from entities.entity import Session, engine, Base
from entities.loggedtime import NO_TASK, LoggedTime, LoggedTimeSchema
from entities.task import Task, TaskSchema
from sqlalchemy import func
from typing import List
import logging

logging.basicConfig(level=logging.INFO)
# creating the Flask application
app = Flask(__name__)

# TODO configure CORS
CORS(app)

# if needed, generate database schema
Base.metadata.create_all(engine)


# ------- LOGGED TIME

@app.route('/logged')
def get_logged_time():
    """
    :return: The logged items that have not been assigned
    """
    # fetching from the database
    session = Session()
    # group logged time by (application_name, window_title)
    logged_time_objects = \
        session.query(LoggedTime.application_name,
                      func.sum(LoggedTime.logged_time_seconds).label('logged_time_seconds'),
                      func.min(LoggedTime.created_at).label('created_at')) \
        .filter(LoggedTime.task_id == NO_TASK) \
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
    logged_time = LoggedTimeSchema(only=('application_name', 'logged_time_seconds', 'window_title'), many=True) \
        .load(request.get_json())
    logged_time_objects = list(map(lambda x: LoggedTime(**x), logged_time))

    session = Session()
    session.bulk_save_objects(logged_time_objects)
    session.commit()
    session.close()
    return 'OK'


# ------- BOOKED TIME


@app.route('/bookedtime')
def get_booked_time():
    # fetching from the database
    session = Session()
    booked_time_objects = session.query(LoggedTime).filter(LoggedTime.task_id != NO_TASK).all()

    # transforming into JSON-serializable objects
    schema = LoggedTimeSchema(many=True)
    booked_time = schema.dump(booked_time_objects)

    # serializing as JSON
    session.close()
    return jsonify(booked_time)


@app.route('/booktime', methods=['POST'])
def book_time():
    data = request.get_json()
    application_name = data.get('application_name')
    task_id = data.get('task_id')
    logging.info(f"Logging application {application_name} on task_id {task_id}")

    session = Session()
    booked_time_objects: List[LoggedTime] = session.query(LoggedTime). \
        filter(LoggedTime.application_name == application_name). \
        filter(LoggedTime.task_id == -1).all()
    for booked_time_object in booked_time_objects:
        booked_time_object.task_id = task_id
    session.commit()
    session.close()
    return 'OK'


# ------- TASKS

@app.route('/removetask', methods=['POST'])
def remove_task():
    id_object = request.get_json()
    logging.info(f"Removing task {id_object['id']}")

    session = Session()
    # mark booked time on this task as unbooked
    booked_entries_on_this_task = session.query(LoggedTime).filter(LoggedTime.task_id == id_object['id']).all()
    for entry in booked_entries_on_this_task:
        entry.task_id = NO_TASK
    # delete task
    session.query(Task).filter(Task.id == id_object['id']).delete()
    session.commit()
    session.close()
    return 'OK'


@app.route('/togglecompletetask', methods=['POST'])
def toggle_complete_task():
    id_object = request.get_json()
    session = Session()
    task = session.query(Task).filter(Task.id == id_object['id']).first()
    task.is_finished = not task.is_finished
    session.commit()
    session.close()
    return 'OK'


@app.route('/createtask', methods=['POST'])
def create_task():
    task = TaskSchema(only=('title', 'description', 'estimated_time_minutes', 'deadline')). \
        load(request.get_json())
    task_objects = Task(**task)

    session = Session()
    session.add(task_objects)
    session.commit()
    session.close()
    return 'OK'


@app.route('/tasks')
def get_tasks():
    # fetching from the database
    session = Session()
    task_objects = session.query(Task).all()

    # transforming into JSON-serializable objects
    schema = TaskSchema(many=True)
    tasks = schema.dump(task_objects)

    # serializing as JSON
    session.close()
    return jsonify(tasks)
