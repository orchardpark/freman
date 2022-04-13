import logging
import random
import database
from config import config
logging.basicConfig()
logging.root.setLevel(logging.INFO)

log = logging.getLogger(__name__)

if __name__ == '__main__':
    applications = ['Firefox', 'IDE', 'Game']
    while True:
        tracked_programs = []
        application = random.choice(applications)
        tracked_programs.append(database.TrackedApplication(application, 250, 'window_title'))
        database_sync_success = database.send_to_database(
            tracked_programs, config['server_url'], config['server_port'])
