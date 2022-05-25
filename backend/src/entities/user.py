from sqlalchemy import Column, String, Integer, Boolean, DateTime, ForeignKey
from .entity import Entity, Base
from marshmallow import Schema, fields
import jwt
import config
import datetime
from enum import Enum


class AuthTokenType(Enum):
    USER = 1
    LOGGER = 2


class BlackListError(Exception):
    pass


class BlackListToken(Entity, Base):
    __tablename__ = 'blacklisttoken'
    token = Column(String(500), unique=True, nullable=False)

    @staticmethod
    def check_blacklist(session_factory, auth_token):
        session = session_factory()
        blacklist_entry = session.query(BlackListToken).filter_by(token=str(auth_token)).first()
        if blacklist_entry:
            res = True
        else:
            res = False
        session.close()
        return res


class User(Entity, Base):
    __tablename__ = 'user'
    name = Column(String)

    def __init__(self, name):
        super().__init__()
        self.name = name

    @staticmethod
    def encode_auth_token(user_id):
        payload = {
            'exp': datetime.datetime.utcnow() + datetime.timedelta(days=0, seconds=3600),
            'iat': datetime.datetime.utcnow(),
            'sub': user_id,
            'type': AuthTokenType.USER.name
        }
        return jwt.encode(
            payload,
            config.token.get('secret'),
            algorithm='HS256'
        )

    @staticmethod
    def encode_api_token(user_id):
        payload = {
            'exp': datetime.datetime.utcnow() + datetime.timedelta(days=365),
            'iat': datetime.datetime.utcnow(),
            'sub': user_id,
            'type': AuthTokenType.LOGGER.name
        }
        return jwt.encode(
            payload,
            config.token.get('secret'),
            algorithm='HS256'
        )

    @staticmethod
    def decode_auth_token(session_factory, auth_token):
        payload = jwt.decode(auth_token, config.token.get('secret'), algorithms=['HS256'])
        is_blacklisted_token = BlackListToken.check_blacklist(session_factory, auth_token)
        if is_blacklisted_token:
            raise BlackListError
        else:
            return payload['sub'], payload['type']


class GithubUser(Entity, Base):
    __tablename__ = 'githubuser'
    login = Column(String, nullable=False)
    user_id = Column(Integer, ForeignKey('user.id'))
    name = Column(String)
    company = Column(String)
    twitter_username = Column(String)
    email = Column(String)
    location = Column(String)

    def __init__(self, id, login, user_id, name, company, twitter_username, email, location):
        super().__init__()
        self.id = id
        self.login = login
        self.user_id = user_id
        self.name = name
        self.company = company
        self.twitter_username = twitter_username
        self.email = email
        self.location = location


class UserSchema(Schema):
    name = fields.String()
    created_at = fields.DateTime()
