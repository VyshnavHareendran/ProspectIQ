#THESE VALIDATES API REQUESTS AND RESPONSES FOR AUTHENTICATION AND USER MANAGEMENT      
from pydantic import BaseModel, EmailStr
from app.schemas.user_role import UserRole

class LoginRequest(BaseModel):

    email: EmailStr

    password: str


class LoginResponse(BaseModel):

    access_token: str

    token_type: str

    must_change_password: bool


class RegisterRequest(BaseModel):

    full_name: str

    email: EmailStr

    password: str


class RegisterResponse(BaseModel):

    id: int

    full_name: str

    email: EmailStr

    role: str

    class Config:

        from_attributes = True

class ForgotPasswordRequest(BaseModel):

    email: EmailStr

    new_password: str


class ForgotPasswordResponse(BaseModel):

    message: str


class ChangePasswordRequest(BaseModel):

    new_password: str


class ChangePasswordResponse(BaseModel):

    message: str


class CurrentUserResponse(BaseModel):
    id: int
    full_name: str
    email: EmailStr
    role: str

    is_active: bool
    must_change_password: bool

    class Config:
        from_attributes = True

class EmployeeResponse(BaseModel):

    id: int

    full_name: str

    email: EmailStr

    role: str

    is_active: bool

    must_change_password: bool

    class Config:

        from_attributes = True

class CreateEmployeeRequest(BaseModel):

    full_name: str

    email: EmailStr

    role: UserRole


class CreateEmployeeResponse(BaseModel):

    id: int

    full_name: str

    email: EmailStr

    role: str

    is_active: bool

    must_change_password: bool

    temporary_password: str

    class Config:
        from_attributes = True

class ChangeEmployeeStatusRequest(BaseModel):

    is_active: bool

class ChangeEmployeeStatusResponse(BaseModel):

    id: int

    full_name: str

    email: EmailStr

    role: str

    is_active: bool

    class Config:

        from_attributes = True