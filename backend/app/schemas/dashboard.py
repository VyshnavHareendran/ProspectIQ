from pydantic import BaseModel

from datetime import datetime


class DashboardSummaryResponse(BaseModel):

    total_businesses: int
    active_businesses: int
    inactive_businesses: int
    total_imports: int
    completed_imports: int


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