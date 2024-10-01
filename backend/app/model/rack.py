from datetime import datetime
from sqlalchemy import Column, DateTime, Integer, String, func, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from app.model.base_model import BaseModel, Base


class Rack(BaseModel, Base):
    __tablename__ = "rack"

    name = Column(String, nullable=False)
    site_id = Column(Integer, ForeignKey("site.id"), nullable=False)
    location = Column(String, nullable=True)
    height = Column(String, nullable=True)
    devices = Column(String, nullable=True)
    space = Column(String, nullable=True)
    power = Column(String, nullable=True)
    role = Column(String, nullable=True)

    site = relationship("Site", back_populates="rack")
