import database
import win32process
import win32gui
import win32api
import psutil
import logging
import tracked_application
from logger import ApplicationKey
import time
from typing import Dict
from config import config
log = logging.getLogger(__name__)

def get_active_application_name():
    try:
        pid = win32process.GetWindowThreadProcessId(win32gui.GetForegroundWindow())
        return(psutil.Process(pid[-1]).name())
    except:
        pass

def get_active_window_title():
    return win32gui.GetWindowText (win32gui.GetForegroundWindow())

def get_idle_time_s():
    return (win32api.GetTickCount() - win32api.GetLastInputInfo()) / 1000.0

def log_windows():
    log.info('Starting Linux logging')

    tracked: Dict[ApplicationKey, float] = {}
    time_of_last_measurement = time.time()
    time_of_last_update = time.time()
    while True:
        # Only log time if user is active
        idle_time = get_idle_time_s()
        if idle_time <= config['max_idle_time']:
            application_name = get_active_application_name()
            window_title = get_active_window_title()
            key = ApplicationKey(application_name, window_title)
            if key not in tracked:
                tracked[key] = 0
            tracked[key] = tracked[key] + time.time()-time_of_last_measurement
            time_of_last_measurement = time.time()

        # Every sync interval write results to database and clear the current records
        if time.time() - time_of_last_update >= config['sync_interval']:
            tracked_programs = tracked_application.combine_tracked(tracked)
            database_sync_success = database.send_to_database(
                tracked_programs, config['server_url'], config['server_port'])
            if database_sync_success:
                tracked = {}
            time_of_last_update = time.time()

if __name__ == '__main__':
    print()
