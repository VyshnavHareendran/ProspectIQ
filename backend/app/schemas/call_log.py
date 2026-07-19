from app.schemas.user import UserResponse
from app.schemas.lead_assignment import LeadAssignmentResponse

from datetime import date, datetime
from typing import Optional

from pydantic import BaseModel


class CallLogCreate(BaseModel):

    lead_assignment_id: int

    employee_id: int

    call_outcome: str

    duration: Optional[str] = None

    notes: Optional[str] = None

    next_followup_date: Optional[date] = None


class CallLogUpdate(BaseModel):

    call_outcome: Optional[str] = None

    duration: Optional[str] = None

    notes: Optional[str] = None

    next_followup_date: Optional[date] = None


class CallLogResponse(BaseModel):

    id: int

    lead_assignment_id: int

    employee_id: int

    call_outcome: str

    duration: Optional[str]

    notes: Optional[str]

    next_followup_date: Optional[date]

    created_at: datetime

    employee: UserResponse

    lead_assignment: LeadAssignmentResponse

    class Config:
        from_attributes = True