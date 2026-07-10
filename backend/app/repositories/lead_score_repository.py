from sqlalchemy.orm import Session
from sqlalchemy import desc

from app.models.lead_score import LeadScore

from sqlalchemy import func

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
            .filter(
                LeadScore.business_id == business_id
            )
            .first()
        )

    def get_all(self):

        return (
            self.db.query(LeadScore)
            .order_by(
                desc(LeadScore.lead_score)
            )
            .all()
        )

    def get_high_priority(self):

        return (
            self.db.query(LeadScore)
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

        return (
            self.db.query(LeadScore)
            .filter(
                LeadScore.priority == "HIGH"
            )
            .order_by(
                desc(LeadScore.lead_score)
            )
            .limit(limit)
            .all()
        )