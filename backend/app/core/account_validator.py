from fastapi import HTTPException, status

from app.models.user import User


def validate_account_status(user: User):

    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail={
                "code": "ACCOUNT_INACTIVE",
                "message": "Your account is inactive. Please contact the administrator."
            }
        )

    if user.must_change_password:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail={
                "code": "PASSWORD_CHANGE_REQUIRED",
                "message": "Password change required before accessing the application."
            }
        )