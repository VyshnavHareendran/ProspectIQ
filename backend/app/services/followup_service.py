from datetime import date

from app.repositories.lead_assignment_repository import LeadAssignmentRepository
from app.repositories.call_log_repository import CallLogRepository


class FollowupService:

    def __init__(
        self,
        lead_assignment_repository: LeadAssignmentRepository,
        call_log_repository: CallLogRepository,
    ):
        self.lead_assignment_repository = lead_assignment_repository
        self.call_log_repository = call_log_repository

    def get_followups(
        self,
        employee_id: int,
    ):

        assignments = (
            self.lead_assignment_repository
            .get_employee_followup_assignments(employee_id)
        )

        today = []
        pending = []
        overdue = []

        for assignment in assignments:

            latest_call = (
                self.call_log_repository
                .get_latest_by_assignment(
                    assignment.id
                )
            )

            if latest_call is None:
                continue

            if latest_call.next_followup_date is None:
                continue

            data = {
                "assignment": assignment,
                "latest_call": latest_call,
            }

            if latest_call.next_followup_date == date.today():

                today.append(data)

            elif latest_call.next_followup_date > date.today():

                pending.append(data)

            else:

                overdue.append(data)

        return {
            "today": today,
            "pending": pending,
            "overdue": overdue,
            "stats": {
                "today": len(today),
                "pending": len(pending),
                "overdue": len(overdue),
            },
        }