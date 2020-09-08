#!/bin/bash
export FLASK_APP=src/app.py
export FLASK_ENV=development
flask run -h 0.0.0.0
