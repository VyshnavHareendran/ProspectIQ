from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db

from app.models.user import User

from app.repositories.user_repository import UserRepository

from app.dependencies.auth import get_current_admin

from app.schemas.auth import (
    EmployeeResponse,
    CreateEmployeeRequest,
    CreateEmployeeResponse,
    ChangeEmployeeStatusRequest,
    ChangeEmployeeStatusResponse,
)

from app.services.employee_management_service import EmployeeManagementService

router = APIRouter(
    prefix="/employees",
    tags=["Employee Management"]
)

@router.get(
    "/",
    response_model=List[EmployeeResponse]
)
def get_employees(

    db: Session = Depends(get_db),

    current_user: User = Depends(get_current_admin)

):

    repository = UserRepository(db)

    service = EmployeeManagementService(repository)

    return service.get_all_employees()


@router.post(
    "/",
    response_model=CreateEmployeeResponse,
    status_code=201,
)
def create_employee(
    request: CreateEmployeeRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin),
):

    repository = UserRepository(db)

    service = EmployeeManagementService(repository)

    try:
        return service.create_employee(
            full_name=request.full_name,
            email=request.email,
            role=request.role,
        )

    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e),
        )
    
    
@router.patch(
    "/{employee_id}/status",
    response_model=ChangeEmployeeStatusResponse
)
def change_employee_status(

    employee_id: int,

    request: ChangeEmployeeStatusRequest,

    db: Session = Depends(get_db),

    current_user: User = Depends(get_current_admin)

):

    repository = UserRepository(db)

    service = EmployeeManagementService(repository)

    try:

        return service.change_status(

            employee_id,

            request.is_active

        )

    except ValueError as e:

        raise HTTPException(

            status_code=404,

            detail=str(e)

        )