from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db

from app.dependencies.auth import get_verified_user
from app.models.user import User

from app.repositories.business_profile_repository import (
    BusinessProfileRepository,
)
from app.services.business_profile_service import (
    BusinessProfileService,
)



router = APIRouter(
    prefix="/businesses",
    tags=["Business Profile"],
)


def get_service(db: Session):
    return BusinessProfileService(
        BusinessProfileRepository(db)
    )


@router.get(
    "/{business_id}/profile",
    summary="Get Business Profile",
)
def get_business_profile(
    business_id: int,
    current_user: User = Depends(get_verified_user),
    db: Session = Depends(get_db),
):
    service = get_service(db)

    return service.get_business_profile(
        business_id
    )