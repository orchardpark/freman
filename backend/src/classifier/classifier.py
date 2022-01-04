import abc
from enum import Enum

class Classes(Enum):
	PRODUCTIVE_HIGH = 1
	PRODUCTIVE_LOW = 2
	UNPRODUCTIVE = 3
	UNKNOWN = 4

class Classifier(metaclass=abc.ABCMeta):
	@abc.abstractmethod
	def classify(application: str, window_title: str) -> Classes:
		pass
