#THESE VALIDATES API REQUESTS AND RESPONSES FOR AUTHENTICATION AND USER MANAGEMENT      
from pydantic import BaseModel, EmailStr


class LoginRequest(BaseModel):

    email: EmailStr

    password: str


class LoginResponse(BaseModel):

    access_token: str

    token_type: str


class CurrentUserResponse(BaseModel):
    id: int
    full_name: str
    email: EmailStr
    role: str

    class Config:
        from_attributes = True