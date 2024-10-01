from pydantic import BaseModel, Field
from typing import List, Optional

class MeasuresBase(BaseModel):
    domain_id: Optional[int]
    role_id: Optional[int]
    measure: str
    info: str

class MeasuresCreate(MeasuresBase):
    pass

class MeasuresData(BaseModel):
    id: int
    measure: str
    info: str

class GetMeasuresResponse(BaseModel):
    measures: List[MeasuresData]

class GetMeasuresByDomainIdResponse(BaseModel):
    domain_id: int
    role_id: int


class Role(MeasuresBase):
    id: int

    class Config:
        orm_mode: True