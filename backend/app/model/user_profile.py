from sqlalchemy import Column, String, Integer, ForeignKey, func, DateTime
from sqlalchemy.orm import relationship
from app.model.base_model import BaseModel, Base

from app.model.user import User
from app.model.domain_types import DomainTypes
from app.model.roles import Roles


class UserProfile(BaseModel, Base):
    __tablename__ = 'user_profiles'
    
    user_id = Column(Integer, ForeignKey('user.id'), nullable=False)  
    organization_name = Column(String, nullable=False)
    domain_id = Column(Integer, ForeignKey('domain_types.id'), nullable=False)
    role_id = Column(Integer, ForeignKey('roles.id'), nullable=False)

    user = relationship("User", back_populates="user_profile_user")
    domain = relationship("DomainTypes", back_populates="user_profile_domain")
    role = relationship("Roles", back_populates="user_profile_role")

    