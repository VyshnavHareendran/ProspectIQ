#Database queries for user management

from sqlalchemy.orm import Session

from app.models.user import User

from app.schemas.user_role import UserRole

class UserRepository:

    def __init__(self, db: Session):
        self.db = db

    def get_by_email(self, email: str):
        return (
            self.db.query(User)
            .filter(User.email == email)
            .first()
        )
    
    def create(
    self,
    user: User
    ):
        self.db.add(user)
        self.db.commit()
        self.db.refresh(user)

        return user
    
    def get_by_id(self, user_id: int):

        return (
            self.db.query(User)
            .filter(
                User.id == user_id,
                User.is_deleted == False
            )
            .first()
        )
    
    def change_status(
    self,
    user: User,
    is_active: bool
    ):

        user.is_active = is_active

        self.db.commit()

        self.db.refresh(user)

        return user
    
    def change_password(
    self,
    user: User,
    password_hash: str
    ):

        user.password_hash = password_hash

        user.must_change_password = False

        self.db.commit()

        self.db.refresh(user)

        return user

    
    def email_exists(
    self,
    email: str
    ):

        return (

            self.db.query(User)

            .filter(User.email == email)

            .first()

            is not None

        )
    
    def update(
    self,
    user: User
    ):

        self.db.commit()

        self.db.refresh(user)

        return user

    def get_all_employees(self):

        return (
            self.db.query(User)
            .filter(
                User.role == "EMPLOYEE",
                User.is_deleted == False,
            )
            .all()
        )
    
    def delete_employee(self, employee_id: int):

        employee = self.get_by_id(employee_id)

        if not employee:
            return None

        employee.is_deleted = True
        employee.is_active = False

        self.db.commit()
        self.db.refresh(employee)

        return employee

    def update_employee(
    self,
    employee: User,
    full_name: str,
    email: str,
    ):
        employee.full_name = full_name
        employee.email = email

        self.db.commit()
        self.db.refresh(employee)

        return employee

    def reset_employee_password(
    self,
    user: User,
    password_hash: str,
    ):
        user.password_hash = password_hash
        user.must_change_password = True

        self.db.commit()
        self.db.refresh(user)

        return user