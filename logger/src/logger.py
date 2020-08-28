import platform
import logging
operating_system = platform.system()
log = logging.getLogger(__name__)

if operating_system.startswith('Linux'):
    import linuxlogger
    log.info('Detected OS: {}'.format(operating_system))
    linuxlogger.log_linux()
