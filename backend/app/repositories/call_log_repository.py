from datetime import date

from sqlalchemy.orm import Session
from sqlalchemy.orm import joinedload

from app.models.call_log import CallLog
from app.models.lead_assignment import LeadAssignment

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

    def get_all(self):
        return (
            self.db.query(CallLog)
            .options(
                joinedload(CallLog.employee),
                joinedload(CallLog.lead_assignment).joinedload(
                    LeadAssignment.business
                )
            )
            .order_by(CallLog.created_at.desc())
            .all()
        )

    def get_by_lead_assignment(
    self,
    lead_assignment_id: int
    ):
        return (
            self.db.query(CallLog)
            .filter(
                CallLog.lead_assignment_id == lead_assignment_id
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
            .options(
                joinedload(CallLog.employee),
                joinedload(CallLog.lead_assignment)
                    .joinedload(LeadAssignment.business)
            )
            .filter(
                CallLog.employee_id == employee_id
            )
            .order_by(CallLog.created_at.desc())
            .all()
        )

    def get_today_followups(
    self,
    employee_id: int | None = None
    ):

        query = (
            self.db.query(CallLog)
            .options(
                joinedload(CallLog.employee),
                joinedload(CallLog.lead_assignment)
                    .joinedload(LeadAssignment.business)
            )
            .filter(
                CallLog.next_followup_date == date.today()
            )
        )

        if employee_id is not None:
            query = query.filter(
                CallLog.employee_id == employee_id
            )

        return (
            query.order_by(
                CallLog.next_followup_date.asc(),
                CallLog.created_at.desc()
            )
            .all()
        )

    def get_pending_followups(
    self,
    employee_id: int | None = None
    ):

        query = (
            self.db.query(CallLog)
            .options(
                joinedload(CallLog.employee),
                joinedload(CallLog.lead_assignment)
                    .joinedload(LeadAssignment.business)
            )
            .filter(
                CallLog.next_followup_date >= date.today()
            )
        )

        if employee_id is not None:
            query = query.filter(
                CallLog.employee_id == employee_id
            )

        return (
            query.order_by(
                CallLog.next_followup_date.asc(),
                CallLog.created_at.desc()
            )
            .all()
        )
    
    def get_overdue_followups(
    self,
    employee_id: int | None = None
    ):

        query = (
            self.db.query(CallLog)
            .options(
                joinedload(CallLog.employee),
                joinedload(CallLog.lead_assignment)
                    .joinedload(LeadAssignment.business)
            )
            .filter(
                CallLog.next_followup_date < date.today()
            )
        )

        if employee_id is not None:
            query = query.filter(
                CallLog.employee_id == employee_id
            )

        return (
            query.order_by(
                CallLog.next_followup_date.asc(),
                CallLog.created_at.desc()
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
