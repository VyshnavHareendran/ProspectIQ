from typing import List

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db

from app.repositories.report_repository import (
    ReportRepository
)

from app.services.report_service import (
    ReportService
)

from app.schemas.report import (
    BusinessReportResponse,
    UploadReportResponse,
    CallLogReportResponse
)

from fastapi.responses import StreamingResponse

from app.dependencies.auth import get_current_admin
from app.models.user import User


router = APIRouter(
    prefix="/reports",
    tags=["Reports"]
)


def get_service(
    db: Session
):

    repository = ReportRepository(db)

    return ReportService(repository)


@router.get(
    "/businesses",
    response_model=List[BusinessReportResponse]
)
def get_business_report(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin)
):

    return get_service(db).get_business_report()


@router.get(
    "/uploads",
    response_model=List[UploadReportResponse]
)
def get_upload_report(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin)
):

    return get_service(db).get_upload_report()


@router.get(
    "/call-logs",
    response_model=List[CallLogReportResponse]
)
def get_call_log_report(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin)
):

    return get_service(db).get_call_log_report()

@router.get(
    "/export/businesses/csv"
)
def export_business_csv(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin)
):

    csv_file = (

        get_service(db)

        .export_business_csv()

    )

    return StreamingResponse(

        csv_file,

        media_type="text/csv",

        headers={

            "Content-Disposition":

            "attachment; filename=business_report.csv"

        }

    )

@router.get(
    "/export/uploads/csv"
)
def export_upload_csv(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin)
):

    csv_file = (
        get_service(db)
        .export_upload_csv()
    )

    return StreamingResponse(

        csv_file,

        media_type="text/csv",

        headers={
            "Content-Disposition":
            "attachment; filename=upload_report.csv"
        }

    )

@router.get(
    "/export/call-logs/csv"
)
def export_call_log_csv(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin)
):

    csv_file = (
        get_service(db)
        .export_call_log_csv()
    )

    return StreamingResponse(

        csv_file,

        media_type="text/csv",

        headers={
            "Content-Disposition":
            "attachment; filename=call_log_report.csv"
        }

    )

@router.get(
    "/export/businesses/excel"
)
def export_business_excel(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin)
):

    excel = (
        get_service(db)
        .export_business_excel()
    )

    return StreamingResponse(

        excel,

        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",

        headers={

            "Content-Disposition":

            "attachment; filename=business_report.xlsx"

        }

    )

@router.get(
    "/export/uploads/excel"
)
def export_upload_excel(
    db: Session = Depends(get_db)
):

    excel = (
        get_service(db)
        .export_upload_excel()
    )

    return StreamingResponse(

        excel,

        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",

        headers={

            "Content-Disposition":

            "attachment; filename=upload_report.xlsx"

        }

    )

@router.get(
    "/export/call-logs/excel"
)
def export_call_log_excel(
    db: Session = Depends(get_db)
):

    excel = (
        get_service(db)
        .export_call_log_excel()
    )

    return StreamingResponse(

        excel,

        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",

        headers={

            "Content-Disposition":

            "attachment; filename=call_log_report.xlsx"

        }

    )