from sqlalchemy import Column, String, Integer, ForeignKey
from .base_model import BaseModel, Base
from sqlalchemy.orm import relationship


class NewPasswordCode(BaseModel, Base):
    __tablename__ = "new_password_code"

    # user_id = Column(Integer, ForeignKey('user.id'), index=True, nullable=False)
    code = Column(String, unique=True, nullable=False)

