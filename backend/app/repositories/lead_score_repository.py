from sqlalchemy.orm import Session
from sqlalchemy import desc

from app.models.lead_score import LeadScore


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