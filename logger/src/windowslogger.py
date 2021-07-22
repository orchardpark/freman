import database
import win32process
import win32gui
import psutil

def active_window_process_name():
    try:
        pid = win32process.GetWindowThreadProcessId(win32gui.GetForegroundWindow())
        return(psutil.Process(pid[-1]).name())
    except:
        pass


def get_window_title():
    return win32gui.GetWindowText (win32gui.GetForegroundWindow())

def log_windows():
    return

if __name__ == '__main__':
    print(active_window_process_name())
    print(get_window_title())
