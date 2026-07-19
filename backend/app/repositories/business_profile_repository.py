from sqlalchemy.orm import Session

from app.models.business import Business
from app.models.lead_score import LeadScore
from app.models.lead_assignment import LeadAssignment
from app.models.call_log import CallLog
from app.models.user import User


class BusinessProfileRepository:

    def __init__(self, db: Session):
        self.db = db

    def get_business(self, business_id: int):
        return (
            self.db.query(Business)
            .filter(
                Business.id == business_id,
                Business.is_active == True
            )
            .first()
        )

    def get_latest_lead_score(self, business_id: int):
        return (
            self.db.query(LeadScore)
            .filter(
                LeadScore.business_id == business_id
            )
            .order_by(LeadScore.id.desc())
            .first()
        )

    def get_active_assignment(self, business_id: int):
        return (
            self.db.query(LeadAssignment)
            .filter(
                LeadAssignment.business_id == business_id,
                LeadAssignment.is_active == True
            )
            .order_by(
                LeadAssignment.assigned_at.desc()
            )
            .first()
        )

    def get_employee_name(self, employee_id: int):
        employee = (
            self.db.query(User)
            .filter(User.id == employee_id)
            .first()
        )

        return employee.full_name if employee else None

    def get_latest_call(self, assignment_id: int):
        return (
            self.db.query(CallLog)
            .filter(
                CallLog.lead_assignment_id == assignment_id
            )
            .order_by(
                CallLog.created_at.desc()
            )
            .first()
        )