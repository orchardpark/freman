from logger import ApplicationKey
from typing import Dict, List
from dataclasses import dataclass

@dataclass
class TrackedApplication:
    application_name: str
    logged_time_seconds: int
    window_title: str


def combine_tracked(tracked: Dict[ApplicationKey, float]) -> List[TrackedApplication]:
    '''
    Combines a dict [(application_name, window_title)-> seconds_active] to a list
    of TrackedApplication.
    @param tracked: Dict of ApplicationKey -> seconds active
    @return list of TrackedApplication
    '''
    tracked_application_list: List[TrackedApplication] = []
        
    for key in tracked.keys():
        if round(tracked[key]) > 0:
            tracked_application_list.append(TrackedApplication(key.application_name, round(tracked[key]), key.window_title))
        
    return tracked_application_list