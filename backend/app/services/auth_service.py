#Login Logic

from app.repositories.user_repository import UserRepository
from app.core.security import verify_password
from app.core.auth import create_access_token


class AuthService:

    def __init__(self, user_repository: UserRepository):
        self.user_repository = user_repository

    def login(self, email: str, password: str):

        user = self.user_repository.get_by_email(email)

        if not user:
            return None

        if not verify_password(
            password,
            user.password_hash
        ):
            return None

        payload = {
            "sub": user.email,
            "user_id": user.id,
            "role": user.role
        }

        token = create_access_token(payload)

        return {
            "access_token": token,
            "token_type": "bearer"
        }