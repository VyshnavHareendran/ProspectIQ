from pydantic import BaseModel
from typing import Optional
from datetime import date

class CompleteCallRequest(BaseModel):
    assignment_id: int
    call_status: str
    remarks: Optional[str] = None
    duration: Optional[str] = None
    next_followup_date: Optional[date] = None