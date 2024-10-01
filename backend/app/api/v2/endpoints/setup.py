from dependency_injector.wiring import Provide, inject
from fastapi import APIRouter, Depends, Query

from app.core.container import Container
from typing import Dict, List


from app.schema.domain_type_schema import DomainTypeBase, DomainTypeCreate, GetDomainTypesResponse
from app.schema.user_profile_schema import UserProfileCreate, UserProfile as UserProfileSchema
from app.schema.user_profile_schema import GetUserProfile
from app.schema.roles_schema import RoleCreate
from app.schema.measures_schema import MeasuresCreate, GetMeasuresByDomainIdResponse
from app.schema.user_measures_schema import UserMeasuresCreate

from app.core.dependencies import get_current_active_user
from app.model.user import User

from app.services.roles_service import RolesService
from app.services.domain_type_service import DomainTypeService
from app.services.user_profile_service import UserProfileService
from app.services.roles_service import RolesService
from app.services.measures_service import MeasuresService
from app.services.user_measures_service import UserMeasuresService



import logging

router = APIRouter(
    prefix="/setup",
    tags=["setup"],
)



@router.get("/domain-types", response_model=dict)
@inject
def get_domain_types(current_user: User = Depends(get_current_active_user),
    service: DomainTypeService = Depends(Provide[Container.domain_type_service])
):
    return service.get_domain_types()

@router.get("/role-types", response_model=dict)
@inject
def get_role_types(
    current_user: User = Depends(get_current_active_user),
    service: RolesService = Depends(Provide[Container.roles_service])
):
    return service.get_role_types()

@router.post("/role-types-id", response_model=dict)
@inject
def get_role_types_id(
    domain_id: int = Query(..., title="Domain ID", description="The ID of the domain to get roles for"),
    current_user: User = Depends(get_current_active_user),
    service: RolesService = Depends(Provide[Container.roles_service])
):
    return service.get_role_types_id(domain_id)


@router.post("/domain-types-add", response_model=DomainTypeBase)
@inject
def create_domain_type(
    domain_type_data: DomainTypeCreate,
    current_user: User = Depends(get_current_active_user),
    service: DomainTypeService = Depends(Provide[Container.domain_type_service])
):
    return service.create_domain_type(domain_type_data)


@router.post("/role-types-add", response_model=dict)
@inject
def create_role_type(
    role_type_data: RoleCreate,
    current_user: User = Depends(get_current_active_user),
    service: RolesService = Depends(Provide[Container.roles_service])
):
    return service.create_role_type(role_type_data)



@router.post("/user-profile-all", response_model=dict)
@inject
def create_user_profile(
    user_profile_data: UserProfileCreate,
    current_user: User = Depends(get_current_active_user),
    service: UserProfileService = Depends(Provide[Container.user_profile_service])
):
    return service.create_user_profile(user_profile_data)


@router.get("/user-profile", response_model=dict)
@inject
def get_user_profile(
    current_user: User = Depends(get_current_active_user),
    service: UserProfileService = Depends(Provide[Container.user_profile_service])
):
    return service.get_user_profile()

@router.post("/user-profile-id", response_model=dict)
@inject
def get_user_profile(
    user_id: int = Query(..., title="User ID", description="The ID of the user."),
    current_user: User = Depends(get_current_active_user),
    service: UserProfileService = Depends(Provide[Container.user_profile_service])
):
    return service.get_user_profile_by_user_id(user_id)

# Get the domains and role ids of the user using user id from user profile
@router.post("/get-domain-role-id", response_model=dict)
@inject
def get_domain_role_id(
    user_id: int = Query(..., title="User ID", description="The ID of the user."),
    current_user: User = Depends(get_current_active_user),
    service: UserProfileService = Depends(Provide[Container.user_profile_service])
):
    return service.get_domain_and_role_id(user_id)


@router.post("/add-measures", response_model=dict)
@inject
def add_measures(
    measures_data: MeasuresCreate,
    current_user: User = Depends(get_current_active_user),
    service: MeasuresService = Depends(Provide[Container.measures_service])
):
    return service.create_measure(measures_data)


@router.post("/get-measures", response_model=dict)
@inject
def get_measures(
    measures_data: GetMeasuresByDomainIdResponse,
    current_user: User = Depends(get_current_active_user),
    service: MeasuresService = Depends(Provide[Container.measures_service])
):
    return service.get_measure_id(measures_data)

@router.post("/save-measures", response_model=dict)
@inject
def save_measures(
    measures_data: UserMeasuresCreate,
    current_user: User = Depends(get_current_active_user),
    service: UserMeasuresService = Depends(Provide[Container.user_measures_service])
):
    return service.save_user_measure(measures_data)


@router.post("/get-user-measures", response_model=dict)
@inject
def get_user_measures(
    user_id: int = Query(..., title="User ID", description="The ID of the user."),
    current_user: User = Depends(get_current_active_user),
    service: UserMeasuresService = Depends(Provide[Container.user_measures_service])
):
    return service.get_user_measure_id(user_id)
    



