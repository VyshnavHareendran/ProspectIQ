from fastapi import HTTPException

from app.repositories.business_profile_repository import (
    BusinessProfileRepository
)


class BusinessProfileService:

    def __init__(
        self,
        repository: BusinessProfileRepository
    ):
        self.repository = repository

    def get_business_profile(
        self,
        business_id: int
    ):

        business = self.repository.get_business(
            business_id
        )

        if not business:
            raise HTTPException(
                status_code=404,
                detail="Business not found."
            )

        lead_score = (
            self.repository.get_latest_lead_score(
                business_id
            )
        )

        assignment = (
            self.repository.get_active_assignment(
                business_id
            )
        )

        latest_call = None
        employee_name = None

        if assignment:

            employee_name = (
                self.repository.get_employee_name(
                    assignment.employee_id
                )
            )

            latest_call = (
                self.repository.get_latest_call(
                    assignment.id
                )
            )

        return {
            "business": business,

            "lead_score": lead_score,

            "assignment": (
                {
                    "employee_name": employee_name,
                    "status": assignment.status,
                    "assigned_at": assignment.assigned_at,
                }
                if assignment
                else None
            ),

            "latest_call": latest_call,
        }