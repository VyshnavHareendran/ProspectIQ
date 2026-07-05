from sqlalchemy.orm import Session

from app.models.business import Business

from sqlalchemy import or_, and_

from typing import Optional
from sqlalchemy import asc, desc

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

    def get_all(
    self,
    search=None,
    city=None,
    category=None,
    sort_by="created_at",
    sort_order="desc",
    page=1,
    page_size=20
    ):

        query = (
            self.db.query(Business)
            .filter(Business.is_active == True)
        )

        if search:

            query = query.filter(
                or_(
                    Business.business_name.ilike(f"%{search}%"),
                    Business.category.ilike(f"%{search}%"),
                    Business.city.ilike(f"%{search}%"),
                    Business.phone_number.ilike(f"%{search}%"),
                    Business.email.ilike(f"%{search}%")
                )
            )

        if city:

            query = query.filter(
                Business.city == city
            )

        if category:

            query = query.filter(
                Business.category == category
            )

        allowed_sort_fields = {
            "business_name": Business.business_name,
            "google_rating": Business.google_rating,
            "created_at": Business.created_at,
            "city": Business.city
        }

        sort_column = allowed_sort_fields.get(
            sort_by,
            Business.created_at
        )

        if sort_order.lower() == "asc":

            query = query.order_by(
                asc(sort_column)
            )

        else:

            query = query.order_by(
                desc(sort_column)
            )

        total = query.count()

        businesses = (
            query
            .offset((page - 1) * page_size)
            .limit(page_size)
            .all()
        )

        return {
            "total": total,
            "page": page,
            "page_size": page_size,
            "total_pages": (
                total + page_size - 1
            ) // page_size,
            "items": businesses
        }
    
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
    
    def find_duplicate_from_dict(
    self,
    row: dict
    ):
        """
        Check whether a business already exists
        using imported CSV data.
        """

        return (
            self.db.query(Business)
            .filter(
                or_(

                    Business.google_maps_link ==
                    row.get("google_maps_link"),

                    Business.website_url ==
                    row.get("website_url"),

                    Business.phone_number ==
                    row.get("phone_number"),

                    and_(

                        Business.business_name ==
                        row.get("business_name"),

                        Business.address ==
                        row.get("address")

                    )
                )
            )
            .first()
        )
    
    def bulk_create(
    self,
    businesses: list[Business]
    ):
        """
        Bulk insert businesses.
        """

        self.db.add_all(
            businesses
        )

        self.db.commit()

        for business in businesses:
            self.db.refresh(
                business
            )

        return businesses
    
    