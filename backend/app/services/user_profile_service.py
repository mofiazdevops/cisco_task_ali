from fastapi import HTTPException, status
from app.repository.user_profile_repository import UserProfileRepository
from app.schema.user_profile_schema import GetUserProfileResponse, UserProfileBase, UserProfileCreate
import logging
import traceback

from app.repository.roles_repository import RolesRepository
from app.repository.user_repository import UserRepository
from app.repository.domain_type_repository import DomainTypeRepository

# import is_valid_name
from app.services.base_service import is_valid_name

class UserProfileService:
    def __init__(self, user_profile_repository: UserProfileRepository):
        self.user_profile_repository = user_profile_repository

    def get_user_profile(self):
        try:
            print("Getting profiles")
            results = self.user_profile_repository.get_user_profile()["results"]
            print(f"Results Again: {results}")
            profiles = [UserProfileBase(**result) for result in results]
            logging.info(f"This the result being received from repo: {profiles}")
            return GetUserProfileResponse(profiles=profiles)
        except Exception as e:
            logging.error(f"Error getting roles: {e}")
            raise e
        
    def get_user_profile_by_user_id(self, user_id: int):
        try:
            print("Getting roles by id")
            result = self.user_profile_repository.get_user_profile_by_user_id(user_id)

            # Getting the user name and email from the user id in result
            user_repo = UserRepository(session_factory=self.user_profile_repository.session_factory)
            user = user_repo.get_user_by_id(user_id)
            name = user["name"]
            email = user["email"]

            # Getting the domain name from the domain id in result
            domain_repo = DomainTypeRepository(session_factory=self.user_profile_repository.session_factory)
            domain = domain_repo.get_domain_by_id(result["domain_id"])
            domain_name = domain["domain_name"]

            # Getting the role name from the role id in result
            role_repo = RolesRepository(session_factory=self.user_profile_repository.session_factory)
            role = role_repo.get_role_by_id(result["role_id"])
            role_name = role["role_name"]

            organization_name = result["organization_name"]

            # Initials of the name in capital letters
            name_parts = name.split()
            # Extract the first letter of each part and join them
            initials = ''.join([part[0] for part in name_parts if part]).upper()


            return {
                "name": name,
                "email": email,
                "organization": organization_name,
                "domain": domain_name,
                "role": role_name,
                "initials": initials
            } 
        except Exception as e:
            logging.error(f"Error getting roles: {e}")
            raise e

    def create_user_profile(self, user_profile_data: UserProfileCreate) -> dict:
        logging.info("Creating a new user profile")
        try:

            if not is_valid_name(user_profile_data.organization_name):
                raise ValueError("Unallowed letters used for organization name.")

            result = self.user_profile_repository.create_user_profile(user_profile_data.dict())

            return {
                "message": f"User profile with id {user_profile_data.user_id} created successfully",
            }
        
        except ValueError as ve:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=str(ve)
            )

        except HTTPException as http_exc:
            raise http_exc

        except Exception as e:
            traceback.print_exc()

            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Internal Server Error in service."
            )
        
    
    # Get the domain id and role id from the user profile based on user id
    def get_domain_and_role_id(self, user_id: int):
        try:
            result = self.user_profile_repository.get_domain_and_role_id(user_id)
            return {
                "domain_id": result["domain_id"],
                "role_id": result["role_id"]
            }
        except Exception as e:
            logging.error(f"Error getting the domain and role ids of the user: {e}")
            raise e
        
    
        