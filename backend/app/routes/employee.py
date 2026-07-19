from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
)
from sqlalchemy.orm import Session

from app.database import get_db
from app.dependencies.auth import get_current_employee

from app.models.user import User

from app.services.lead_assignment_service import LeadAssignmentService
from app.schemas.lead_assignment import EmployeeLeadUpdate
from app.repositories.lead_assignment_repository import LeadAssignmentRepository
from app.repositories.business_repository import BusinessRepository
from app.repositories.user_repository import UserRepository
from app.repositories.call_log_repository import CallLogRepository

router = APIRouter(
    prefix="/employee",
    tags=["Employee"]
)

def get_service(db: Session):

    return LeadAssignmentService(

        LeadAssignmentRepository(db),

        BusinessRepository(db),

        UserRepository(db),

        CallLogRepository(db),

    )

@router.get(
    "/my-leads",
    summary="Get My Leads"
)
def get_my_leads(
    current_user: User = Depends(get_current_employee),
    db: Session = Depends(get_db),
):
    service = get_service(db)

    return service.get_my_leads(current_user.id)



@router.put(
    "/my-leads/{assignment_id}",
    summary="Update My Lead",
)
def update_my_lead(
    assignment_id: int,
    request: EmployeeLeadUpdate,
    current_user: User = Depends(get_current_employee),
    db: Session = Depends(get_db),
):
    service = get_service(db)

    try:

        return service.update_employee_lead(
            assignment_id,
            request,
            current_user,
        )

    except ValueError as e:

        raise HTTPException(
            status_code=400,
            detail=str(e),
        )