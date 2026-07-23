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
        conditions = []

        if self._has_value(business.google_maps_link):
            conditions.append(
                Business.google_maps_link == business.google_maps_link
            )

        if self._has_value(business.website_url):
            conditions.append(
                Business.website_url == business.website_url
            )

        if self._has_value(business.phone_number):
            conditions.append(
                Business.phone_number == business.phone_number
            )

        if (
            self._has_value(business.business_name)
            and self._has_value(business.address)
        ):
            conditions.append(
                and_(
                    Business.business_name == business.business_name,
                    Business.address == business.address
                )
            )

        if not conditions:
            return None

        return (
            self.db.query(Business)
            .filter(
                or_(*conditions)
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
                    Business.state.ilike(f"%{search}%"),
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
    
    def get_unassigned_businesses(
    self,
    assigned_business_ids: list[int],
    limit: int,
    ):
        query = (
            self.db.query(Business)
            .filter(
                Business.is_active == True
            )
        )

        if assigned_business_ids:
            query = query.filter(
                Business.id.notin_(assigned_business_ids)
            )

        return (
            query
            .order_by(Business.id)
            .limit(limit)
            .all()
        )

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

        conditions = []

        google_maps_link = (
            str(row.get("google_maps_link")).strip()
            if self._has_value(row.get("google_maps_link"))
            else None
        )

        website_url = (
            str(row.get("website_url")).strip()
            if self._has_value(row.get("website_url"))
            else None
        )

        phone_number = (
            str(row.get("phone_number")).strip()
            if self._has_value(row.get("phone_number"))
            else None
        )

        business_name = (
            str(row.get("business_name")).strip()
            if self._has_value(row.get("business_name"))
            else None
        )

        address = (
            str(row.get("address")).strip()
            if self._has_value(row.get("address"))
            else None
        )

        if google_maps_link:
            conditions.append(
                Business.google_maps_link == google_maps_link
            )

        if website_url:
            conditions.append(
                Business.website_url == website_url
            )

        if phone_number:
            conditions.append(
                Business.phone_number == phone_number
            )

        if business_name and address:
            conditions.append(
                and_(
                    Business.business_name == business_name,
                    Business.address == address
                )
            )

        if not conditions:
            return None

        return (
            self.db.query(Business)
            .filter(or_(*conditions))
            .first()
        )
    
    def bulk_create(self, businesses: list[Business]):
        """
        Bulk insert businesses.
        Uses individual flushes to avoid SQLAlchemy bulk insert
        parameter binding issues with PostgreSQL.
        """

        try:
            for business in businesses:
                self.db.add(business)
                self.db.flush()

            self.db.commit()

            for business in businesses:
                self.db.refresh(business)

            return businesses

        except Exception:
            self.db.rollback()
            raise

    @staticmethod
    def _has_value(value):
        return (
            value is not None
            and str(value).strip().lower() not in ["", "nan", "none", "null"]
        )
    
    def get_active_count(self):

        return (
            self.db.query(Business)
            .filter(
                Business.is_active == True
            )
            .count()
        )
    
    
