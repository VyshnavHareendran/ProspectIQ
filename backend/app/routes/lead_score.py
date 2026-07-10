from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db

from app.repositories.lead_score_repository import (
    LeadScoreRepository
)

from app.services.lead_score_service import (
    LeadScoreService
)

from app.schemas.lead_score import (
    LeadScoreResponse,
    LeadScoreStatisticsResponse
)

router = APIRouter(
    prefix="/lead-scores",
    tags=["Lead Scores"]
)


def get_service(
    db: Session
):

    repository = LeadScoreRepository(db)

    return LeadScoreService(repository)


@router.get(
    "",
    response_model=List[LeadScoreResponse]
)
def get_all_lead_scores(
    db: Session = Depends(get_db)
):

    service = get_service(db)

    return service.get_all()

@router.get(
    "/{business_id}",
    response_model=LeadScoreResponse
)
def get_business_lead_score(
    business_id: int,
    db: Session = Depends(get_db)
):

    service = get_service(db)

    lead = service.get_by_business_id(
        business_id
    )

    if not lead:

        raise HTTPException(
            status_code=404,
            detail="Lead score not found."
        )

    return lead

@router.get(
    "/high-priority",
    response_model=List[LeadScoreResponse]
)
def get_high_priority_leads(
    db: Session = Depends(get_db)
):

    service = get_service(db)

    return service.get_high_priority()

@router.get(
    "/statistics",
    response_model=LeadScoreStatisticsResponse
)
def get_statistics(
    db: Session = Depends(get_db)
):

    service = get_service(db)

    return service.get_statistics()

@router.get(
    "/daily-call-list",
    response_model=List[LeadScoreResponse]
)
def get_daily_call_list(
    db: Session = Depends(get_db)
):

    service = get_service(db)

    return service.get_daily_call_list()