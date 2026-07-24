from sqlalchemy.orm import Session, joinedload
from sqlalchemy import desc

from app.models.lead_score import LeadScore

from sqlalchemy import func
from sqlalchemy import or_

from app.models.business import Business

from app.ml.predictor import Predictor

from app.models.lead_assignment import LeadAssignment

class LeadScoreRepository:

    def __init__(
        self,
        db: Session
    ):
        self.db = db

    def create(
        self,
        lead_score: LeadScore
    ):

        self.db.add(lead_score)

        self.db.commit()

        self.db.refresh(lead_score)

        return lead_score

    def update(
        self,
        lead_score: LeadScore
    ):

        self.db.commit()

        self.db.refresh(lead_score)

        return lead_score

    def get_by_business_id(
        self,
        business_id: int
    ):

        return (
            self.db.query(LeadScore)
            .options(
                joinedload(
                    LeadScore.business
                )
            )
            .filter(
                LeadScore.business_id == business_id
            )
            .first()
        )

    def get_high_priority(self):

        return (
            self.db.query(LeadScore)
            .options(
                joinedload(
                    LeadScore.business
                )
            )
            .filter(
                LeadScore.priority == "HIGH"
            )
            .order_by(
                desc(LeadScore.lead_score)
            )
            .all()
        )

    def get_high_priority_count(self):

        return (
            self.db.query(LeadScore)
            .filter(
                LeadScore.priority == "HIGH"
            )
            .count()
        )

    def delete(
        self,
        lead_score: LeadScore
    ):

        self.db.delete(
            lead_score
        )

        self.db.commit()

    def get_statistics(self):

        total = self.db.query(
            func.count(LeadScore.id)
        ).scalar()

        high = self.db.query(
            func.count(LeadScore.id)
        ).filter(
            LeadScore.priority == "HIGH"
        ).scalar()

        medium = self.db.query(
            func.count(LeadScore.id)
        ).filter(
            LeadScore.priority == "MEDIUM"
        ).scalar()

        low = self.db.query(
            func.count(LeadScore.id)
        ).filter(
            LeadScore.priority == "LOW"
        ).scalar()

        average = self.db.query(
            func.avg(LeadScore.lead_score)
        ).scalar() or 0

        highest = self.db.query(
            func.max(LeadScore.lead_score)
        ).scalar() or 0

        lowest = self.db.query(
            func.min(LeadScore.lead_score)
        ).scalar() or 0

        return {
            "total_leads": total,
            "high_priority": high,
            "medium_priority": medium,
            "low_priority": low,
            "average_score": round(average, 2),
            "highest_score": highest,
            "lowest_score": lowest
        }
    
    def get_daily_call_list(
    self,
    limit: int = 20
    ):

        lead_scores = (
            self.db.query(LeadScore)
            .options(
                joinedload(LeadScore.business),
                joinedload(LeadScore.business)
                    .joinedload(Business.lead_assignments)
                    .joinedload(LeadAssignment.employee)
            )
            .filter(
                LeadScore.priority.in_(["HIGH", "MEDIUM"])
            )
            .order_by(
                desc(LeadScore.lead_score)
            )
            .limit(limit)
            .all()
        )

        for lead in lead_scores:

            lead.assigned_to = "Unassigned"

            for assignment in lead.business.lead_assignments:

                if assignment.is_active:

                    lead.assigned_to = assignment.employee.full_name

                    break

        return lead_scores
    
    def get_feature_importance(self):

        return {
            "image_url": "/static/feature_importance_yelp.png"
        }
    

    def get_all(
        self,
        page: int = 1,
        page_size: int = 20,
        priority: str | None = None,
        search: str | None = None,
        city: str | None = None,
        category: str | None = None
        ):

            query = (
                self.db.query(LeadScore)
                .options(
                    joinedload(
                        LeadScore.business
                    )
                )
            )

            if priority:

                query = query.filter(
                    LeadScore.priority == priority
                )

            if search:

                query = query.filter(
                    or_(

                        LeadScore.business.has(
                            Business.business_name.ilike(f"%{search}%")
                        ),

                    )
                )

            if city:

                query = query.filter(
                    LeadScore.business.has(
                        city=city
                    )
                )

            if category:

                query = query.filter(
                    LeadScore.business.has(
                        category=category
                    )
                )

            total = query.count()

            results = (

                query

                .order_by(
                    desc(
                        LeadScore.lead_score
                    )
                )

                .offset(
                    (page - 1) * page_size
                )

                .limit(page_size)

                .all()

            )

            return {

                "total": total,

                "page": page,

                "page_size": page_size,

                "total_pages":
                (
                    total + page_size - 1
                ) // page_size,

                "items": results

            }
    
    def generate_score(
    self,
    business_id: int
    ):
        
        print("=" * 50)
        print(f"Generating score for Business ID: {business_id}")
        print("=" * 50)

        try:
            business = (
                self.db.query(Business)
                .filter(Business.id == business_id)
                .first()
            )

            if not business:
                return None

            prediction = Predictor.predict(
                business
            )

            lead_score = (
                self.db.query(LeadScore)
                .filter(
                    LeadScore.business_id == business_id
                )
                .first()
            )

            if lead_score:

                lead_score.lead_score = prediction["lead_score"]

                lead_score.priority = prediction["priority"]

                lead_score.score_reason = (
                    "Generated by XGBoost model"
                )

                lead_score.score_version = 1

            else:

                lead_score = LeadScore(

                    business_id=business.id,

                    lead_score=prediction["lead_score"],

                    priority=prediction["priority"],

                    score_reason="Generated by XGBoost model",

                    score_version=1

                )

                self.db.add(
                    lead_score
                )

            self.db.commit()

            self.db.refresh(
                lead_score
            )

            return lead_score
        except Exception:
            self.db.rollback()
            raise
    
    def generate_all_scores(
    self
    ):

        try:
            businesses = (
                self.db.query(Business)
                .all()
            )

            generated = 0

            for business in businesses:

                prediction = Predictor.predict(
                    business
                )

                lead_score = (
                    self.db.query(LeadScore)
                    .filter(
                        LeadScore.business_id == business.id
                    )
                    .first()
                )

                if lead_score:

                    lead_score.lead_score = prediction["lead_score"]

                    lead_score.priority = prediction["priority"]

                    lead_score.score_reason = (
                        "Generated by XGBoost model"
                    )

                    lead_score.score_version = 1

                else:

                    lead_score = LeadScore(

                        business_id=business.id,

                        lead_score=float(prediction["lead_score"]),

                        priority=prediction["priority"],

                        score_reason="Generated by XGBoost model",

                        score_version=1

                    )

                    self.db.add(
                        lead_score
                    )

                generated += 1

            self.db.commit()

            return {

                "generated": generated

            }
        except Exception:
            self.db.rollback()
            raise



    def get_average_score(
    self,
    employee_id: int
    ):
        average = (
            self.db.query(
                func.avg(LeadScore.lead_score)
            )
            .join(
                Business,
                Business.id == LeadScore.business_id
            )
            .join(
                LeadAssignment,
                LeadAssignment.business_id == Business.id
            )
            .filter(
                LeadAssignment.employee_id == employee_id,
                LeadAssignment.is_active == True
            )
            .scalar()
        )

        return round(average or 0, 2)
    

