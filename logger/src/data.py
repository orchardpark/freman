from dataclasses import dataclass


@dataclass
class TrackedApplication:
    application_name: str
    logged_time_seconds: int


@dataclass(frozen=True)
class ApplicationKey:
    application_name: str
    window_title: str