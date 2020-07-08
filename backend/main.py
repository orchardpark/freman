from flask import Flask, jsonify, request
from flask_cors import CORS
from entities.entity import Session, engine, Base
from entities.bookedtime import BookedTime, BookedTimeSchema
from entities.task import Task, TaskSchema

# creating the Flask application
app = Flask(__name__)
# TODO configure CORS
CORS(app)

# if needed, generate database schema
Base.metadata.create_all(engine)


# ------- BOOKED TIME


@app.route('/bookedtime')
def get_booked_time():
    # fetching from the database
    session = Session()
    booked_time_objects = session.query(BookedTime).all()

    # transforming into JSON-serializable objects
    schema = BookedTimeSchema(many=True)
    booked_time = schema.dump(booked_time_objects)

    # serializing as JSON
    session.close()
    return jsonify(booked_time)


@app.route('/booktime', methods=['POST'])
def book_time():
    booked_time = BookedTimeSchema(only=('task_id', 'booked_time_minutes')) \
        .load(request.get_json())

    booked_time_objects = BookedTime(**booked_time.data)

    session = Session()
    session.add(booked_time_objects)
    session.commit()
    session.close()
    return 'OK'


# ------- TASKS


@app.route('/createtask', methods=['POST'])
def create_task():
    task = TaskSchema(only=('title', 'description', 'estimated_time_minutes')). \
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
