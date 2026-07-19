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
    
    def get_by_id(
    self,
    user_id: int
    ):

        return (
            self.db.query(User)
            .filter(
                User.id == user_id
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
            .order_by(User.full_name)
            .all()
        )