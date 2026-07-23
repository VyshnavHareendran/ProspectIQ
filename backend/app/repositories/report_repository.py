from sqlalchemy.orm import Session

from app.models.business import Business
from app.models.upload_history import UploadHistory
from app.models.call_log import CallLog

from sqlalchemy import func
from app.models.user import User
from app.models.lead_score import LeadScore

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
    
    def get_summary(self):

        total_businesses = (
            self.db.query(Business)
            .filter(Business.is_active == True)
            .count()
        )

        calls_made = (
            self.db.query(CallLog)
            .count()
        )

        interested_leads = (
            self.db.query(CallLog)
            .filter(CallLog.call_outcome == "INTERESTED")
            .count()
        )

        follow_ups = (
            self.db.query(CallLog)
            .filter(CallLog.next_followup_date != None)
            .count()
        )

        average_lead_score = (
            self.db.query(func.avg(LeadScore.lead_score))
            .scalar()
        ) or 0

        active_employees = (
            self.db.query(User)
            .filter(User.is_active == True)
            .count()
        )

        return {
            "total_businesses": total_businesses,
            "calls_made": calls_made,
            "interested_leads": interested_leads,
            "follow_ups": follow_ups,
            "average_lead_score": round(float(average_lead_score), 2),
            "active_employees": active_employees,
        }
    
    def get_business_category_distribution(self):

        results = (
            self.db.query(
                Business.category,
                func.count(Business.id).label("count")
            )
            .filter(Business.is_active == True)
            .group_by(Business.category)
            .order_by(func.count(Business.id).desc())
            .all()
        )

        return [
            {
                "category": category,
                "count": count
            }
            for category, count in results
        ]

    def get_city_distribution(self):

        results = (
            self.db.query(
                Business.city,
                func.count(Business.id).label("count")
            )
            .filter(Business.is_active == True)
            .group_by(Business.city)
            .order_by(func.count(Business.id).desc())
            .all()
        )

        return [
            {
                "city": city,
                "count": count
            }
            for city, count in results
        ]

    def get_lead_score_chart(self):

        results = (
            self.db.query(
                Business.business_name,
                LeadScore.lead_score
            )
            .join(
                LeadScore,
                Business.id == LeadScore.business_id
            )
            .filter(
                Business.is_active == True
            )
            .order_by(
                LeadScore.lead_score.desc()
            )
            .all()
        )

        return [
            {
                "name": business_name,
                "leadScore": lead_score
            }
            for business_name, lead_score in results
        ]

    def get_calls_per_employee_chart(self):

        results = (
            self.db.query(
                User.full_name,
                func.count(CallLog.id).label("calls_made")
            )
            .join(
                CallLog,
                User.id == CallLog.employee_id
            )
            .group_by(
                User.id,
                User.full_name
            )
            .order_by(
                func.count(CallLog.id).desc()
            )
            .all()
        )

        return [
            {
                "employee": employee_name,
                "callsMade": calls_made
            }
            for employee_name, calls_made in results
        ]