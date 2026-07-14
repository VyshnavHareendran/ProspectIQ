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

from app.repositories.business_repository import (
    BusinessRepository
)

from app.repositories.user_repository import (
    UserRepository
)

from app.services.call_log_service import (
    CallLogService
)

router = APIRouter(
    prefix="/call-logs",
    tags=["Call Logs"]
)


def get_service(db: Session):

    return CallLogService(
        CallLogRepository(db),
        BusinessRepository(db),
        UserRepository(db)
    )


@router.post(
    "",
    response_model=CallLogResponse,
    summary="Create Call Log"
)
def create_call_log(
    request: CallLogCreate,
    db: Session = Depends(get_db)
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
    db: Session = Depends(get_db)
):

    service = get_service(db)

    return service.get_all()


@router.get(
    "/business/{business_id}",
    response_model=List[CallLogResponse],
    summary="Get Business Call Logs"
)
def get_business_calls(
    business_id: int,
    db: Session = Depends(get_db)
):

    service = get_service(db)

    return service.get_by_business(business_id)


@router.get(
    "/employee/{employee_id}",
    response_model=List[CallLogResponse],
    summary="Get Employee Call Logs"
)
def get_employee_calls(
    employee_id: int,
    db: Session = Depends(get_db)
):

    service = get_service(db)

    return service.get_by_employee(employee_id)


@router.get(
    "/followups/today",
    response_model=List[CallLogResponse],
    summary="Today's Follow-ups"
)
def get_today_followups(
    db: Session = Depends(get_db)
):

    service = get_service(db)

    return service.get_today_followups()


@router.get(
    "/followups/pending",
    response_model=List[CallLogResponse],
    summary="Pending Follow-ups"
)
def get_pending_followups(
    db: Session = Depends(get_db)
):

    service = get_service(db)

    return service.get_pending_followups()


@router.get(
    "/{call_log_id}",
    response_model=CallLogResponse,
    summary="Get Call Log"
)
def get_call_log(
    call_log_id: int,
    db: Session = Depends(get_db)
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
    db: Session = Depends(get_db)
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
    db: Session = Depends(get_db)
):

    service = get_service(db)

    try:

        return service.delete(call_log_id)

    except ValueError as e:

        raise HTTPException(
            status_code=404,
            detail=str(e)
        )
