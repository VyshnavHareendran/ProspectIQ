from datetime import date, datetime
from typing import Optional

from pydantic import BaseModel


class BusinessProfileBusiness(BaseModel):
    id: int
    business_name: str
    category: str
    phone_number: str
    email: Optional[str] = None
    website_url: Optional[str] = None
    address: str
    city: str
    google_rating: float
    review_count: int

    class Config:
        from_attributes = True


class BusinessProfileLeadScore(BaseModel):
    lead_score: float
    priority: str

    class Config:
        from_attributes = True


class BusinessProfileAssignment(BaseModel):
    employee_name: str
    status: str
    assigned_at: datetime


class BusinessProfileLatestCall(BaseModel):
    call_outcome: str
    duration: Optional[str] = None
    notes: Optional[str] = None
    next_followup_date: Optional[date] = None
    created_at: datetime


class BusinessProfileResponse(BaseModel):
    business: BusinessProfileBusiness
    lead_score: Optional[BusinessProfileLeadScore] = None
    assignment: Optional[BusinessProfileAssignment] = None
    latest_call: Optional[BusinessProfileLatestCall] = None