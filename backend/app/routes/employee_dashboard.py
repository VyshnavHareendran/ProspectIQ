from fastapi import (
    APIRouter,
    Depends
)

from sqlalchemy.orm import Session

from app.database import get_db

from app.dependencies.auth import (
    get_verified_user
)

from app.models.user import User

from app.services.employee_dashboard_service import (
    EmployeeDashboardService
)

from app.schemas.employee_dashboard import (
    EmployeeDashboardResponse
)


router = APIRouter(
    prefix="/employee/dashboard",
    tags=["Employee Dashboard"]
)


def get_service(
    db: Session
):

    return EmployeeDashboardService(db)


@router.get(
    "",
    response_model=EmployeeDashboardResponse,
    summary="Employee Dashboard"
)
def get_dashboard(

    db: Session = Depends(get_db),

    current_user: User = Depends(get_verified_user)

):

    service = get_service(db)

    return service.get_dashboard(
        current_user.id
    )