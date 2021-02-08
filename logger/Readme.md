# Logger

The logger runs in the background and observes which windows are active and periodically (once per ten minutes) logs the time spent within an application to the *freman* backend such that it can be used for statistics purposes.

## Requirements

Currently only Linux is supported. [Python3](https://www.python.org/) is needed to run the application. Necessary packages can be installed by running `pip install -r requirements.txt`.

### Linux

On Linux you need the [xdotool](http://manpages.ubuntu.com/manpages/trusty/man1/xdotool.1.html), which allows for obtaining the active window. Furthermore [xprintidle](https://github.com/g0hl1n/xprintidle) is needed to get the system idle time.

On Ubuntu these can be installed by running
* `apt install xdotool`
* `apt install xprintidle`

## How to use

On Linux run the `launch.sh` script to start the logger.