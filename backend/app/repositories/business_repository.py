from sqlalchemy.orm import Session

from app.models.business import Business

from sqlalchemy import or_, and_

class BusinessRepository:

    def __init__(self, db: Session):
        self.db = db

    def create(self, business: Business):

        self.db.add(business)

        self.db.commit()

        self.db.refresh(business)

        return business

    def find_duplicate(self, business: Business):
        return (
            self.db.query(Business)
            .filter(
                or_(

                    Business.google_maps_link ==
                    business.google_maps_link,

                    Business.website_url ==
                    business.website_url,

                    Business.phone_number ==
                    business.phone_number,

                    and_(

                        Business.business_name ==
                        business.business_name,

                        Business.address ==
                        business.address

                    )
                )
            )
        .first()
        )

    def get_by_id(self, business_id: int):

        return (
            self.db.query(Business)
            .filter(
            Business.id == business_id,
                Business.is_active == True
            )
            .first()
        )

def get_all(self):

    return (
        self.db.query(Business)
        .filter(Business.is_active == True)
        .all()
    )