from sqlalchemy.orm import Session

from app.models.business import Business
from app.models.upload_history import UploadHistory
from app.models.call_log import CallLog


class ReportRepository:

    def __init__(
        self,
        db: Session
    ):
        self.db = db

    def get_business_report(self):

        return (
            self.db.query(Business)
            .filter(
                Business.is_active == True
            )
            .order_by(
                Business.created_at.desc()
            )
            .all()
        )

    def get_upload_report(self):

        return (
            self.db.query(UploadHistory)
            .order_by(
                UploadHistory.created_at.desc()
            )
            .all()
        )

    def get_call_log_report(self):

        return (
            self.db.query(CallLog)
            .order_by(
                CallLog.created_at.desc()
            )
            .all()
        )