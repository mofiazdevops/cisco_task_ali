from pydantic import BaseModel

class DomainTypeBase(BaseModel):
    name: str
    description: str

class DomainTypeGet(BaseModel):
    id: int
    name: str
    description: str

class DomainTypeCreate(DomainTypeBase):
    pass

class GetDomainTypesResponse(BaseModel):
    domain_types: list[DomainTypeGet]

class DomainType(DomainTypeBase):
    id: int

    class Config:
        orm_mode: True
