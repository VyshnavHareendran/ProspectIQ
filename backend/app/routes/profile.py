from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db

from app.dependencies.auth import get_current_user

from app.models.user import User

from app.repositories.profile_repository import (
    ProfileRepository
)

from app.services.profile_service import (
    ProfileService
)

from app.schemas.profile import (
    ProfileResponse
)


router = APIRouter(
    prefix="/profile",
    tags=["Profile"]
)


def get_service(db: Session):

    repository = ProfileRepository(db)

    return ProfileService(repository)


@router.get(
    "/me",
    response_model=ProfileResponse
)
def get_my_profile(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    return (
        get_service(db)
        .get_profile(current_user.id)
    )