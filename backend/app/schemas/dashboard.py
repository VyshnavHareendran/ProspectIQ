from pydantic import BaseModel

from datetime import datetime, date


class DashboardSummaryResponse(BaseModel):

    total_businesses: int

    total_employees: int

    total_assignments: int

    total_calls: int

    today_followups: int

    average_lead_score: float


class CityDistributionResponse(BaseModel):

    city: str

    count: int


class CategoryDistributionResponse(BaseModel):

    category: str

    count: int


class RecentBusinessResponse(BaseModel):

    id: int

    business_name: str

    city: str

    category: str

    created_at: datetime

    class Config:
        from_attributes = True


class ImportSummaryResponse(BaseModel):

    total_imports: int

    completed_imports: int

    failed_imports: int

    processing_imports: int

    total_records_imported: int


class TopRatedBusinessResponse(BaseModel):

    id: int

    business_name: str

    category: str

    city: str

    google_rating: float

    review_count: int

    class Config:
        from_attributes = True

class RecentUploadResponse(BaseModel):

    id: int

    filename: str

    status: str

    valid_records: int

    duplicate_records: int

    created_at: datetime

    class Config:
        from_attributes = True

class RecentActivityResponse(BaseModel):

    type: str

    title: str

    description: str

    created_at: datetime

class UpcomingFollowupResponse(BaseModel):

    id: int

    business_name: str

    employee_name: str

    next_followup_date: date

    call_outcome: str | None

class LeadAssignmentStatusResponse(BaseModel):

    status: str

    count: int

class RecentCallResponse(BaseModel):

    id: int

    business_name: str

    employee_name: str

    call_outcome: str

    created_at: datetime

class EmployeePerformanceResponse(BaseModel):

    employee_name: str

    assigned_leads: int

    calls_made: int

    pending_followups: int