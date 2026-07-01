from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.dependencies.auth import get_current_user

from app.models.user import User

from app.schemas.business import (
    BusinessCreate,
    BusinessUpdate,
    BusinessResponse,
    BusinessListResponse
)

from app.repositories.business_repository import BusinessRepository
from app.services.business_service import BusinessService

from typing import Optional
from fastapi import Query

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
    response_model=BusinessListResponse
)
def get_all_businesses(
    search: Optional[str] = Query(None),
    city: Optional[str] = Query(None),
    category: Optional[str] = Query(None),
    sort_by: str = Query("created_at"),
    sort_order: str = Query("desc"),
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    repository = BusinessRepository(db)
    service = BusinessService(repository)

    return service.get_all_businesses(
        search=search,
        city=city,
        category=category,
        sort_by=sort_by,
        sort_order=sort_order,
        page=page,
        page_size=page_size
    )

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

@router.put(
    "/{business_id}",
    response_model=BusinessResponse
)
def update_business(
    business_id: int,
    business_data: BusinessUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Update an existing business.

    Accessible by:
    - Admin
    - Employee
    """

    repository = BusinessRepository(db)

    service = BusinessService(repository)

    return service.update_business(
        business_id=business_id,
        business_data=business_data,
        updated_by=current_user.id
    )

@router.delete(
    "/{business_id}"
)
def delete_business(
    business_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    repository = BusinessRepository(db)

    service = BusinessService(repository)

    service.delete_business(
        business_id
    )

    return {
        "message": "Business deleted successfully."
    }


