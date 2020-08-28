class ApplicationClassifier:

    classes = {
        'firefox': 'web browsing',
        'code': 'coding',
        'terminal': 'coding'
    }

    def classify(self, application_name: str) -> str:
        application_class = self.classes.get(application_name.lower(), 'Unknown')
        return application_class
