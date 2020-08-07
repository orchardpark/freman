from datetime import datetime
from sqlalchemy import create_engine, Column, String, Integer, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import yaml

with open('config.yaml') as f:
    config = yaml.safe_load(f)
database_config = config['database']
db_url = database_config['db_url']
db_name = database_config['db_name']
db_user = database_config['db_user']
db_password = database_config['db_password']

engine = create_engine(f'postgresql://{db_user}:{db_password}@{db_url}/{db_name}')
Session = sessionmaker(bind=engine)

Base = declarative_base()


class Entity:
    id = Column(Integer, primary_key=True)
    created_at = Column(DateTime)
    updated_at = Column(DateTime)
    last_updated_by = Column(String)

    def __init__(self):
        self.created_at = datetime.now()
        self.updated_at = datetime.now()
