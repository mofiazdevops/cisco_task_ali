from sqlalchemy.orm import Session
from app.model.sustainability_measures import SustainabilityMeasures
from app.repository.base_repository import BaseRepository
from typing import Callable, Dict, List
from contextlib import AbstractContextManager
from sqlmodel import select

from app.schema.measures_schema import MeasuresCreate

from fastapi import HTTPException, status
from sqlalchemy.exc import IntegrityError, DataError

class MeasuresRepository(BaseRepository):
    def __init__(self, session_factory: Callable[..., AbstractContextManager[Session]]):
        self.session_factory = session_factory
        super().__init__(session_factory, SustainabilityMeasures)

    # def get_role_types(self):
    #     with self.session_factory() as session:
    #         print("Before getting roles")
    #         res = session.execute("select * from roles")
    #         print(f"After getting domain types: {res}")
    #         results = res.fetchall()
    #         print(f"final results: {results}")
    #         return {
    #             "results": results,
    #         }
        
    # def get_role_by_id(self, role_id: int):
    #     try: 
    #         with self.session_factory() as session:
    #             role = session.execute(f"select * from roles where id = {role_id}").fetchone()

    #             if role is None:
    #                 raise ValueError("No such id exists in the database.")
    #             return {
    #                 "role_name": role.name,
    #             }
            
    #     except ValueError as ve:
    #         raise HTTPException(
    #             status_code=status.HTTP_404_NOT_FOUND,
    #             detail=str(ve)
    #         )
        
    #     except Exception as e:
    #         raise HTTPException(
    #             status_code=500, 
    #             detail="An error occurred while retrieving the role."
    #         )
        
        
    def get_measures(self, domain_id, role_id):
        try:
            with self.session_factory() as session:
                print("Before getting measures")
                query = "SELECT id, measure, info FROM sustainability_measures WHERE domain_id = :domain_id AND role_id = :role_id"
                res = session.execute(query, {'domain_id': domain_id, 'role_id': role_id})
                print(f"After getting measures: {res}")
                results = res.fetchall()
                print(f"final results----------------------------: {results}")
                return results
            
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
            print(f"Error while adding a domain type: {e}")

            # Rollback the transaction in case of an error
            session.rollback()

            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Internal Server Error",
            )
 
        
    def create_measure(self, measure_data: MeasuresCreate):
        try:
            with self.session_factory() as session:

                new_measure = SustainabilityMeasures(**measure_data.dict())
                session.add(new_measure)
                session.commit()

                return {
                    "id": new_measure.id,
                    # "domain_type_id": new_measure.domain_id,
                    # "role_type_id": new_measure.role_id,
                    # "title": new_measure.measure,
                    # "info": new_measure.info,
                    "status": True,
                    "message": f"{new_measure.measure} added successfully."
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
            print(f"Error while adding the new measure: {e}")

            # Rollback the transaction in case of an error
            session.rollback()

            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Internal Server Error",
            )

   