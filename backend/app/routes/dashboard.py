from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db

from app.services.dashboard_service import DashboardService
from app.repositories.dashboard_repository import DashboardRepository

from app.schemas.dashboard import DashboardSummaryResponse
from typing import List

from app.schemas.dashboard import (
    DashboardSummaryResponse,
    CityDistributionResponse,
    CategoryDistributionResponse,
    RecentBusinessResponse,
    ImportSummaryResponse
)

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


@router.get(
    "/summary",
    response_model=DashboardSummaryResponse
)
def get_dashboard_summary(
    db: Session = Depends(get_db)
):

    repository = DashboardRepository(db)

    service = DashboardService(repository)

    return service.get_summary()

@router.get(
    "/city-distribution",
    response_model=List[CityDistributionResponse]
)
def get_city_distribution(
    db: Session = Depends(get_db)
):

    repository = DashboardRepository(db)

    service = DashboardService(repository)

    return service.get_city_distribution()

@router.get(
    "/category-distribution",
    response_model=list[CategoryDistributionResponse]
)
def get_category_distribution(
    db: Session = Depends(get_db)
):

    repository = DashboardRepository(db)

    service = DashboardService(repository)

    return service.get_category_distribution()

@router.get(
    "/recent-businesses",
    response_model=List[RecentBusinessResponse]
)
def get_recent_businesses(
    db: Session = Depends(get_db)
):

    repository = DashboardRepository(db)

    service = DashboardService(repository)

    return service.get_recent_businesses()

@router.get(
    "/import-summary",
    response_model=ImportSummaryResponse
)
def get_import_summary(
    db: Session = Depends(get_db)
):

    repository = DashboardRepository(db)

    service = DashboardService(repository)

    return service.get_import_summary()