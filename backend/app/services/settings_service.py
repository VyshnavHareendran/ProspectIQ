from datetime import datetime
from importlib.metadata import PackageNotFoundError, version

from app.core.config import settings as app_settings
from app.core.security import hash_password, verify_password
from app.models.user import User
from app.repositories.settings_repository import SettingsRepository
from app.repositories.user_repository import UserRepository
from app.schemas.settings import (
    AISettings,
    AppearanceSettings,
    CompanySettings,
    DashboardSettings,
    NotificationSettings,
    ProfileSettingsUpdate,
)


class SettingsService:
    PROFILE_KEY = "profile"
    COMPANY_KEY = "company"
    AI_KEY = "ai"
    NOTIFICATION_KEY = "notifications"
    DASHBOARD_KEY = "dashboard"
    APPEARANCE_KEY = "appearance"

    def __init__(
        self,
        settings_repository: SettingsRepository,
        user_repository: UserRepository | None = None,
    ):
        self.settings_repository = settings_repository
        self.user_repository = user_repository

    def get_profile(self, user: User):
        extras = self.settings_repository.get_value(
            self.PROFILE_KEY,
            {},
            user_id=user.id,
        )

        return {
            "id": user.id,
            "full_name": user.full_name,
            "email": user.email,
            "role": user.role,
            "is_active": user.is_active,
            "must_change_password": user.must_change_password,
            "created_at": user.created_at,
            "phone": extras.get("phone", ""),
            "department": extras.get("department", ""),
            "designation": extras.get("designation", user.role.title()),
            "employee_id": extras.get("employee_id", f"EMP{user.id:03d}"),
            "last_login": extras.get("last_login", "Current session"),
            "avatar_url": user.profile_photo or "",
        }

    def update_profile(self, user: User, payload: ProfileSettingsUpdate):
        if not self.user_repository:
            raise ValueError("User repository is required.")

        user.full_name = payload.full_name.strip()
        self.user_repository.update(user)

        current = self.settings_repository.get_value(
            self.PROFILE_KEY,
            {},
            user_id=user.id,
        )
        current.update(
            {
                "phone": payload.phone,
                "department": payload.department,
                "designation": payload.designation,
            }
        )
        self.settings_repository.upsert(self.PROFILE_KEY, current, user_id=user.id)

        return self.get_profile(user)

    def change_password(self, user: User, current_password: str, new_password: str):
        if not self.user_repository:
            raise ValueError("User repository is required.")

        if not verify_password(current_password, user.password_hash):
            raise ValueError("Current password is incorrect.")

        self.user_repository.change_password(user, hash_password(new_password))

        return {"message": "Password changed successfully."}

    def get_company(self):
        data = self.settings_repository.get_value(
            self.COMPANY_KEY,
            CompanySettings().model_dump(),
        )
        return CompanySettings(**data)

    def update_company(self, payload: CompanySettings):
        self.settings_repository.upsert(self.COMPANY_KEY, payload.model_dump())
        return payload

    def get_ai(self):
        data = self.settings_repository.get_value(self.AI_KEY, AISettings().model_dump())
        return AISettings(**data)

    def update_ai(self, payload: AISettings):
        self.settings_repository.upsert(self.AI_KEY, payload.model_dump())
        return payload

    def get_notifications(self, user_id: int):
        data = self.settings_repository.get_value(
            self.NOTIFICATION_KEY,
            NotificationSettings().model_dump(),
            user_id=user_id,
        )
        return NotificationSettings(**data)

    def update_notifications(self, user_id: int, payload: NotificationSettings):
        self.settings_repository.upsert(
            self.NOTIFICATION_KEY,
            payload.model_dump(),
            user_id=user_id,
        )
        return payload

    def get_dashboard(self, user_id: int):
        data = self.settings_repository.get_value(
            self.DASHBOARD_KEY,
            DashboardSettings().model_dump(),
            user_id=user_id,
        )
        return DashboardSettings(**data)

    def update_dashboard(self, user_id: int, payload: DashboardSettings):
        self.settings_repository.upsert(
            self.DASHBOARD_KEY,
            payload.model_dump(),
            user_id=user_id,
        )
        return payload

    def get_appearance(self, user_id: int):
        data = self.settings_repository.get_value(
            self.APPEARANCE_KEY,
            AppearanceSettings().model_dump(),
            user_id=user_id,
        )
        return AppearanceSettings(**data)

    def update_appearance(self, user_id: int, payload: AppearanceSettings):
        self.settings_repository.upsert(
            self.APPEARANCE_KEY,
            payload.model_dump(),
            user_id=user_id,
        )
        return payload

    def get_system_info(self):
        try:
            fastapi_version = version("fastapi")
        except PackageNotFoundError:
            fastapi_version = "unknown"

        return {
            "application_version": "ProspectIQ 1.0.0",
            "environment": "Production",
            "database_status": "Connected",
            "api_status": "Operational",
            "backend_url": "http://localhost:8000",
            "frontend_version": "React 19 + Vite",
            "server_time": datetime.now().isoformat(timespec="seconds"),
            "health_status": "Healthy",
            "extra": {
                "algorithm": app_settings.ALGORITHM,
                "fastapi_version": fastapi_version,
            },
        }
