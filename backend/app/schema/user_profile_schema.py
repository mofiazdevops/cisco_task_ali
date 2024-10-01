from pydantic import BaseModel


class UserProfileBase(BaseModel):
    user_id: int
    organization_name: str
    domain_id: int
    role_id: int


class GetUserProfileResponse(BaseModel):
    profiles: list[UserProfileBase]

class UserProfileCreate(UserProfileBase):
    pass

class UserProfile(UserProfileBase):
    pass

class GetUserProfile(BaseModel):
    class Config:
        orm_mode = True  