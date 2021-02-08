class TrackedApplication:

    def __init__(
        self, 
        application_name:str,
        logged_time_minutes: int,
        window_title: str
        
        ):
        self.application_name = application_name
        self.logged_time_minutes = logged_time_minutes 
        self.window_title = window_title
 

def combine_tracked(tracked: dict) -> list:
    '''
    Combines a dict [(application_name, window_title)-> seconds_active] to a list
    of TrackedApplication.
    @param tracked: Dict of (application_name, window_title) -> seconds active
    @return list of TrackedApplication
    '''
    tracked_application_list = []
        
    for key in tracked.keys():
        (application_name, window_title) = key
        logged_time_minutes = tracked[key]/60.0
        tracked_application_list.append(TrackedApplication(application_name, logged_time_minutes, window_title))
        
    
    return tracked_application_list