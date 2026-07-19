#It is a dependency that FastAPI injects into routes.

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt

from app.core.config import settings

from sqlalchemy.orm import Session

from app.database import get_db
from app.models.user import User

from app.schemas.user_role import UserRole

from app.core.account_validator import validate_account_status

oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="/auth/token"
)


def verify_token(
    token: str = Depends(oauth2_scheme)
):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = jwt.decode(
            token,
            settings.SECRET_KEY,
            algorithms=[settings.ALGORITHM]
        )

        return payload

    except JWTError:
        raise credentials_exception


def get_current_user(
    payload: dict = Depends(verify_token),
    db: Session = Depends(get_db)
):
    user_id = payload.get("user_id")

    if user_id is None:
        raise HTTPException(
            status_code=401,
            detail="Invalid authentication token"
        )

    user = (
        db.query(User)
        .filter(User.id == user_id)
        .first()
    )

    if not user:
        raise HTTPException(
            status_code=401,
            detail="User not found"
        )

    return user



def get_verified_user(
    current_user: User = Depends(get_current_user)
):
    validate_account_status(current_user)

    return current_user


def get_current_admin(
    current_user: User = Depends(get_verified_user)
):
    if current_user.role != UserRole.ADMIN.value:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You don't have permission to perform this action."
        )

    return current_user

def get_current_employee(
    current_user: User = Depends(get_verified_user)
):  
    if current_user.role != UserRole.EMPLOYEE.value:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Employee access only."
        )

    return current_user