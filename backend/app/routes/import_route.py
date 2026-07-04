from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db

from app.schemas.import_request import ImportRequest

from app.services.import_service import ImportService

router = APIRouter(
    prefix="/imports",
    tags=["Imports"]
)


@router.post("/businesses")
async def import_businesses(
    request: ImportRequest,
    db: Session = Depends(get_db)
):
    service = ImportService(db)

    return service.import_businesses(request)