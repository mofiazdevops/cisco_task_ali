from pydantic import BaseModel, Field
from typing import List, Optional

class UserMeasuresBase(BaseModel):
  user_id: int
  measures: List[int]

class UserMeasuresCreate(UserMeasuresBase):
    pass
    new_measure: Optional[str] = None

class UserMeasuresData(BaseModel):
    id: int
    measure: str
    info: str

class GetUserMeasuresResponse(BaseModel):
    measures: List[UserMeasuresData]

class GetUserMeasuresByDomainIdResponse(BaseModel):
    domain_id: int
    role_id: int


class Role(UserMeasuresBase):
    id: int

    class Config:
        orm_mode: True