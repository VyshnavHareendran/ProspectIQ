from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db

from app.schemas.call_log import (
    CallLogCreate,
    CallLogUpdate,
    CallLogResponse
)

from app.repositories.call_log_repository import (
    CallLogRepository
)

from app.repositories.lead_assignment_repository import (
    LeadAssignmentRepository
)

from app.repositories.user_repository import (
    UserRepository
)

from app.services.call_log_service import (
    CallLogService
)

from app.dependencies.auth import (
    get_verified_user,
)
from app.models.user import User
from app.schemas.user_role import UserRole

router = APIRouter(
    prefix="/call-logs",
    tags=["Call Logs"]
)


def get_service(db: Session):

    return CallLogService(
        CallLogRepository(db),
        LeadAssignmentRepository(db),
        UserRepository(db)
    )


def get_employee_filter(current_user: User):

    if current_user.role == UserRole.ADMIN.value:
        return None

    return current_user.id


@router.post(
    "",
    response_model=CallLogResponse,
    summary="Create Call Log"
)
def create_call_log(
    request: CallLogCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_verified_user)
):

    service = get_service(db)

    try:

        return service.create(request)

    except ValueError as e:

        raise HTTPException(
            status_code=404,
            detail=str(e)
        )


@router.get(
    "",
    response_model=List[CallLogResponse],
    summary="Get Call Logs"
)
def get_call_logs(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_verified_user)
):

    service = get_service(db)

    return service.get_all()

@router.get(
    "/lead-assignment/{lead_assignment_id}",
    response_model=List[CallLogResponse],
    summary="Get Lead Assignment Call Logs"
)
def get_lead_assignment_calls(
    lead_assignment_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_verified_user)
):

    service = get_service(db)

    return service.get_by_lead_assignment(
        lead_assignment_id
    )


@router.get(
    "/employee/{employee_id}",
    response_model=List[CallLogResponse],
    summary="Get Employee Call Logs"
)
def get_employee_calls(
    employee_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_verified_user)
):

    service = get_service(db)

    return service.get_by_employee(employee_id)


@router.get(
    "/followups/today",
    response_model=List[CallLogResponse],
    summary="Today's Follow-ups"
)


def get_today_followups(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_verified_user)
):

    service = get_service(db)

    employee_id = get_employee_filter(current_user)

    return service.get_today_followups(employee_id)


@router.get(
    "/followups/pending",
    response_model=List[CallLogResponse],
    summary="Pending Follow-ups"
)
def get_pending_followups(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_verified_user)
):

    service = get_service(db)

    employee_id = get_employee_filter(current_user)

    return service.get_pending_followups(employee_id)


@router.get(
    "/followups/overdue",
    response_model=List[CallLogResponse],
    summary="Overdue Follow-ups"
)
def get_overdue_followups(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_verified_user)
):

    service = get_service(db)

    employee_id = get_employee_filter(current_user)

    return service.get_overdue_followups(employee_id)

@router.get(
    "/{call_log_id}",
    response_model=CallLogResponse,
    summary="Get Call Log"
)
def get_call_log(
    call_log_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_verified_user)
):

    service = get_service(db)

    try:

        return service.get_by_id(call_log_id)

    except ValueError as e:

        raise HTTPException(
            status_code=404,
            detail=str(e)
        )


@router.put(
    "/{call_log_id}",
    response_model=CallLogResponse,
    summary="Update Call Log"
)
def update_call_log(
    call_log_id: int,
    request: CallLogUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_verified_user)
):

    service = get_service(db)

    try:

        return service.update(
            call_log_id,
            request
        )

    except ValueError as e:

        raise HTTPException(
            status_code=404,
            detail=str(e)
        )


@router.delete(
    "/{call_log_id}",
    summary="Delete Call Log"
)
def delete_call_log(
    call_log_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_verified_user)
):

    service = get_service(db)

    try:

        return service.delete(call_log_id)

    except ValueError as e:

        raise HTTPException(
            status_code=404,
            detail=str(e)
        )
