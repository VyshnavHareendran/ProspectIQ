from app.repositories.lead_score_repository import (
    LeadScoreRepository
)

from typing import Optional



class LeadScoreService:

    def __init__(
        self,
        repository: LeadScoreRepository
    ):
        self.repository = repository

    def get_all(
    self,
    page: int = 1,
    page_size: int = 20,
    priority: Optional[str] = None,
    search: Optional[str] = None,
    city: Optional[str] = None,
    category: Optional[str] = None
    ):

        return self.repository.get_all(
            page=page,
            page_size=page_size,
            priority=priority,
            search=search,
            city=city,
            category=category
        )

    def get_by_business_id(
        self,
        business_id: int
    ):

        return (
            self.repository.get_by_business_id(
                business_id
            )
        )

    def get_high_priority(self):

        return (
            self.repository.get_high_priority()
        )

    def get_statistics(self):

        return (
            self.repository.get_statistics()
        )

    def get_daily_call_list(self):

        return (
            self.repository.get_daily_call_list()
        )
    
    def get_feature_importance(self):

        return (
            self.repository.get_feature_importance()
        )
    
    def generate_score(
        self,
        business_id: int
    ):

        return (
            self.repository.generate_score(
                business_id
            )
        )

    def generate_all_scores(
        self
    ):

        return (
            self.repository.generate_all_scores()
        )
            



