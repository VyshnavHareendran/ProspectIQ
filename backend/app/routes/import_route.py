from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db

from app.schemas.import_request import ImportRequest

from app.services.import_service import ImportService

from app.dependencies.auth import get_current_admin
from app.models.user import User

router = APIRouter(
    prefix="/imports",
    tags=["Imports"]
)


@router.post("/businesses")
async def import_businesses(
    request: ImportRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin)
):
    service = ImportService(db)

    return service.import_businesses(request)