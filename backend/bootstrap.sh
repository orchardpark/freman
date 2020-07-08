#!/bin/bash
export FLASK_APP=main
export FLASK_ENV=development
source ../venv/bin/activate
flask run -h 0.0.0.0