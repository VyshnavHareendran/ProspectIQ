from datetime import datetime
from typing import Optional

from pydantic import BaseModel, EmailStr, HttpUrl, Field

from typing import List

class BusinessCreate(BaseModel):

    business_name: str

    category: str

    description: Optional[str] = None

    phone_number: str

    whatsapp_number: Optional[str] = None

    email: EmailStr

    website_url: HttpUrl

    address: str

    city: str

    google_maps_link: HttpUrl

    google_rating: float = Field(ge=0, le=5)

    review_count: int = Field(ge=0)

    business_hours: Optional[str] = None

    remarks: Optional[str] = None

    data_source: str

class BusinessResponse(BusinessCreate):

    id: int

    status: str

    is_active: bool

    created_at: datetime

    updated_at: datetime

    created_by: int

    updated_by: Optional[int]

    last_contacted_at: Optional[datetime]

    class Config:
        from_attributes = True


class BusinessListResponse(BaseModel):

    total: int

    page: int

    page_size: int

    total_pages: int

    items: List[BusinessResponse]


class BusinessUpdate(BaseModel):

    business_name: Optional[str] = None

    category: Optional[str] = None

    description: Optional[str] = None

    phone_number: Optional[str] = None

    whatsapp_number: Optional[str] = None

    email: Optional[EmailStr] = None

    website_url: Optional[HttpUrl] = None

    address: Optional[str] = None

    city: Optional[str] = None

    google_maps_link: Optional[HttpUrl] = None

    google_rating: Optional[float] = Field(default=None, ge=0, le=5)

    review_count: Optional[int] = Field(default=None, ge=0)

    business_hours: Optional[str] = None

    remarks: Optional[str] = None

    status: Optional[str] = None