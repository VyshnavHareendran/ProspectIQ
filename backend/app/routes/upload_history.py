from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.dependencies.auth import get_current_user

from app.models.user import User

from app.repositories.upload_history_repository import UploadHistoryRepository

from app.services.upload_history_service import UploadHistoryService

from app.schemas.upload_history import (
    UploadHistoryCreate,
    UploadHistoryResponse
)

from fastapi import UploadFile, File

from app.schemas.csv_preview import CSVPreviewResponse

router = APIRouter(
    prefix="/uploads",
    tags=["Upload History"]
)

@router.post(
    "/history",
    response_model=UploadHistoryResponse,
    status_code=201
)
def create_upload_history(
    upload_data: UploadHistoryCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    repository = UploadHistoryRepository(db)

    service = UploadHistoryService(repository)

    return service.create_upload(
        upload_data,
        current_user.id
    )

@router.get(
    "/history",
    response_model=list[UploadHistoryResponse]
)
def get_all_uploads(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    repository = UploadHistoryRepository(db)

    service = UploadHistoryService(repository)

    return service.get_all_uploads()

@router.get(
    "/history/{upload_id}",
    response_model=UploadHistoryResponse
)
def get_upload(
    upload_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    repository = UploadHistoryRepository(db)

    service = UploadHistoryService(repository)

    return service.get_upload_by_id(
        upload_id
    )

@router.post(
    "/businesses/preview",
    response_model=CSVPreviewResponse
)
async def preview_business_csv(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Preview uploaded CSV.
    """

    repository = UploadHistoryRepository(db)

    service = UploadHistoryService(repository)

    return await service.preview_csv(
    file=file,
    uploaded_by=current_user.id
    )