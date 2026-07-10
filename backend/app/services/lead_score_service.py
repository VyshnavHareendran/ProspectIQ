from app.repositories.lead_score_repository import (
    LeadScoreRepository
)


class LeadScoreService:

    def __init__(
        self,
        repository: LeadScoreRepository
    ):
        self.repository = repository

    def get_all(self):

        return self.repository.get_all()

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