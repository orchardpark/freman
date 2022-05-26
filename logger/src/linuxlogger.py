import subprocess
import logging
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
    return int(int(output)/1000)
