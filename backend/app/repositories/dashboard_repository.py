from sqlalchemy import func
from sqlalchemy.orm import Session

from app.models.business import Business
from app.models.upload_history import UploadHistory

from datetime import date, timedelta

from sqlalchemy import func

from app.models.call_log import CallLog

from app.models.lead_score import LeadScore

from app.models.user import User
from app.models.lead_assignment import LeadAssignment

from sqlalchemy.orm import joinedload

class DashboardRepository:

    def __init__(
        self,
        db: Session
    ):
        self.db = db


    def get_summary(self):

        today = date.today()

        total_businesses = (
            self.db.query(func.count(Business.id))
            .filter(Business.is_active == True)
            .scalar()
        )

        total_employees = (
            self.db.query(func.count(User.id))
            .filter(User.role == "EMPLOYEE")
            .scalar()
        )

        total_assignments = (
            self.db.query(func.count(LeadAssignment.id))
            .filter(LeadAssignment.is_active == True)
            .scalar()
        )

        total_calls = (
            self.db.query(func.count(CallLog.id))
            .scalar()
        )

        today_followups = (
            self.db.query(func.count(CallLog.id))
            .filter(
                CallLog.next_followup_date == today
            )
            .scalar()
        )

        average_lead_score = (
            self.db.query(func.avg(LeadScore.lead_score))
            .scalar()
            or 0
        )

        return {
            "total_businesses": total_businesses,
            "total_employees": total_employees,
            "total_assignments": total_assignments,
            "total_calls": total_calls,
            "today_followups": today_followups,
            "average_lead_score": round(average_lead_score, 1),
        }
    

    def get_city_distribution(self):

        results = (
            self.db.query(

                Business.city,

                func.count(Business.id).label("count")

            )
            .filter(
                Business.is_active == True
            )
            .group_by(
                Business.city
            )
            .order_by(
                func.count(Business.id).desc()
            )
            .all()
        )

        return [

            {
                "city": city,
                "count": count
            }

            for city, count in results

        ]
    
    def get_category_distribution(self):

        results = (
            self.db.query(

                Business.category,

                func.count(Business.id).label("count")

            )
            .filter(
                Business.is_active == True
            )
            .group_by(
                Business.category
            )
            .order_by(
                func.count(Business.id).desc()
            )
            .all()
        )

        return [

            {
                "category": category,
                "count": count
            }

            for category, count in results

        ]
    
    def get_recent_businesses(
    self,
    limit: int = 10
    ):

        return (
            self.db.query(Business)
            .filter(
                Business.is_active == True
            )
            .order_by(
                Business.created_at.desc()
            )
            .limit(limit)
            .all()
        )
    
    def get_import_summary(self):

        total_imports = (
            self.db.query(
                func.count(UploadHistory.id)
            )
            .scalar()
        )

        completed_imports = (
            self.db.query(
                func.count(UploadHistory.id)
            )
            .filter(
                UploadHistory.status == "COMPLETED"
            )
            .scalar()
        )

        failed_imports = (
            self.db.query(
                func.count(UploadHistory.id)
            )
            .filter(
                UploadHistory.status == "FAILED"
            )
            .scalar()
        )

        processing_imports = (
            self.db.query(
                func.count(UploadHistory.id)
            )
            .filter(
                UploadHistory.status == "PROCESSING"
            )
            .scalar()
        )

        total_records_imported = (
            self.db.query(
                func.sum(
                    UploadHistory.valid_records
                )
            )
            .scalar()
            or 0
        )

        return {

            "total_imports": total_imports,

            "completed_imports": completed_imports,

            "failed_imports": failed_imports,

            "processing_imports": processing_imports,

            "total_records_imported": total_records_imported

        }
    
    def get_top_rated_businesses(
    self,
    limit: int = 5
    ):

        return (
            self.db.query(Business)
            .filter(
                Business.is_active == True,
                Business.google_rating != None
            )
            .order_by(
                Business.google_rating.desc(),
                Business.review_count.desc()
            )
            .limit(limit)
            .all()
        )
    
    def get_recent_uploads(
    self,
    limit: int = 5
    ):

        return (
            self.db.query(UploadHistory)
            .order_by(
                UploadHistory.created_at.desc()
            )
            .limit(limit)
            .all()
        )
    
    def get_recent_activity(
    self,
    limit: int = 10
    ):

        activities = []

        # Recent Businesses
        businesses = (
            self.db.query(Business)
            .order_by(Business.created_at.desc())
            .limit(limit)
            .all()
        )

        for business in businesses:

            activities.append({

                "type": "BUSINESS",

                "title": "Business Added",

                "description": business.business_name,

                "created_at": business.created_at

            })

        # Recent Uploads
        uploads = (
            self.db.query(UploadHistory)
            .order_by(UploadHistory.created_at.desc())
            .limit(limit)
            .all()
        )

        for upload in uploads:

            activities.append({

                "type": "UPLOAD",

                "title": "CSV Imported",

                "description": upload.filename,

                "created_at": upload.created_at

            })

        # Recent Calls
        calls = (
            self.db.query(CallLog)
            .order_by(CallLog.created_at.desc())
            .limit(limit)
            .all()
        )

        for call in calls:

            activities.append({

                "type": "CALL",

                "title": f"Call {call.call_status}",

                "description": f"Business ID {call.business_id}",

                "created_at": call.created_at

            })

        activities.sort(
            key=lambda x: x["created_at"],
            reverse=True
        )

        return activities[:limit]
    
    def get_upcoming_followups(
    self,
    limit: int = 5
    ):

        followups = (
            self.db.query(CallLog)
            .options(
                joinedload(CallLog.employee),
                joinedload(CallLog.lead_assignment)
                    .joinedload(LeadAssignment.business)
            )
            .filter(
                CallLog.next_followup_date >= date.today()
            )
            .order_by(
                CallLog.next_followup_date.asc(),
                CallLog.created_at.desc()
            )
            .limit(limit)
            .all()
        )

        return [
            {
                "id": followup.id,
                "business_name": followup.lead_assignment.business.business_name,
                "employee_name": followup.employee.full_name,
                "next_followup_date": followup.next_followup_date,
                "call_outcome": followup.call_outcome,
            }
            for followup in followups
        ]
    
    def get_lead_assignment_status(self):

        results = (
            self.db.query(
                LeadAssignment.status,
                func.count(LeadAssignment.id).label("count")
            )
            .filter(
                LeadAssignment.is_active == True
            )
            .group_by(
                LeadAssignment.status
            )
            .all()
        )

        return [
            {
                "status": status,
                "count": count
            }
            for status, count in results
        ]
    
    def get_recent_calls(
    self,
    limit: int = 5
    ):

        calls = (
            self.db.query(CallLog)
            .options(
                joinedload(CallLog.employee),
                joinedload(CallLog.lead_assignment)
                    .joinedload(LeadAssignment.business)
            )
            .order_by(
                CallLog.created_at.desc()
            )
            .limit(limit)
            .all()
        )

        return [
            {
                "id": call.id,
                "business_name": call.lead_assignment.business.business_name,
                "employee_name": call.employee.full_name,
                "call_outcome": call.call_outcome,
                "created_at": call.created_at,
            }
            for call in calls
        ]
    
    def get_employee_performance(self):

        employees = (
            self.db.query(User)
            .filter(User.role == "EMPLOYEE")
            .all()
        )

        performance = []

        for employee in employees:

            assigned_leads = (
                self.db.query(func.count(LeadAssignment.id))
                .filter(
                    LeadAssignment.employee_id == employee.id,
                    LeadAssignment.is_active == True
                )
                .scalar()
            )

            calls_made = (
                self.db.query(func.count(CallLog.id))
                .filter(
                    CallLog.employee_id == employee.id
                )
                .scalar()
            )

            pending_followups = (
                self.db.query(func.count(CallLog.id))
                .filter(
                    CallLog.employee_id == employee.id,
                    CallLog.next_followup_date >= date.today()
                )
                .scalar()
            )

            performance.append({
                "employee_name": employee.full_name,
                "assigned_leads": assigned_leads,
                "calls_made": calls_made,
                "pending_followups": pending_followups,
            })

        return performance