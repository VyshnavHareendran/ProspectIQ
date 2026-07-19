from datetime import datetime
from typing import Optional

from pydantic import BaseModel

from app.schemas.lead_assignment_status import (
    LeadAssignmentStatus
)

from app.schemas.business import BusinessResponse


class LeadAssignmentCreate(BaseModel):

    business_id: int

    employee_id: int

    remarks: Optional[str] = None


class LeadAssignmentUpdate(BaseModel):

    employee_id: int

    remarks: Optional[str] = None

class EmployeeLeadUpdate(BaseModel):

    status: LeadAssignmentStatus

    remarks: Optional[str] = None

    call_outcome: Optional[str] = None


class LeadAssignmentResponse(BaseModel):

    id: int

    business_id: int

    employee_id: int

    assigned_by: int

    status: LeadAssignmentStatus

    remarks: Optional[str]

    call_outcome: Optional[str]

    is_active: bool

    assigned_at: datetime

    updated_at: Optional[datetime]

    business: BusinessResponse

    class Config:

        from_attributes = True

class BulkLeadAssignmentRequest(BaseModel):

    employee_ids: list[int]

    count: int