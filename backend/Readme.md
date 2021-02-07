# Backend

The backend takes care of storing and retrieving the logged time and task data. Data is persisted on a Postgres database and calls are made to a Flask API.

## API

### Logged items
GET `/loggedtime`

Returns a json object of the logged items.

POST `/logtime`

Saves logged items to database.

Arguments: 

* `application_name`: Name of the logged application
* `category`: The category the application belongs to [0=Unspecified, 1=Researching (Web browsing, reading, etc) , 2=Creating/Maintaining (Coding, Writing, etc) 3=Entertainment (Watching videos, computer games)]
* `logged_time_minutes`: Minutes spent on this application

### Bookings

POST `/booktime`

### Tasks


GET `/tasks`

Returns a json objects of all tasks

POST `/createtask`

Creates a task

Arguments

* `title`: Title of the task
* `description`: Description of the task
* `estimated_time_minutes`: Estimated number of minutes to complete the task

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

Next the program can be started by running `./bootstrap.sh`