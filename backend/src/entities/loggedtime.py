from sqlalchemy import Column, Integer, String, ForeignKey
from .entity import Entity, Base
from marshmallow import Schema, fields

# constants
NO_TASK = -1
UNPRODUCTIVE = -2

class LoggedTime(Entity, Base):
    __tablename__ = 'loggedtime'
    application_name = Column(String)
    logged_time_seconds = Column(Integer)
    window_title = Column(String)
    task_id = Column(Integer)

    def __init__(self, **kwargs):
        super().__init__()
        self.application_name = kwargs['application_name']
        self.logged_time_seconds = kwargs['logged_time_seconds']
        self.window_title = kwargs['window_title']
        self.task_id = NO_TASK


class LoggedTimeSchema(Schema):
    application_name = fields.String()
    logged_time_seconds = fields.Integer()
    window_title = fields.String()
    created_at = fields.DateTime()
    task_id = fields.Integer()