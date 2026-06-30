from fastapi import HTTPException, status

from app.models.business import Business
from app.repositories.business_repository import BusinessRepository
from app.schemas.business import BusinessCreate


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