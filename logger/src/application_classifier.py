from enum import Enum

class ApplicationClasses(Enum):
    RESEARCH = 1 # eg reading stackoverflow
    PRODUCTIVITY = 2 # eg coding, latex
    ENTERTAINMENT = 3 # eg youtube and other time wasters
    UNKNOWN = 4

class ApplicationClassifier:

    application_mapping = {
        'firefox': ApplicationClasses.RESEARCH,
        'code': ApplicationClasses.PRODUCTIVITY,
        'code-oss': ApplicationClasses.PRODUCTIVITY,
        'terminal': ApplicationClasses.PRODUCTIVITY,
        'google-chrome': ApplicationClasses.ENTERTAINMENT
    }

    def classify(self, application_name: str, window_title: str) -> int:
        """
        @param application_name: Name of the active program
        @param window_title: Title of active window
        @return Returns the application class based on the application name and window title
        """
        application_class = self.application_mapping.get(application_name.lower(), ApplicationClasses.UNKNOWN).value
        return application_class
