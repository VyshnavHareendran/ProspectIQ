from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db          
from app.dependencies.auth import get_current_user

from app.services.daily_queue_service import DailyQueueService

router = APIRouter(
    prefix="/employee",
    tags=["Employee Queue"]
)


@router.get("/todays-queue")
def get_todays_queue(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    service = DailyQueueService(db)

    queue = service.get_or_create_queue(
        current_user.id
    )

    response = []

    for item in queue:

        business = item.assignment.business

        response.append({

            "queue_id": item.id,

            "queue_order": item.queue_order,

            "assignment_id": item.assignment.id,

            "employee_id": item.assignment.employee_id,

            "business_id": business.id,

            "business_name": business.business_name,

            "phone_number": business.phone_number,

            "email": business.email,

            "website_url": business.website_url,

            "google_maps_link": business.google_maps_link,

            "category": business.category,

            "city": business.city,

            "lead_score": item.lead_score,

            "priority": item.priority,

            "queue_reason": item.queue_reason,

            "status": item.assignment.status,

            "remarks": item.assignment.remarks,

            "call_outcome": item.assignment.call_outcome,

            "queue_status": item.status,

            "queue_date": item.queue_date

        })

    return response

@router.put(
    "/todays-queue/{queue_id}/complete"
)
def complete_queue_item(
    queue_id: int,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user),
):
    service = DailyQueueService(db)

    return service.complete_queue_item(queue_id)