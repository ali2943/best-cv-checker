import os

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker


def get_engine():
    database_url = os.getenv("DATABASE_URL")
    if not database_url:
        raise ValueError("DATABASE_URL is not set.")
    return create_engine(database_url)


def get_sessionmaker():
    return sessionmaker(autocommit=False, autoflush=False, bind=get_engine())

