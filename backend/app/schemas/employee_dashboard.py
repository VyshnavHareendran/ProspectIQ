from datetime import datetime

from pydantic import BaseModel


class DashboardStatsResponse(BaseModel):
    assigned_leads: int
    high_priority: int
    calls_today: int
    followups: int
    closed_leads: int
    average_score: float


class DashboardLeadResponse(BaseModel):
    id: int
    business_name: str
    phone_number: str
    priority: str | None
    lead_score: float | None
    status: str


class WeeklyCallResponse(BaseModel):
    day: str
    calls: int


class FollowupResponse(BaseModel):
    business: str
    time: str
    priority: str | None


class ActivityResponse(BaseModel):
    business: str
    outcome: str
    created_at: datetime


class EmployeeDashboardResponse(BaseModel):
    stats: DashboardStatsResponse
    assigned_leads: list[DashboardLeadResponse]
    weekly_calls: list[WeeklyCallResponse]
    followups: list[FollowupResponse]
    activities: list[ActivityResponse]