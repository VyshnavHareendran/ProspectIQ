from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    UploadFile,
    File,
    Request,
    status,
)

from sqlalchemy.orm import Session

import os
import shutil
import uuid

from app.database import get_db
from app.dependencies.auth import get_current_employee
from app.models.user import User

from app.repositories.settings_repository import SettingsRepository
from app.repositories.user_repository import UserRepository

from app.services.settings_service import SettingsService

from app.schemas.settings import (
    AppearanceSettings,
    DashboardSettings,
    MessageResponse,
    ProfileSettingsResponse,
    ProfileSettingsUpdate,
    SecurityPasswordChangeRequest,
    SessionInfoResponse,
    SystemInfoResponse,
)


router = APIRouter(
    prefix="/employee/settings",
    tags=["Employee Settings"],
)


def get_settings_service(db: Session):
    return SettingsService(
        SettingsRepository(db),
        UserRepository(db),
    )


@router.get(
    "/profile",
    response_model=ProfileSettingsResponse,
)
def get_profile(
    current_user: User = Depends(get_current_employee),
    db: Session = Depends(get_db),
):
    return get_settings_service(db).get_profile(current_user)


@router.put(
    "/profile",
    response_model=ProfileSettingsResponse,
)
def update_profile(
    payload: ProfileSettingsUpdate,
    current_user: User = Depends(get_current_employee),
    db: Session = Depends(get_db),
):
    return get_settings_service(db).update_profile(
        current_user,
        payload,
    )


@router.post("/profile/photo")
def upload_profile_photo(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_employee),
    db: Session = Depends(get_db),
):
    allowed_extensions = [
        ".jpg",
        ".jpeg",
        ".png",
    ]

    extension = os.path.splitext(
        file.filename
    )[1].lower()

    if extension not in allowed_extensions:
        raise HTTPException(
            status_code=400,
            detail="Only JPG, JPEG and PNG images are allowed.",
        )

    max_size = 2 * 1024 * 1024

    file.file.seek(0, os.SEEK_END)
    file_size = file.file.tell()
    file.file.seek(0)

    if file_size > max_size:
        raise HTTPException(
            status_code=400,
            detail="Profile photo must be smaller than 2 MB.",
        )

    upload_dir = "static/profile_photos"

    os.makedirs(
        upload_dir,
        exist_ok=True,
    )

    filename = f"{uuid.uuid4()}{extension}"

    file_path = os.path.join(
        upload_dir,
        filename,
    )

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(
            file.file,
            buffer,
        )

    current_user.profile_photo = (
        f"/static/profile_photos/{filename}"
    )

    db.commit()
    db.refresh(current_user)

    return {
        "message": "Profile photo updated successfully.",
        "avatar_url": current_user.profile_photo,
    }

@router.delete("/profile/photo")
def reset_profile_photo(
    current_user: User = Depends(get_current_employee),
    db: Session = Depends(get_db),
):
    old_photo = current_user.profile_photo

    # Reset profile photo in database
    current_user.profile_photo = None

    db.commit()
    db.refresh(current_user)

    # Remove the old uploaded file if it exists
    if old_photo and old_photo.startswith("/static/profile_photos/"):
        filename = os.path.basename(old_photo)

        file_path = os.path.join(
            "static/profile_photos",
            filename,
        )

        if os.path.isfile(file_path):
            try:
                os.remove(file_path)
            except OSError:
                pass

    return {
        "message": "Profile photo reset successfully.",
        "avatar_url": "",
    }

@router.post(
    "/security/change-password",
    response_model=MessageResponse,
)
def change_password(
    payload: SecurityPasswordChangeRequest,
    current_user: User = Depends(get_current_employee),
    db: Session = Depends(get_db),
):
    try:
        return get_settings_service(db).change_password(
            current_user,
            payload.current_password,
            payload.new_password,
        )

    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(exc),
        ) from exc


@router.get(
    "/security/session",
    response_model=SessionInfoResponse,
)
def get_session(
    request: Request,
    current_user: User = Depends(get_current_employee),
):
    user_agent = request.headers.get(
        "user-agent",
        "Unknown browser",
    )

    ip = (
        request.client.host
        if request.client
        else "Unknown"
    )

    return {
        "current_device": f"{current_user.full_name}'s current session",
        "browser": user_agent,
        "os": "Detected from browser",
        "ip": ip,
        "last_login": "Current session",
    }

@router.get(
    "/dashboard",
    response_model=DashboardSettings,
)
def get_dashboard(
    current_user: User = Depends(get_current_employee),
    db: Session = Depends(get_db),
):
    return (
        get_settings_service(db)
        .get_dashboard(current_user.id)
    )


@router.put(
    "/dashboard",
    response_model=DashboardSettings,
)
def update_dashboard(
    payload: DashboardSettings,
    current_user: User = Depends(get_current_employee),
    db: Session = Depends(get_db),
):
    return (
        get_settings_service(db)
        .update_dashboard(
            current_user.id,
            payload,
        )
    )

@router.get(
    "/appearance",
    response_model=AppearanceSettings,
)
def get_appearance(
    current_user: User = Depends(get_current_employee),
    db: Session = Depends(get_db),
):
    return (
        get_settings_service(db)
        .get_appearance(current_user.id)
    )


@router.put(
    "/appearance",
    response_model=AppearanceSettings,
)
def update_appearance(
    payload: AppearanceSettings,
    current_user: User = Depends(get_current_employee),
    db: Session = Depends(get_db),
):
    return (
        get_settings_service(db)
        .update_appearance(
            current_user.id,
            payload,
        )
    )

@router.get(
    "/system",
    response_model=SystemInfoResponse,
)
def get_system(
    current_user: User = Depends(get_current_employee),
    db: Session = Depends(get_db),
):
    return get_settings_service(db).get_system_info()