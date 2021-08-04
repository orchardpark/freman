import platform
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

if __name__ == '__main__':
    if operating_system.startswith('Linux'):
        import linuxlogger as oslogger
        log.info('Detected OS: {}'.format(operating_system))

    elif operating_system.startswith('Windows'):
        import windowslogger as oslogger
        log.info('Detected OS: {}'.format(operating_system))
    
    tracked: Dict[ApplicationKey, float] = {}
    time_of_last_measurement = time.time()
    time_of_last_update = time.time()
    while True:
        # Only log time if user is active
        idle_time = oslogger.get_idle_time_s()
        if idle_time <= config['max_idle_time']:
            application_name = oslogger.get_active_application_name()
            window_title = oslogger.get_active_window_title()
            key = ApplicationKey(application_name, window_title)
            if key not in tracked:
                tracked[key] = 0
            tracked[key] = tracked[key] + time.time()-time_of_last_measurement
            time_of_last_measurement = time.time()
        else:
            key = ApplicationKey('idle', 'idle')
            new_idle_time  = time.time()-time_of_last_measurement
            if key not in tracked:
                tracked[key] = 0
            tracked[key] = tracked[key] + new_idle_time
            time_of_last_measurement = time.time()

        # Every sync interval write results to database and clear the current records
        if time.time() - time_of_last_update >= config['sync_interval']:
            tracked_programs = tracked_application.combine_tracked(tracked)
            database_sync_success = database.send_to_database(
                tracked_programs, config['server_url'], config['server_port'])
            if database_sync_success:
                tracked = {}
            time_of_last_update = time.time()


