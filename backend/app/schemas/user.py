from datetime import datetime

from pydantic import BaseModel, EmailStr


class UserResponse(BaseModel):

    id: int

    full_name: str

    email: EmailStr

    role: str

    created_at: datetime

    class Config:
        from_attributes = True