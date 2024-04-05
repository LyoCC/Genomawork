from sqlalchemy import Column, Integer, String, Boolean
from app.configDB import engine, Base


class Places(Base):
    __tablename__ = "Places"

    id = Column(Integer, primary_key=True, nullable=False)
    name = Column(String(100), nullable=False)
    country = Column(String(100))
    city = Column(String(100))
    foodType = Column(String(100))
    rating = Column(Integer)
    visited = Column(Boolean)

Base.metadata.create_all(engine)
