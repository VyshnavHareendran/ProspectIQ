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
    LeadScoreStatisticsResponse,
    FeatureImportanceResponse,
    LeadScoreListResponse,
    GenerateAllLeadScoresResponse
)

from typing import Optional

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
    response_model=LeadScoreListResponse
)
def get_all_lead_scores(

    page: int = 1,

    page_size: int = 20,

    priority: Optional[str] = None,

    search: Optional[str] = None,

    city: Optional[str] = None,

    category: Optional[str] = None,

    db: Session = Depends(get_db)

):

    service = get_service(db)

    return service.get_all(

        page=page,

        page_size=page_size,

        priority=priority,

        search=search,

        city=city,

        category=category

    )


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

@router.get(
    "/feature-importance",
    response_model=FeatureImportanceResponse
)
def get_feature_importance(
    db: Session = Depends(get_db)
):

    service = get_service(db)

    return service.get_feature_importance()

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


@router.post(
    "/generate/{business_id}",
    response_model=LeadScoreResponse
)
def generate_lead_score(
    business_id: int,
    db: Session = Depends(get_db)
):

    service = get_service(db)

    try:
        lead_score = service.generate_score(
            business_id
        )
    except Exception as exc:
        raise HTTPException(
            status_code=503,
            detail=str(exc)
        ) from exc
    except ValueError as exc:
        raise HTTPException(
            status_code=500,
            detail=str(exc)
        ) from exc

    if not lead_score:

        raise HTTPException(
            status_code=404,
            detail="Business not found."
        )

    return lead_score

@router.post(
    "/generate-all",
    response_model=GenerateAllLeadScoresResponse
)
def generate_all_lead_scores(
    db: Session = Depends(get_db)
):

    service = get_service(db)

    try:
        return service.generate_all_scores()
    except Exception as exc:
        raise HTTPException(
            status_code=503,
            detail=str(exc)
        ) from exc
    except ValueError as exc:
        raise HTTPException(
            status_code=500,
            detail=str(exc)
        ) from exc
