from sqlalchemy.orm import Session

from app.models.upload_history import UploadHistory


class UploadHistoryRepository:

    def __init__(self, db: Session):
        self.db = db

    def create(
        self,
        upload: UploadHistory
    ):
        self.db.add(upload)
        self.db.commit()
        self.db.refresh(upload)
        return upload

    def update(
        self,
        upload: UploadHistory
    ):
        self.db.commit()
        self.db.refresh(upload)
        return upload

    def get_all(self):
        return (
            self.db.query(UploadHistory)
            .order_by(
                UploadHistory.created_at.desc()
            )
            .all()
        )

    def get_by_id(
        self,
        upload_id: int
    ):
        return (
            self.db.query(UploadHistory)
            .filter(
                UploadHistory.id == upload_id
            )
            .first()
        )