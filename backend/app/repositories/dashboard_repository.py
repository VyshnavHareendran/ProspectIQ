from sqlalchemy import func
from sqlalchemy.orm import Session

from app.models.business import Business
from app.models.upload_history import UploadHistory

from datetime import date, timedelta

from sqlalchemy import func

from app.models.call_log import CallLog

from app.models.lead_score import LeadScore

class DashboardRepository:

    def __init__(
        self,
        db: Session
    ):
        self.db = db


    def get_summary(self):

        today = date.today()

        week_start = today - timedelta(days=7)

        total_businesses = (
            self.db.query(func.count(Business.id))
            .filter(Business.is_active == True)
            .scalar()
        )

        high_priority_leads = (
            self.db.query(
                func.count(LeadScore.id)
            )
            .filter(
                LeadScore.priority == "HIGH"
            )
            .scalar()
        )

        today_calls = (
            self.db.query(func.count(CallLog.id))
            .filter(
                func.date(CallLog.created_at) == today
            )
            .scalar()
        )

        new_businesses_this_week = (
            self.db.query(func.count(Business.id))
            .filter(
                Business.created_at >= week_start,
                Business.is_active == True
            )
            .scalar()
        )

        return {

            "total_businesses": total_businesses,

            "high_priority_leads": high_priority_leads,

            "today_calls": today_calls,

            "new_businesses_this_week":
                new_businesses_this_week

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