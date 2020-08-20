import platform
operating_system = platform.system()

if operating_system.startswith('Linux'):
    import linuxlogger
    print('Detected OS: {}'.format(operating_system))
    linuxlogger.log_linux()
