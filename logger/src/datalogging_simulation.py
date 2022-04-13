# Simulate logging of data
import logging
operating_system = platform.system()
logging.basicConfig()
logging.root.setLevel(logging.INFO)
from typing import Dict
from config import config
import tracked_application
import database
import time
log = logging.getLogger(__name__)
from data import ApplicationKey
import random

if __name__ == '__main__':
    applications = ['Firefox', 'IDE', 'Game']
    while True:
        tracked_programs = []
        database_sync_success = database.send_to_database(
            tracked_programs, config['server_url'], config['server_port'])
        if database_sync_success:
            tracked = {}
        time_of_last_update = time.time()


