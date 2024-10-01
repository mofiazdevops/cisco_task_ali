from sqlalchemy import Column, String, Boolean, Integer, ForeignKey
from app.model.base_model import BaseModel, Base
from sqlalchemy.orm import relationship

class User(BaseModel, Base):
    __tablename__ = "user"

    email = Column(String, unique=True, index=True)
    password = Column(String)
    user_token = Column(String, unique=True, index=True)
    name = Column(String, default=None, nullable=True)
    is_active = Column(Boolean, default=True)
    is_superuser = Column(Boolean, default=False)
    
    user_profile_user = relationship("UserProfile", uselist=False, back_populates="user") 
    otp = relationship("OtpPassword", back_populates="user", uselist=False)
    user_measure = relationship("UserMeasures", uselist=False, back_populates="user_measures_user")


