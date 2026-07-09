from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class BusinessReportResponse(BaseModel):

    id: int

    business_name: str

    category: str

    city: str

    phone_number: str

    google_rating: float

    review_count: int

    status: str

    created_at: datetime

    class Config:
        from_attributes = True


class UploadReportResponse(BaseModel):

    id: int

    filename: str

    file_type: str

    source_type: str

    total_records: int

    valid_records: int

    invalid_records: int

    duplicate_records: int

    status: str

    created_at: datetime

    class Config:
        from_attributes = True


class CallLogReportResponse(BaseModel):

    id: int

    business_id: int

    employee_id: int

    call_status: str

    notes: Optional[str] = None

    next_followup_date: Optional[datetime] = None

    created_at: datetime

    class Config:
        from_attributes = True