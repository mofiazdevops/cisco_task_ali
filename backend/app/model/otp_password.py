from sqlalchemy import Column, String, Integer, ForeignKey, DateTime
from .base_model import BaseModel
from sqlalchemy.orm import relationship

class OtpPassword(BaseModel):
    __tablename__ = "otp_password"

    user_email = Column(String, ForeignKey('user.email'),index=True, unique=True, nullable=False)
    code = Column(String, unique=True, nullable=False)
    expiration_date = Column(DateTime, nullable=False)

    user = relationship("User", back_populates="otp")