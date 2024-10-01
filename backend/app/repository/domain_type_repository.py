from sqlalchemy.orm import Session
from app.model.domain_types import DomainTypes
from app.schema.domain_type_schema import DomainTypeCreate
from app.repository.base_repository import BaseRepository
from typing import Callable, Dict, List
from contextlib import AbstractContextManager
from sqlmodel import select

from fastapi import HTTPException, status

class DomainTypeRepository(BaseRepository):
    def __init__(self, session_factory: Callable[..., AbstractContextManager[Session]]):
        self.session_factory = session_factory
        super().__init__(session_factory, DomainTypes)

    def get_domain_types(self):
        with self.session_factory() as session:
            print("Before getting domain types")
            res = session.execute("select * from domain_types")
            print(f"After getting domain types: {res}")
            results = res.fetchall()
            print(f"final results: {results}")
            return {
                "results": results,
            }

    def get_domain_by_id(self, domain_id: int):
        try: 
            with self.session_factory() as session:
                domain = session.execute(f"select * from domain_types where id = {domain_id}").fetchone()

                if domain is None:
                    raise ValueError("No such id exists in the database.")

                print(f"This is the domain: {domain}")
                return {
                    "domain_name": domain.name,
                }
            
        except ValueError as ve:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=str(ve)
            )
        
        except Exception as e:
            raise HTTPException(
                status_code=500, 
                detail="An error occurred while retrieving the domain."
            )

    

    def create_domain_type(self, domain_type_data: DomainTypeCreate):

        try:
            with self.session_factory() as session:
                existing_domain_type = session.execute(select(DomainTypes).where(DomainTypes.name == domain_type_data.name)).first()
                if existing_domain_type:
                    raise ValueError(f"Domain type with name '{domain_type_data.name}' already exists.")

                new_domain_type = DomainTypes(**domain_type_data.dict())

                session.add(new_domain_type)
                session.commit()

                return {
                    "domain_type_id": new_domain_type.id,
                    "name": new_domain_type.name,
                    "description": new_domain_type.description,
                }
        except Exception as e:
            print(f"Error while adding a domain type: {e}")

            # Rollback the transaction in case of an error
            session.rollback()

            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Internal Server Error",
            )

