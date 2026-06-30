from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.dependencies.auth import get_current_user

from app.models.user import User

from app.schemas.business import (
    BusinessCreate,
    BusinessResponse
)

from app.repositories.business_repository import BusinessRepository
from app.services.business_service import BusinessService


router = APIRouter(
    prefix="/businesses",
    tags=["Businesses"]
)


@router.post(
    "",
    response_model=BusinessResponse,
    status_code=201
)
def create_business(
    business_data: BusinessCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Create a new business.

    Accessible by:
    - Admin
    - Employee

    Automatically:
    - Checks for duplicates
    - Sets created_by from logged-in user
    """

    # Repository
    repository = BusinessRepository(db)

    # Service
    service = BusinessService(repository)

    # Create Business
    return service.create_business(
        business_data=business_data,
        created_by=current_user.id
    )

@router.get(
    "",
    response_model=list[BusinessResponse]
)
def get_all_businesses(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Get all active businesses.
    """

    repository = BusinessRepository(db)

    service = BusinessService(repository)

    return service.get_all_businesses()

@router.get(
    "/{business_id}",
    response_model=BusinessResponse
)
def get_business(
    business_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    repository = BusinessRepository(db)
    service = BusinessService(repository)

    return service.get_business_by_id(business_id)