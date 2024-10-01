from sqlalchemy.orm import Session
from app.model.user_profile import UserProfile
from app.schema.user_profile_schema import UserProfileCreate
from app.repository.base_repository import BaseRepository
from typing import Callable, Dict, List
from contextlib import AbstractContextManager
from sqlmodel import select

from fastapi import HTTPException, status
from sqlalchemy.exc import IntegrityError, DataError

class UserProfileRepository(BaseRepository):
    def __init__(self, session_factory: Callable[..., AbstractContextManager[Session]]):
        self.session_factory = session_factory
        super().__init__(session_factory, UserProfile)

    def get_user_profile(self):
        with self.session_factory() as session:
            print("Before getting roles")
            res = session.execute("select * from user_profiles")
            print(f"After getting roles: {res}")
            results = res.fetchall()
            print(f"final results: {results}")
            return {
                "results": results,
            }
    
    def get_user_profile_by_user_id(self, user_id: int):
        try: 
            with self.session_factory() as session:
                user_profile = session.execute(f"select * from user_profiles where user_id = {user_id}").fetchone()

                if user_profile is None:
                    raise ValueError("No such id exists in the database.")
                return {
                    "user_id": user_profile.user_id,
                    "organization_name": user_profile.organization_name,
                    "domain_id": user_profile.domain_id,
                    "role_id": user_profile.role_id
                }
            
        except ValueError as ve:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=str(ve)
            )
        
        except Exception as e:
            raise HTTPException(
                status_code=500, 
                detail="An error occurred while retrieving the user profile."
            )
        
    def user_profile_exists(self, user_profile_id) -> bool:
        with self.session_factory() as session:
            statement = select(UserProfile).where(UserProfile.user_id == user_profile_id)
            results = session.execute(statement).first()
            return results is not None


    def create_user_profile(self, user_profile: UserProfileCreate) -> dict:
        try:
            with self.session_factory() as session:
                new_user_profile = UserProfile(**user_profile)
                session.add(new_user_profile)
                session.commit()
                
                return {
                    "id": new_user_profile.id,
                    "user_id": new_user_profile.user_id,
                    "organization_name": new_user_profile.organization_name,
                    "domain_id": new_user_profile.domain_id,
                    "role_id": new_user_profile.role_id
                }
            
        except IntegrityError as e:
            session.rollback()
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Data integrity issue, such as a duplicate ID or invalid foreign key."
            )
        
        except DataError as e:
            session.rollback()
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail="Invalid data sent to the database."
            )
        
        except Exception as e:
            print(f"Error while creating user profile in repository: {e}")
            session.rollback()
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Internal Server Error",
            )
        
    def get_domain_and_role_id(self, user_id: int) -> Dict[str, int]:
        try:
            with self.session_factory() as session:
                user_profile = session.execute(f"select * from user_profiles where user_id = {user_id}").fetchone()

                if user_profile is None:
                    raise ValueError("No such user id exists in the user profile table.")

                return {
                    "domain_id": user_profile.domain_id,
                    "role_id": user_profile.role_id
                }
        
        except ValueError as ve:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=str(ve)
            )
        
        except IntegrityError as e:
            session.rollback()
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Data integrity issue, such as a duplicate ID or invalid foreign key."
            )
        
        except DataError as e:
            session.rollback()
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail="Invalid data sent to the database."
            )
        
        except Exception as e:
            print(f"Error while creating user profile in repository: {e}")
            session.rollback()
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Internal Server Error",
            )
        