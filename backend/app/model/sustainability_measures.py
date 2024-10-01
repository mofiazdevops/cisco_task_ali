from datetime import datetime
from sqlalchemy import Column, DateTime, Integer, String, func, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from app.model.base_model import BaseModel

class SustainabilityMeasures(BaseModel):
    __tablename__ = "sustainability_measures"

    domain_id = Column(Integer, ForeignKey("domain_types.id"), index=True, nullable=True)
    role_id = Column(Integer, ForeignKey("roles.id"), index=True, nullable=True)
    measure = Column(String, nullable=False)
    info = Column(String(1000), nullable=False)

    sustainability_measures_domain = relationship("DomainTypes", back_populates="domain")
    sustainability_measures_role = relationship("Roles", back_populates="role")
    user_measure = relationship("UserMeasures", uselist=False, back_populates="user_measures_sus")