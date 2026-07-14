from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.auth import (
    LoginRequest,
    LoginResponse,
    RegisterRequest,
    RegisterResponse,
    ForgotPasswordRequest,
    ForgotPasswordResponse,
    CurrentUserResponse,
)
from app.repositories.user_repository import UserRepository
from app.services.auth_service import AuthService

from app.dependencies.auth import (
    get_current_user,
    get_current_admin
)
from app.models.user import User

from fastapi.security import OAuth2PasswordRequestForm

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)

@router.post(
    "/register",
    response_model=RegisterResponse,
    status_code=201
)
def register(
    request: RegisterRequest,
    db: Session = Depends(get_db)
):

    user_repository = UserRepository(db)

    auth_service = AuthService(user_repository)

    try:

        return auth_service.register(
            full_name=request.full_name,
            email=request.email,
            password=request.password
        )

    except ValueError as e:

        raise HTTPException(
            status_code=400,
            detail=str(e)
        )

@router.post(
    "/forgot-password",
    response_model=ForgotPasswordResponse
)
def forgot_password(
    request: ForgotPasswordRequest,
    db: Session = Depends(get_db)
):

    user_repository = UserRepository(db)

    auth_service = AuthService(user_repository)

    try:

        return auth_service.forgot_password(
            email=request.email,
            new_password=request.new_password
        )

    except ValueError as e:

        raise HTTPException(
            status_code=404,
            detail=str(e)
        )

@router.post(
    "/login",
    response_model=LoginResponse
)
def login(
    request: LoginRequest,
    db: Session = Depends(get_db)
):

    user_repository = UserRepository(db)

    auth_service = AuthService(user_repository)

    result = auth_service.login(
        request.email,
        request.password
    )

    if not result:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    return result

@router.post(
    "/token",
    response_model=LoginResponse
)
def login_for_swagger(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    """
    OAuth2 login for Swagger UI.
    """

    user_repository = UserRepository(db)

    auth_service = AuthService(user_repository)

    result = auth_service.login(
        email=form_data.username,
        password=form_data.password
    )

    if not result:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    return result

@router.get(
    "/me",
    response_model=CurrentUserResponse
)
def get_me(
    current_user: User = Depends(get_current_user)
):
    return current_user

@router.get("/admin-test")
def admin_test(
    current_user: User = Depends(get_current_admin)
):
    return {
        "message": "Welcome Admin!",
        "logged_in_as": current_user.full_name,
        "role": current_user.role
    }