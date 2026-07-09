from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class LeadScoreResponse(BaseModel):

    id: int

    business_id: int

    lead_score: float

    priority: str

    score_reason: Optional[str] = None

    score_version: int

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