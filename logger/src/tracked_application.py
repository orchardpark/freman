import application_classifier

class TrackedApplication:

    def __init__(
        self, 
        application_name:str,
        category: int, 
        logged_time_minutes: int,
        window_title: str
        
        ):
        self.application_name = application_name
        self.category = category
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
    tracked_category = {}
    classifier = application_classifier.ApplicationClassifier()
    for key in tracked.keys():
        (application_name, window_title) = key
        category = classifier.classify(application_name, window_title)
        new_key = (application_name, window_title, category)
        if new_key not in tracked_category:
            tracked_category[new_key] = 0
        tracked_category[new_key] += tracked[key]
    
    for key in tracked_category.keys():
        (application_name, window_title, category) = key
        logged_time_minutes = tracked_category[key]/60.0
        tracked_application_list.append(TrackedApplication(application_name, category, logged_time_minutes, window_title))
        
    
    return tracked_application_list