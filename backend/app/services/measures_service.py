from sqlalchemy.orm import Session
from app.repository.roles_repository import RolesRepository
from app.repository.measures_repository import MeasuresRepository

from app.schema.roles_schema import GetRolesResponse, RoleBase, RoleCreate
from app.schema.measures_schema import MeasuresCreate, GetMeasuresByDomainIdResponse, MeasuresData, GetMeasuresResponse

from app.services.base_service import is_valid_name, is_valid_description
from fastapi import HTTPException, status
import traceback

import logging

class MeasuresService:
    def __init__(self, measures_repository: MeasuresRepository):
        self.measures_repository = measures_repository

    # def get_measures(self):
    #     try:
    #         print("Getting roles")
    #         results = self.roles_repository.get_role_types()["results"]
    #         roles = [RoleBase(**result) for result in results]
    #         logging.info(f"This the result being received from repo: {roles}")
    #         return GetRolesResponse(roles=roles)
    #     except Exception as e:
    #         logging.error(f"Error getting roles: {e}")
    #         raise e
    
        
    def get_measure_id(self, measure_data: GetMeasuresByDomainIdResponse):
        try:
            print("Getting measures based on domain id and role id")
            domain_id = measure_data.domain_id
            role_id = measure_data.role_id
            results = self.measures_repository.get_measures(domain_id, role_id)
            roles = [MeasuresData(**result) for result in results]
            logging.info(f"This the result being received from repo: {roles}")
            return GetMeasuresResponse(measures=results)
        except Exception as e:
            logging.error(f"Error getting measures: {e}")
            raise e
    
        
    def create_measure(self, measure_data: MeasuresCreate):
        try:
            is_title_valid = is_valid_description(measure_data.measure)
            is_info_valid = is_valid_description(measure_data.info)

            if not is_title_valid or not is_info_valid:
                raise ValueError("Invalid measure type. Please use allowed characters.")
            
            new_measure = self.measures_repository.create_measure(measure_data)
            return new_measure
    
        except ValueError as ve:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=str(ve)
            )
    

