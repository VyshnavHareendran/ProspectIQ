from app.repositories.user_repository import UserRepository
from app.models.user import User
from app.core.security import hash_password
from app.core.password_generator import generate_temporary_password
from app.schemas.user_role import UserRole

class EmployeeManagementService:

    def __init__(self, user_repository: UserRepository):
        self.user_repository = user_repository

    def get_all_employees(self):
        return self.user_repository.get_all_employees()
    
    def create_employee(
    self,
    full_name: str,
    email: str,
    role: UserRole
    ):

        # Check duplicate email
        if self.user_repository.email_exists(email):
            raise ValueError("Email already exists.")

        # Generate temporary password
        temporary_password = generate_temporary_password()

        # Create employee
        user = User(
            full_name=full_name,
            email=email,
            password_hash=hash_password(temporary_password),
            role=role.value,
            is_active=True,
            must_change_password=True,
        )

        user = self.user_repository.create(user)

        return {
            "id": user.id,
            "full_name": user.full_name,
            "email": user.email,
            "role": user.role,
            "is_active": user.is_active,
            "must_change_password": user.must_change_password,
            "temporary_password": temporary_password,
        }
    
    def change_status(
    self,
    employee_id: int,
    is_active: bool
    ):

        user = self.user_repository.get_by_id(employee_id)

        if not user:
            raise ValueError("Employee not found.")

        user = self.user_repository.change_status(
            user,
            is_active
        )

        return user
    
    def delete_employee(self, employee_id: int):

        employee = self.user_repository.delete_employee(employee_id)

        if not employee:
            raise ValueError("Employee not found.")

        return {
            "message": "Employee deleted successfully."
        }