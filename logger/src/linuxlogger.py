import subprocess
import time
import psutil
import yaml
import logging
import database
import tracked_application
from typing import Dict
from logger import ApplicationKey
log = logging.getLogger(__name__)

# Active window functions

def get_pname(id) -> str:
    p = subprocess.Popen(["ps -o cmd= {}".format(id)], stdout=subprocess.PIPE, shell=True)
    return p.communicate()[0].decode('utf-8').strip()

def get_active_application_name() -> str:
    p = subprocess.Popen(['xdotool', 'getwindowfocus'], stdout=subprocess.PIPE)
    output, _ = p.communicate()
    p = subprocess.Popen(['xprop', '-id', output, 'WM_CLASS'], stdout=subprocess.PIPE)
    output, _ = p.communicate()
    name = output.decode('ascii').strip().split(',')[-1].strip().replace('"', '')
    return name


def get_active_window_pid() -> int:
    p = subprocess.Popen(['xdotool', 'getwindowfocus', 'getwindowpid'], stdin=subprocess.PIPE,
                         stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    output, _ = p.communicate()
    pid = int(output)
    return pid

def get_active_window_title() -> str:
    p = subprocess.Popen(['xdotool', 'getwindowfocus', 'getwindowname'], stdin=subprocess.PIPE,
        stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    output, _ = p.communicate()
    wname = output.decode('utf-8').strip()
    return wname

def get_idle_time_s() -> int:
    p = subprocess.Popen(['xprintidle'], stdout=subprocess.PIPE)
    output, _ = p.communicate()
    return int(output)/1000


# Logging Loop

def log_linux():
    logging.info('Starting Linux logging')
    with open('config.yaml') as f:
        config = yaml.safe_load(f)
        log.info('Loaded config')

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
