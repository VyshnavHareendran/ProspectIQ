from pydantic import BaseModel
from datetime import date


class DailyQueueItemResponse(BaseModel):

    queue_id: int

    queue_order: int

    business_id: int

    business_name: str

    phone_number: str | None

    category: str | None

    city: str | None

    lead_score: float

    priority: str

    queue_reason: str

    status: str

    queue_date: date

    class Config:
        from_attributes = True