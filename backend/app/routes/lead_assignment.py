from typing import List

from fastapi import (
    APIRouter,
    Depends,
    HTTPException
)

from sqlalchemy.orm import Session

from app.database import get_db

from app.dependencies.auth import (
    get_current_admin
)

from app.models.user import User

from app.schemas.lead_assignment import (
    LeadAssignmentCreate,
    LeadAssignmentUpdate,
    LeadAssignmentResponse
)

from app.repositories.lead_assignment_repository import (
    LeadAssignmentRepository
)

from app.repositories.business_repository import (
    BusinessRepository
)

from app.repositories.user_repository import (
    UserRepository
)

from app.services.lead_assignment_service import (
    LeadAssignmentService
)

from app.repositories.call_log_repository import CallLogRepository

from app.schemas.lead_assignment import (
    BulkLeadAssignmentRequest,
)

router = APIRouter(
    prefix="/lead-assignments",
    tags=["Lead Assignments"]
)

def get_service(db: Session):

    return LeadAssignmentService(
    LeadAssignmentRepository(db),
    BusinessRepository(db),
    UserRepository(db),
    CallLogRepository(db),
)


@router.post(
    "",
    response_model=LeadAssignmentResponse,
    summary="Assign Lead"
)
def create_assignment(

    request: LeadAssignmentCreate,

    db: Session = Depends(get_db),

    current_user: User = Depends(get_current_admin)

):

    service = get_service(db)

    try:

        return service.create(
            request,
            current_user
        )

    except ValueError as e:
        print("SERVICE ERROR:", str(e))

        raise HTTPException(
            status_code=404,
            detail=str(e)
        )
    
@router.get(
    "/bulk/stats",
    summary="Bulk Assignment Statistics",
)
def get_bulk_stats(

    db: Session = Depends(get_db),

    current_user: User = Depends(get_current_admin),

):

    service = get_service(db)

    return service.get_bulk_assignment_stats()



@router.post(
    "/bulk",
    summary="Bulk Assign Leads",
)
def bulk_assign_leads(

    request: BulkLeadAssignmentRequest,

    db: Session = Depends(get_db),

    current_user: User = Depends(get_current_admin),

):

    service = get_service(db)

    try:

        return service.bulk_assign(
            request,
            current_user,
        )

    except ValueError as e:

        raise HTTPException(
            status_code=400,
            detail=str(e),
        )

@router.get(
    "",
    response_model=List[LeadAssignmentResponse],
    summary="Get All Assignments"
)
def get_all_assignments(

    db: Session = Depends(get_db),

    current_user: User = Depends(get_current_admin)

):

    service = get_service(db)

    return service.get_all()


@router.get(
    "/{assignment_id}",
    response_model=LeadAssignmentResponse,
    summary="Get Assignment"
)
def get_assignment(

    assignment_id: int,

    db: Session = Depends(get_db),

    current_user: User = Depends(get_current_admin)

):

    service = get_service(db)

    try:

        return service.get_by_id(
            assignment_id
        )

    except ValueError as e:

        raise HTTPException(
            status_code=404,
            detail=str(e)
        )
    

@router.put(
    "/{assignment_id}",
    response_model=LeadAssignmentResponse,
    summary="Reassign Lead"
)
def update_assignment(

    assignment_id: int,

    request: LeadAssignmentUpdate,

    db: Session = Depends(get_db),

    current_user: User = Depends(get_current_admin)

):

    service = get_service(db)

    try:

        return service.update(

            assignment_id,

            request,

            current_user

        )

    except ValueError as e:

        raise HTTPException(

            status_code=404,

            detail=str(e)

        )

@router.delete(
    "/{assignment_id}",
    summary="Deactivate Assignment"
)
def delete_assignment(

    assignment_id: int,

    db: Session = Depends(get_db),

    current_user: User = Depends(get_current_admin)

):

    service = get_service(db)

    try:

        service.delete(
            assignment_id
        )

        return {
            "message": "Assignment deactivated successfully."
        }

    except ValueError as e:

        raise HTTPException(
            status_code=404,
            detail=str(e)
        )