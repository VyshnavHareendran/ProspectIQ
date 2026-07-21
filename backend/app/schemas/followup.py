from datetime import date
from typing import Optional

from pydantic import BaseModel


class FollowupItem(BaseModel):
    assignment_id: int
    business_id: int

    business_name: str
    category: Optional[str] = None
    city: Optional[str] = None

    phone_number: Optional[str] = None

    lead_score: Optional[float] = None
    priority: Optional[str] = None

    status: str

    last_call_outcome: Optional[str] = None
    last_call_date: Optional[date] = None

    next_followup_date: Optional[date] = None


class FollowupStats(BaseModel):
    today: int
    pending: int
    overdue: int


class FollowupResponse(BaseModel):
    today: list[FollowupItem]
    pending: list[FollowupItem]
    overdue: list[FollowupItem]

    stats: FollowupStats