import win32process
import win32gui
import win32api
import psutil
import logging
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