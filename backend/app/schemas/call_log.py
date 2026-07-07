from datetime import date, datetime
from typing import Optional

from pydantic import BaseModel

from app.schemas.call_status import CallStatus


class CallLogCreate(BaseModel):

    business_id: int

    employee_id: int

    call_status: CallStatus

    notes: Optional[str] = None

    next_followup_date: Optional[date] = None


class CallLogUpdate(BaseModel):

    call_status: Optional[CallStatus] = None

    notes: Optional[str] = None

    next_followup_date: Optional[date] = None


class CallLogResponse(BaseModel):

    id: int

    business_id: int

    employee_id: int

    call_status: CallStatus

    notes: Optional[str]

    next_followup_date: Optional[date]

    created_at: datetime

    class Config:

        from_attributes = True