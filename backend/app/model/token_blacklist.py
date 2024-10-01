from datetime import datetime
from sqlalchemy import Column, DateTime, Integer, String, func
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from app.model.base_model import BaseModel


class TokenBlacklist(BaseModel):
    __tablename__ = "token_blacklist"

    access_token = Column(String, index=True, unique=True, nullable=False)
