# app/model/domain_type.py

from sqlalchemy import Column, Integer, String
from .base_model import BaseModel
from sqlalchemy.orm import relationship

class DomainTypes(BaseModel):
    __tablename__ = 'domain_types'
    
    name = Column(String, unique=True, index=True)
    description = Column(String, nullable=True)

    role_type = relationship("Roles", uselist=False, back_populates="domain_type")
    user_profile_domain = relationship("UserProfile", uselist=False ,back_populates="domain")
    domain = relationship("SustainabilityMeasures", uselist=False, back_populates="sustainability_measures_domain")
