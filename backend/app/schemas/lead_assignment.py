from datetime import datetime
from typing import Optional

from pydantic import BaseModel

from app.schemas.lead_assignment_status import (
    LeadAssignmentStatus
)


class LeadAssignmentCreate(BaseModel):

    business_id: int

    employee_id: int

    remarks: Optional[str] = None


class LeadAssignmentUpdate(BaseModel):

    employee_id: int

    remarks: Optional[str] = None


class LeadAssignmentResponse(BaseModel):

    id: int

    business_id: int

    employee_id: int

    assigned_by: int

    status: LeadAssignmentStatus

    remarks: Optional[str]

    is_active: bool

    assigned_at: datetime

    class Config:

        from_attributes = True