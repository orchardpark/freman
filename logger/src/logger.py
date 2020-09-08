import platform
import logging
operating_system = platform.system()
logging.basicConfig()
logging.root.setLevel(logging.INFO)
log = logging.getLogger(__name__)

if __name__ == '__main__':
    if operating_system.startswith('Linux'):
        import linuxlogger
        log.info('Detected OS: {}'.format(operating_system))
        linuxlogger.log_linux()

    elif operating_system.startswith('Windows'):
        #TODO
        log.warn('Windows not supported yet')
