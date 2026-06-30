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

        businesses = (
            self.db.query(Business)
            .filter(Business.is_active == True)
            .all()
        )

        return businesses
    
    def get_all_businesses(self):
        """
        Retrieve all active businesses.
        """

        return self.repository.get_all()
    
    def update(
    self,
    business: Business
    ):
        self.db.commit()
        self.db.refresh(business)
        return business


    def find_duplicate_for_update(
        self,
        business: Business,
        business_id: int
    ):
        return (
            self.db.query(Business)
            .filter(
                Business.id != business_id,
                (
                    (Business.phone_number == business.phone_number) |
                    (Business.google_maps_link == business.google_maps_link)
                )
            )
            .first()
        )
    
    def soft_delete(
    self,
    business: Business
    ):
        """
        Soft delete a business.
        """

        business.is_active = False

        self.db.commit()

        self.db.refresh(business)

        return business