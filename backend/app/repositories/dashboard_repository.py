from sqlalchemy import func
from sqlalchemy.orm import Session

from app.models.business import Business
from app.models.upload_history import UploadHistory


class DashboardRepository:

    def __init__(
        self,
        db: Session
    ):
        self.db = db

    def get_summary(self):

        total_businesses = (
            self.db.query(
                func.count(Business.id)
            )
            .scalar()
        )

        active_businesses = (
            self.db.query(
                func.count(Business.id)
            )
            .filter(
                Business.is_active == True
            )
            .scalar()
        )

        inactive_businesses = (
            self.db.query(
                func.count(Business.id)
            )
            .filter(
                Business.is_active == False
            )
            .scalar()
        )

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

        return {

            "total_businesses": total_businesses,

            "active_businesses": active_businesses,

            "inactive_businesses": inactive_businesses,

            "total_imports": total_imports,

            "completed_imports": completed_imports

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