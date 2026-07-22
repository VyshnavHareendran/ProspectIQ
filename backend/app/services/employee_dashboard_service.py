from app.repositories.lead_assignment_repository import (
    LeadAssignmentRepository
)

from app.repositories.call_log_repository import (
    CallLogRepository
)

from app.repositories.lead_score_repository import (
    LeadScoreRepository
)


class EmployeeDashboardService:

    def __init__(self, db):

        self.assignment_repo = LeadAssignmentRepository(db)

        self.call_repo = CallLogRepository(db)

        self.score_repo = LeadScoreRepository(db)

    def get_dashboard(
        self,
        employee_id: int
    ):

        # ----------------------------
        # Dashboard Statistics
        # ----------------------------

        stats = {

            "assigned_leads":
                self.assignment_repo.get_employee_assignment_count(
                    employee_id
                ),

            "high_priority":
                self.assignment_repo.get_high_priority_count(
                    employee_id
                ),

            "calls_today":
                self.call_repo.get_calls_today_count(
                    employee_id
                ),

            "followups":
                self.call_repo.get_today_followups_count(
                    employee_id
                ),

            "closed_leads":
                self.assignment_repo.get_closed_count(
                    employee_id
                ),

            "average_score":
                self.score_repo.get_average_score(
                    employee_id
                )

        }

        # ----------------------------
        # Repository Calls
        # ----------------------------

        assigned_leads = (
            self.assignment_repo.get_employee_dashboard_leads(
                employee_id
            )
        )

        weekly_calls = (
            self.call_repo.get_weekly_calls(
                employee_id
            )
        )

        followups = (
            self.call_repo.get_today_followups(
                employee_id
            )
        )

        activities = (
            self.call_repo.get_recent_activities(
                employee_id
            )
        )

        # ----------------------------
        # Assigned Leads
        # ----------------------------

        assigned_leads_data = []

        for assignment in assigned_leads:

            latest_call = (
                self.call_repo.get_latest_by_assignment(
                    assignment.id
                )
            )

            lead_score = next(
                iter(assignment.business.lead_scores),
                None
            )

            assigned_leads_data.append({

                "id": assignment.id,

                "business_name":
                    assignment.business.business_name,

                "phone_number":
                    assignment.business.phone_number,

                "priority":
                    lead_score.priority if lead_score else None,

                "lead_score":
                    lead_score.lead_score if lead_score else None,

                "status":
                    assignment.status,

                "attempt":
                    latest_call.attempt_number
                    if latest_call
                    else 0

            })

        # ----------------------------
        # Weekly Calls
        # ----------------------------

        weekly_calls_data = []

        for row in weekly_calls:

            weekly_calls_data.append({

                "day":
                    row.call_date.strftime("%a"),

                "calls":
                    row.calls

            })

        # ----------------------------
        # 
        # 's Followups
        # ----------------------------

        followups_data = []

        for call in followups:

            priority = None

            if (
                call.lead_assignment.business.lead_scores
            ):

                priority = (
                    call.lead_assignment
                    .business
                    .lead_scores[0]
                    .priority
                )

            followups_data.append({

                "business":
                    call.lead_assignment
                    .business
                    .business_name,

                "time":
                    call.created_at.strftime("%I:%M %p")
                    if call.created_at
                    else "-",

                "priority":
                    priority

            })

        # ----------------------------
        # Recent Activities
        # ----------------------------

        activities_data = []

        for call in activities:

            activities_data.append({

                "business":
                    call.lead_assignment
                    .business
                    .business_name,

                "outcome":
                    call.call_outcome,

                "created_at":
                    call.created_at

            })

        # ----------------------------
        # Final Response
        # ----------------------------

        return {

            "stats": stats,

            "assigned_leads": assigned_leads_data,

            "weekly_calls": weekly_calls_data,

            "followups": followups_data,

            "activities": activities_data,

        }