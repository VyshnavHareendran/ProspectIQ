from datetime import date

from sqlalchemy.orm import Session

from app.models.call_log import CallLog


class CallLogRepository:

    def __init__(
        self,
        db: Session
    ):
        self.db = db

    def create(
        self,
        call_log: CallLog
    ):

        self.db.add(call_log)

        self.db.commit()

        self.db.refresh(call_log)

        return call_log

    def get_by_id(
        self,
        call_log_id: int
    ):

        return (
            self.db.query(CallLog)
            .filter(
                CallLog.id == call_log_id
            )
            .first()
        )

    def get_by_business(
        self,
        business_id: int
    ):

        return (
            self.db.query(CallLog)
            .filter(
                CallLog.business_id == business_id
            )
            .order_by(
                CallLog.created_at.desc()
            )
            .all()
        )

    def get_by_employee(
        self,
        employee_id: int
    ):

        return (
            self.db.query(CallLog)
            .filter(
                CallLog.employee_id == employee_id
            )
            .order_by(
                CallLog.created_at.desc()
            )
            .all()
        )

    def get_today_followups(self):

        return (
            self.db.query(CallLog)
            .filter(
                CallLog.next_followup_date == date.today()
            )
            .order_by(
                CallLog.created_at.desc()
            )
            .all()
        )

    def get_pending_followups(self):

        return (
            self.db.query(CallLog)
            .filter(
                CallLog.next_followup_date >= date.today()
            )
            .order_by(
                CallLog.next_followup_date.asc()
            )
            .all()
        )

    def update(
        self,
        call_log: CallLog
    ):

        self.db.commit()

        self.db.refresh(call_log)

        return call_log

    def delete(
        self,
        call_log: CallLog
    ):

        self.db.delete(call_log)

        self.db.commit()