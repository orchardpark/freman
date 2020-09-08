from sqlalchemy import Column, Integer, String, Float
from .entity import Entity, Base
from marshmallow import Schema, fields


class LoggedTime(Entity, Base):
    __tablename__ = 'loggedtime'
    application_name = Column(String)
    category = Column(Integer)
    logged_time_minutes = Column(Float)
    window_title = Column(String)

    def __init__(self, **kwargs):
        super().__init__()
        self.application_name = kwargs['application_name']
        self.category = kwargs['category']
        self.logged_time_minutes = kwargs['logged_time_minutes']
        self.window_title = kwargs['window_title']


class LoggedTimeSchema(Schema):
    id = fields.Integer()
    application_name = fields.String()
    category = fields.Integer()
    logged_time_minutes = fields.Float()
    window_title = fields.String()