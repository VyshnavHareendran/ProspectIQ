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
    CallLogReportResponse,
    ReportSummaryResponse,
    BusinessCategoryDistributionResponse,
    CityDistributionResponse,
    LeadScoreChartResponse,
    CallsPerEmployeeChartResponse
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
    "/summary",
    response_model=ReportSummaryResponse
)
def get_report_summary(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin)
):

    return get_service(db).get_summary()

@router.get(
    "/city-distribution",
    response_model=List[CityDistributionResponse]
)
def get_city_distribution(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin)
):

    return (
        get_service(db)
        .get_city_distribution()
    )

@router.get(
    "/category-distribution",
    response_model=List[BusinessCategoryDistributionResponse]
)
def get_business_category_distribution(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin)
):

    return (
        get_service(db)
        .get_business_category_distribution()
    )

@router.get(
    "/lead-score-chart",
    response_model=List[LeadScoreChartResponse]
)
def get_lead_score_chart(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin)
):

    return (
        get_service(db)
        .get_lead_score_chart()
    )

@router.get(
    "/calls-per-employee",
    response_model=List[CallsPerEmployeeChartResponse]
)
def get_calls_per_employee_chart(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin)
):

    return (
        get_service(db)
        .get_calls_per_employee_chart()
    )



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

@router.get(
    "/export/pdf"
)
def export_pdf(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin)
):

    pdf = (
        get_service(db)
        .export_professional_pdf()
    )


    return StreamingResponse(

        pdf,

        media_type="application/pdf",

        headers={
            "Content-Disposition":
            "attachment; filename=ProspectIQ_Report.pdf"
        }

    )