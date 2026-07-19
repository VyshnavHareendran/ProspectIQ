#Login Logic

from app.repositories.user_repository import UserRepository
from app.core.security import verify_password
from app.core.auth import create_access_token

from app.models.user import User
from app.core.security import hash_password

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
        
        if not user.is_active:
            raise ValueError("Employee account is inactive. Please contact the administrator.")

        payload = {
            "sub": user.email,
            "user_id": user.id,
            "role": user.role
        }

        token = create_access_token(payload)

        return {
            "access_token": token,
            "token_type": "bearer",
            "must_change_password": user.must_change_password,
        }
    
    def change_password(
    self,
    user: User,
    new_password: str
    ):

        password_hash = hash_password(new_password)

        self.user_repository.change_password(
            user,
            password_hash
        )

        return {
            "message": "Password changed successfully."
        }
    
    def register(
    self,
    full_name: str,
    email: str,
    password: str
    ):

        # Check duplicate email
        if self.user_repository.email_exists(email):
            raise ValueError(
                "Email already registered."
            )

        # Create employee
        user = User(

            full_name=full_name,

            email=email,

            password_hash=hash_password(password),

            role="EMPLOYEE"

        )

        return self.user_repository.create(user)
    
    def forgot_password(
    self,
    email: str,
    new_password: str
    ):

        user = self.user_repository.get_by_email(email)

        if not user:

            raise ValueError(
                "Employee not found."
            )

        user.password_hash = hash_password(
            new_password
        )

        self.user_repository.update(
            user
        )

        return {

            "message": "Password updated successfully."

        }
    
    def get_all_employees(self):

        return (
            self.user_repository
            .get_all_employees()
        )