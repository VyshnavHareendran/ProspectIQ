from datetime import datetime
from typing import Optional,List


from pydantic import BaseModel

class LeadScoreBusinessResponse(BaseModel):

    id: int

    business_name: str

    category: str

    city: str

    state: str | None = None

    phone_number: str

    google_rating: float

    class Config:
        from_attributes = True

class LeadScoreResponse(BaseModel):

    id: int

    lead_score: float

    priority: str

    score_reason: Optional[str] = None

    score_version: int

    business: LeadScoreBusinessResponse

    assigned_to: str | None = None

    class Config:
        from_attributes = True


class GenerateLeadScoreResponse(BaseModel):

    success: bool

    message: str

    business_id: int

    lead_score: float

    priority: str


class LeadScoreSummaryResponse(BaseModel):

    total_businesses: int

    high_priority: int

    medium_priority: int

    low_priority: int


class LeadScoreStatisticsResponse(BaseModel):

    total_leads: int

    high_priority: int

    medium_priority: int

    low_priority: int

    average_score: float

    highest_score: float

    lowest_score: float

class FeatureImportanceResponse(BaseModel):

    image_url: str

class GenerateAllLeadScoresResponse(BaseModel):

    generated: int

class LeadScoreListResponse(BaseModel):

    total: int

    page: int

    page_size: int

    total_pages: int

    items: list[LeadScoreResponse]

