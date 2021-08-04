import requests
import logging
from typing import List
from data import TrackedApplication
log = logging.getLogger(__name__)

def send_to_database(tracked_programs: List[TrackedApplication], server_url: str, server_port: str) -> bool:
    headers = {'Content-Type': 'application/json', 'Accept':'application/json'}
    data = list(map(lambda x: x.__dict__, tracked_programs))
    log.info('Sending tracked data to backend: {}'.format(str(data)))
    res = requests.post("http://{}:{}/logtime".format(server_url, server_port), json=data, headers=headers)
    log.debug(res)
    return res.status_code == 200
