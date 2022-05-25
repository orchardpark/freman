import requests
import logging
import os
from typing import List
from data import TrackedApplication
log = logging.getLogger(__name__)


def send_to_database(
        tracked_programs: List[TrackedApplication],
        server_url: str,
        server_port: str,
        protocol: str) -> bool:
    api_key = os.getenv('FREMAN_API_KEY')
    if not api_key:
        log.error('API key not set in Environment variables!')
    headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer {}'.format(api_key)
    }
    data = list(map(lambda x: x.__dict__, tracked_programs))
    log.info('Sending tracked data to backend: {}'.format(str(data)))
    res = requests.post("{}://{}:{}/logtime".format(protocol, server_url, server_port), json=data, headers=headers)
    log.debug(res)
    return res.status_code == 200
