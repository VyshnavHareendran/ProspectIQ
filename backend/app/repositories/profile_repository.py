from sqlalchemy.orm import Session

from app.models.user import User


class ProfileRepository:

    def __init__(self, db: Session):
        self.db = db

    def get_profile(self, user_id: int):

        return (
            self.db.query(User)
            .filter(User.id == user_id)
            .first()
        )