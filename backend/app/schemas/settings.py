from datetime import datetime
from typing import Any

from pydantic import BaseModel, EmailStr, Field


class ProfileSettingsResponse(BaseModel):
    id: int
    full_name: str
    email: EmailStr
    role: str
    is_active: bool
    must_change_password: bool
    created_at: datetime | None = None
    phone: str = ""
    department: str = ""
    designation: str = ""
    employee_id: str = ""
    last_login: str = ""
    avatar_url: str = ""


class ProfileSettingsUpdate(BaseModel):
    full_name: str = Field(min_length=1, max_length=100)
    phone: str = ""
    department: str = ""
    designation: str = ""


class SecurityPasswordChangeRequest(BaseModel):
    current_password: str
    new_password: str = Field(min_length=8)


class MessageResponse(BaseModel):
    message: str


class CompanySettings(BaseModel):
    name: str = "ProspectIQ CRM"
    industry: str = "Sales Intelligence"
    website: str = ""
    phone: str = ""
    address: str = ""
    city: str = ""
    state: str = ""
    country: str = ""
    timezone: str = "Asia/Kolkata"
    currency: str = "INR"
    business_hours: str = "09:00 - 18:00"
    logo_url: str = ""


class AISettings(BaseModel):
    lead_threshold: int = Field(default=72, ge=0, le=100)
    confidence_score: int = Field(default=84, ge=0, le=100)
    auto_assign: bool = True
    predictive_analysis: bool = True
    model_version: str = "v3.2"
    daily_processing: bool = True


class NotificationSettings(BaseModel):
    email_notifications: bool = True
    browser_notifications: bool = True
    daily_reports: bool = True
    weekly_reports: bool = True
    monthly_reports: bool = False
    lead_assignment_alerts: bool = True
    call_reminder_alerts: bool = True
    system_updates: bool = True


class DashboardSettings(BaseModel):
    recent_activities: bool = True
    statistics: bool = True
    charts: bool = True
    compact_mode: bool = False
    default_landing_page: str = "dashboard"


class AppearanceSettings(BaseModel):
    theme: str = "light"
    primary_color: str = "#1976d2"
    density: str = "comfortable"
    font_size: int = Field(default=14, ge=12, le=18)
    border_radius: int = Field(default=12, ge=4, le=20)
    language: str = "en"


class SessionInfoResponse(BaseModel):
    current_device: str
    browser: str
    os: str
    ip: str
    last_login: str


class SystemInfoResponse(BaseModel):
    application_version: str
    environment: str
    database_status: str
    api_status: str
    backend_url: str
    frontend_version: str
    server_time: str
    health_status: str
    extra: dict[str, Any] = {}
