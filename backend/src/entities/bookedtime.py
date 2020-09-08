from sqlalchemy import Column, Integer, Float
from .entity import Entity, Base
from marshmallow import Schema, fields


class BookedTime(Entity, Base):
    __tablename__ = 'bookedtime'
    task_id = Column(Integer)
    logged_time_id = Column(Integer)
    booked_time_minutes = Column(Float)


class BookedTimeSchema(Schema):
    id = fields.Integer()
    task_id = fields.Integer()
    logged_time_id = fields.Integer()
    booked_time_minutes = fields.Float()
    created_at = fields.DateTime()
    updated_at = fields.DateTime()
