from sqlalchemy.orm import Session
from app.repository.domain_type_repository import DomainTypeRepository
from app.schema.domain_type_schema import DomainTypeCreate
from app.schema.domain_type_schema import GetDomainTypesResponse, DomainTypeBase, DomainTypeGet

from app.services.base_service import is_valid_name
from fastapi import HTTPException, status
import traceback

import logging

class DomainTypeService:
    def __init__(self, domain_type_repository: DomainTypeRepository):
        self.domain_type_repository = domain_type_repository

    def get_domain_types(self) -> GetDomainTypesResponse:
        print("Getting domain types")
        results = self.domain_type_repository.get_domain_types()["results"]
        domain_types = [DomainTypeGet(**result) for result in results]
        logging.info(f"This the result being received from repo: {domain_types}")
        return GetDomainTypesResponse(domain_types=domain_types)

    def create_domain_type(self, domain_type_data: DomainTypeCreate):
        try:
            is_domain_name_valid = is_valid_name(domain_type_data.name)
            is_domain_descr_valid = is_valid_name(domain_type_data.description)

            if not is_domain_name_valid or not is_domain_descr_valid:
                raise ValueError("Invalid domain name or description.") 
            
            return self.domain_type_repository.create_domain_type(domain_type_data)
        
        except ValueError as ve:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=str(ve)
            )
