from sqlalchemy import Column, Integer, String, ForeignKey
from .entity import Entity, Base
from marshmallow import Schema, fields
from classifier.classifier import Classes

# constants
NO_TASK = -1
UNPRODUCTIVE = -2


class LoggedTime(Entity, Base):
    __tablename__ = 'loggedtime'
    application_name = Column(String)
    logged_time_seconds = Column(Integer)
    task_id = Column(Integer)
    category = Column(Integer)
    user_id = Column(Integer, ForeignKey('user.id'))

    def __init__(self, **kwargs):
        super().__init__()
        self.application_name = kwargs['application_name']
        self.logged_time_seconds = kwargs['logged_time_seconds']
        self.user_id = kwargs['user_id']
        self.task_id = NO_TASK
        self.category = Classes.UNKNOWN.value


class LoggedTimeSchema(Schema):
    application_name = fields.String()
    logged_time_seconds = fields.Integer()
    created_at = fields.DateTime()
    updated_at = fields.DateTime()
    id = fields.Integer()
    task_id = fields.Integer()
    user_id = fields.Integer()
