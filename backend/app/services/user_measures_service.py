from sqlalchemy.orm import Session
from app.repository.roles_repository import RolesRepository
from app.repository.measures_repository import MeasuresRepository
from app.repository.user_measures_repository import UserMeasuresRepository
from app.model.sustainability_measures import SustainabilityMeasures




from app.schema.roles_schema import GetRolesResponse, RoleBase, RoleCreate
from app.schema.user_measures_schema import UserMeasuresCreate
from app.schema.measures_schema import MeasuresCreate, GetMeasuresByDomainIdResponse, MeasuresData, GetMeasuresResponse

from app.services.base_service import is_valid_name, is_valid_description
from fastapi import HTTPException, status
import traceback

import logging

class UserMeasuresService:
    def __init__(self, user_measures_repository: UserMeasuresRepository):
        self.user_measures_repository = user_measures_repository
            
    def get_user_measure_id(self, user_id: int):
        try:
            print("Getting measures based on the user id")
            results = self.user_measures_repository.get_user_measures_id(user_id)
            return results
        except Exception as e:
            logging.error(f"Error getting measures: {e}")
            raise e
    
        
    def save_user_measure(self, measure_data: UserMeasuresCreate):
        try:
            selected_measures_len = len(measure_data.measures)

            # Add the new measure to the list of measures
            if measure_data.new_measure:
                measures_repo = MeasuresRepository(session_factory=self.user_measures_repository.session_factory)
            
                data = MeasuresCreate(measure= measure_data.new_measure, info= "User created measure" )
                new_measure_id = measures_repo.create_measure(data).get("id")
                measure_data.measures.append(new_measure_id)

            if selected_measures_len == 0:
                raise ValueError("No measures were selected.")

            new_user_measure = self.user_measures_repository.save_user_measure(measure_data)
            return new_user_measure
    
        except ValueError as ve:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=str(ve)
            )
        except Exception as e:
            logging.error(f"Error creating measure: {e}")
            raise e
    

