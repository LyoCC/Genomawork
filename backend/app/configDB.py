from sqlalchemy import create_engine, URL
from sqlalchemy.orm import declarative_base, sessionmaker
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file='.env')
    DB_PASSWORD: str 
    DB_NAME: str
    DB_HOST: str
    DB_PORT: int
    DB_USERNAME: str

env = Settings().model_dump()


DATABASE_URL = URL.create(
    "postgresql",
    username= env["DB_USERNAME"],
    password=env["DB_PASSWORD"],
    host=env["DB_HOST"],
    database=env["DB_NAME"],
)

engine = create_engine(DATABASE_URL)
Session = sessionmaker(bind=engine)
session = Session()

Base = declarative_base()