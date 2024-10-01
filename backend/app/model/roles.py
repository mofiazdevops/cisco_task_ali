from sqlalchemy import Column, String, Integer, ForeignKey
from .base_model import BaseModel
from sqlalchemy.orm import relationship

from app.model.domain_types import DomainTypes

class Roles(BaseModel):
    __tablename__ = "roles"

    domain_type_id = Column(Integer, ForeignKey('domain_types.id'), index=True, nullable=False)
    name = Column(String, unique=True, nullable=False)

    domain_type = relationship("DomainTypes", back_populates="role_type")
    user_profile_role = relationship("UserProfile", uselist=False ,back_populates="role")
    role = relationship("SustainabilityMeasures", uselist=False, back_populates="sustainability_measures_role")
