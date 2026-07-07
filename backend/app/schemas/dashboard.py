from pydantic import BaseModel

from datetime import datetime


class DashboardSummaryResponse(BaseModel):

    total_businesses: int

    high_priority_leads: int

    today_calls: int

    new_businesses_this_week: int


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


from datetime import datetime

from pydantic import BaseModel


class RecentUploadResponse(BaseModel):

    id: int

    filename: str

    file_type: str

    source_type: str

    source_name: str | None = None

    total_records: int

    valid_records: int

    invalid_records: int

    duplicate_records: int

    status: str

    remarks: str | None = None

    created_at: datetime

    class Config:
        from_attributes = True


class RecentActivityResponse(BaseModel):

    type: str

    title: str

    description: str

    created_at: datetime