from sqlalchemy.orm import Session
from app.model.user_measures import UserMeasures

from app.repository.base_repository import BaseRepository
from typing import Callable, Dict, List
from contextlib import AbstractContextManager
from sqlmodel import select

from app.schema.user_measures_schema import UserMeasuresCreate

from fastapi import HTTPException, status
from sqlalchemy.exc import IntegrityError, DataError

class UserMeasuresRepository(BaseRepository):
    def __init__(self, session_factory: Callable[..., AbstractContextManager[Session]]):
        self.session_factory = session_factory
        super().__init__(session_factory, UserMeasures)

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

    def user_has_measures(self, user_id: int):
        with self.session_factory() as session:
            statement = select(UserMeasures).where(UserMeasures.user_id == user_id)
            results = session.execute(statement).first()
            return results is not None
        
    def get_user_measures_id(self, user_id: int):
        try: 
            with self.session_factory() as session:
                user_exists = session.execute(f"select * from user_measures where user_id = {user_id}").fetchone()

                if user_exists is None:
                    raise ValueError("No such id exists in the database.")
                
                user = session.execute(f"select * from user_measures where user_id = {user_id}").fetchall()
                
                user_sustainability_measures = []
                for measure in user:
                    user_sustainability_measures.append( measure.sustainability_id)

                measure_titles = []
                for measure_id in user_sustainability_measures:
                    measure = session.execute(f"select measure from sustainability_measures where id = {measure_id}").fetchone()
                    measure_titles.append(measure.measure)


                return {
                    "measures": measure_titles,
                }
            
        except ValueError as ve:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=str(ve)
            )
        
        except Exception as e:
            raise HTTPException(
                status_code=500, 
                detail="An error occurred while retrieving the role."
            )
        
        
    def get_user_measures(self, domain_id, role_id):
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
 
        
    def save_user_measure(self, measure_data: UserMeasuresCreate):
        try:
            with self.session_factory() as session:
                sustainability_ids = measure_data.measures
                user_id = measure_data.user_id

                # Delete old rows with user id
                session.execute(f"delete from user_measures where user_id = {user_id}")

                for sustainability_id in sustainability_ids:
                    measure_data = UserMeasures(
                        user_id=user_id,
                        sustainability_id=sustainability_id
                    )
                    session.add(measure_data)
                
                session.commit()

                # new_measure = UserMeasures(**measure_data.dict())
                # session.add(new_measure)

                return {
                    "status": True,
                    "message": f"Sustainability measures added successfully."
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
                detail=f"Internal Server Error: {e}",
            )

   