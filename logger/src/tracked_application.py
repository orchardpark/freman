from data import ApplicationKey, TrackedApplication
from typing import Dict, List


def combine_tracked(tracked: Dict[ApplicationKey, float]) -> List[TrackedApplication]:
    """
    Combines a dict [(application_name, window_title)-> seconds_active] to a list
    of TrackedApplication.
    @param tracked: Dict of ApplicationKey -> seconds active
    @return list of TrackedApplication
    """
    tracked_application_list: List[TrackedApplication] = []
        
    for key in tracked.keys():
        if round(tracked[key]) > 0:
            tracked_application_list.append(TrackedApplication(key.application_name, round(tracked[key])))
        
    return tracked_application_list
