from datetime import datetime

from pydantic import BaseModel


class ProfileResponse(BaseModel):

    id: int

    full_name: str

    email: str

    role: str

    is_active: bool

    created_at: datetime

    class Config:
        from_attributes = True