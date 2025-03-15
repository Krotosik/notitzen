# config.py
from secret import secret
import os

class Config:
    SECRET_KEY = secret["cookies"]
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', f'postgresql://{secret["username"]}:{secret["password"]}@localhost/{secret["database"]}')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SESSION_TYPE = "filesystem"