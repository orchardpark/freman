# Backend

The backend takes care of storing and retrieving the logged time and task data. Data is persisted on a Postgres database and calls are made to a Flask API.

## API

### Logged items
GET `/loggedtime`

Returns a json object of the logged items. The items are organized by application.

POST `/logtime`

Saves logged items to database.

Arguments: 

* `application_name`: Name of the logged application
* `category`: The category the application belongs to [0=Unspecified, 1=Researching (Web browsing, reading, etc) , 2=Creating/Maintaining (Coding, Writing, etc) 3=Entertainment (Watching videos, computer games)]
* `logged_time_minutes`: Minutes spent on this application

### Bookings

POST `/booktime`

Book time logged for a particular application on specified task.

Arguments:
* `application_name`: Name of the logged application.
* `task_id`: Task on which the time is booked.

### Tasks


GET `/tasks`

Returns a json objects of all tasks

POST `/createtask`

Creates a task

Arguments

* `title`: Title of the task
* `description`: Description of the task
* `estimated_time_minutes`: Estimated number of minutes to complete the task
* `deadline`: Date the task should be completed

POST `/removetask`

Removes specified task

Arguments:

* `id`: The id of the task to be removed

POST `/togglecompletetask`

Changes a task from pending to complete or vice-versa.

Arguments:

* `id`: The id of the task to be toggled

## Installation

The backend requires a [Postgres](https://www.postgresql.org/) installation. A database and database user, with permission to read/write need to be created. The specifics of the database url, name, user and password are to be configured in the `config.yaml` file. An example setup script for the database and user can be found in `setupd_db.sql`.

A virtual environment is recommended for running the backend application. The required packages can then be installed via `pip install -r requirements.txt`.

## Development
The development server can be started by running `./run_dev.sh`

## Production
To run a production server, install [Gunicorn](https://gunicorn.org/).
Next run the server `gunicorn --certfile=server.crt --keyfile=server.key -w 4 -b 0.0.0.0:5000 app:app`

Also change the configuration in `example_config.py` to your configuration and rename the file to `config.py`
