from sqlalchemy import Column, String, Integer, Boolean, DateTime
from .entity import Entity, Base
from marshmallow import Schema, fields


class Task(Entity, Base):
    __tablename__ = 'task'
    title = Column(String)
    description = Column(String)
    estimated_time_minutes = Column(Integer)
    deadline = Column(DateTime)
    is_finished = Column(Boolean)
    priority = Column(Integer)

    def __init__(self, title, description, estimated_time_minutes, deadline, is_finished=False):
        super().__init__()
        self.title = title
        self.description = description
        self.estimated_time_minutes = estimated_time_minutes
        self.deadline = deadline
        self.is_finished = is_finished


class TaskSchema(Schema):
    id = fields.Integer()
    title = fields.String()
    description = fields.String()
    estimated_time_minutes = fields.Integer()
    deadline = fields.DateTime()
    is_finished = fields.Boolean()
    created_at = fields.DateTime()
    updated_at = fields.DateTime()
