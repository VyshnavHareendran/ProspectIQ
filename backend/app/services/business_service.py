from fastapi import HTTPException, status

from app.models.business import Business
from app.repositories.business_repository import BusinessRepository
from app.schemas.business import (
    BusinessCreate,
    BusinessUpdate
)


class BusinessService:

    def __init__(
        self,
        repository: BusinessRepository
    ):
        self.repository = repository

    def create_business(
        self,
        business_data: BusinessCreate,
        created_by: int
    ):

        
        # Convert Pydantic Schema -> ORM Model
        business = Business(
            business_name=business_data.business_name,
            category=business_data.category,
            description=business_data.description,
            phone_number=business_data.phone_number,
            whatsapp_number=business_data.whatsapp_number,
            email=business_data.email,
            website_url=str(business_data.website_url),
            address=business_data.address,
            city=business_data.city,
            google_maps_link=str(business_data.google_maps_link),
            google_rating=business_data.google_rating,
            review_count=business_data.review_count,
            business_hours=business_data.business_hours,
            remarks=business_data.remarks,
            data_source=business_data.data_source,
            created_by=created_by
        )

        
        # Duplicate Check
        duplicate = self.repository.find_duplicate(business)

        if duplicate:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Business already exists."
            )

        
        # Save Business

        return self.repository.create(business)
    
    def get_all_businesses(self):
            """
            Retrieve all active businesses.
            """
            return self.repository.get_all()

    def get_business_by_id(
        self,
        business_id: int
    ):
        """
        Retrieve a single business.
        """

        business = self.repository.get_by_id(
            business_id
        )

        if not business:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Business not found."
            )

        return business
    
    def update_business(
    self,
    business_id: int,
    business_data: BusinessUpdate,
    updated_by: int
    ):
        """
        Update an existing business.
        """

        # Find the business
        business = self.repository.get_by_id(business_id)

        if not business:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Business not found."
            )

        # Get only the fields provided by the client
        update_data = business_data.model_dump(
            exclude_unset=True
        )

        # Update each field dynamically
        for field, value in update_data.items():

            # Convert HttpUrl to string before saving
            if field in ["website_url", "google_maps_link"] and value is not None:
                value = str(value)

            setattr(
                business,
                field,
                value
            )

        # Audit fields
        business.updated_by = updated_by

        # Check for duplicates after update
        duplicate = self.repository.find_duplicate_for_update(
            business,
            business_id
        )

        if duplicate:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Another business with the same details already exists."
            )

        # Save changes
        return self.repository.update(business)
    

    def soft_delete(
    self,
    business: Business
    ):

        business.is_active = False

        self.db.commit()

        self.db.refresh(business)

        return business
    
    def delete_business(
    self,
    business_id: int
    ):
        """
        Soft delete a business.
        """

        business = self.repository.get_by_id(
            business_id
        )

        if not business:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Business not found."
            )

        return self.repository.soft_delete(
            business
        )