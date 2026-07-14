#Database queries for user management

from sqlalchemy.orm import Session

from app.models.user import User


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