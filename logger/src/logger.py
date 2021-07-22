import platform
import logging
operating_system = platform.system()
logging.basicConfig()
logging.root.setLevel(logging.INFO)
from dataclasses import dataclass
log = logging.getLogger(__name__)

@dataclass(frozen=True)
class ApplicationKey:
    application_name: str
    window_title: str

if __name__ == '__main__':
    if operating_system.startswith('Linux'):
        import linuxlogger
        log.info('Detected OS: {}'.format(operating_system))
        linuxlogger.log_linux()

    elif operating_system.startswith('Windows'):
        import windowslogger
        log.info('Detected OS: {}'.format(operating_system))
        windowslogger.log_windows()

