import subprocess
import time
import psutil
import requests

def get_pname(id) -> str:
    p = subprocess.Popen(["ps -o cmd= {}".format(id)], stdout=subprocess.PIPE, shell=True)
    return p.communicate()[0].decode('ascii').strip()

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
    wname = output.decode('ascii').strip()
    return wname

def get_idle_time_s() -> int:
    p = subprocess.Popen(['xprintidle'], stdout=subprocess.PIPE)
    output, _ = p.communicate()
    return int(output)/1000

def send_to_database(tracked_programs):
    print(tracked_programs)

def log_linux():
    start_time = time.time()
    tracked_programs = {} # Dict: application_name -> seconds active
    while True:

        # only log time if user is active
        idle_time = get_idle_time_s()
        if idle_time <= 300:
            application_name = get_active_application_name()
            if application_name not in tracked_programs:
                tracked_programs[application_name] = 0
            tracked_programs[application_name] = tracked_programs[application_name] + 1
        
        time.sleep(1)
        elapsed_time = time.time() - start_time

        # Every ten minutes write results to database and clear the current records
        if round(elapsed_time) % 600 == 0:
            send_to_database(tracked_programs)
            tracked_programs = {}

