from sqlalchemy import Column, Integer, String
from .entity import Entity, Base
from marshmallow import Schema, fields


class LoggedTime(Entity, Base):
    __tablename__ = 'loggedtime'
    application_name = Column(String)
    category = Column(String)
    logged_time_minutes = Column(Integer)


class LoggedTimeSchema(Schema):
    id = fields.Integer()
    application_name = fields.String()
    category = fields.String()
    logged_time_minutes = fields.Integer()