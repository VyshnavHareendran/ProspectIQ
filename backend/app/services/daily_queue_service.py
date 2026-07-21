from datetime import date

from sqlalchemy.orm import Session

from app.repositories.daily_call_queue_repository import DailyCallQueueRepository
from app.repositories.lead_assignment_repository import LeadAssignmentRepository
from app.repositories.call_log_repository import CallLogRepository

from app.models.daily_call_queue import DailyCallQueue
from app.repositories.lead_score_repository import LeadScoreRepository

class DailyQueueService:

    def __init__(self, db: Session):

        self.db = db

        self.queue_repo = DailyCallQueueRepository(db)
        self.assignment_repo = LeadAssignmentRepository(db)
        self.call_repo = CallLogRepository(db)
        self.score_repo = LeadScoreRepository(db)

    def get_or_create_queue(
        self,
        employee_id: int
    ):

        if self.queue_repo.queue_exists(employee_id):

            return self.queue_repo.get_employee_queue(employee_id)

        return self.generate_queue(employee_id)

    def generate_queue(
    self,
    employee_id: int
    ):

        # Delete today's queue if it already exists
        self.queue_repo.delete_employee_queue(employee_id)

        assignments = self.assignment_repo.get_employee_assignments(employee_id)

        overdue_followups = []
        today_followups = []
        never_contacted = []
        scored_leads = []

        today = date.today()

        for assignment in assignments:

            # Skip inactive assignments
            if not assignment.is_active:
                continue

            # Skip closed / converted leads
            if assignment.status in ["CLOSED", "CONVERTED"]:
                continue

            business = assignment.business

            if business is None:
                continue

            latest_call = self.call_repo.get_latest_by_assignment(
                assignment.id
            )

            latest_score = self.score_repo.get_by_business_id(
                business.id
            )

            lead_score = latest_score.lead_score if latest_score else 0

            priority = latest_score.priority if latest_score else "LOW"

            # ---------- Follow-up Logic ----------

            if latest_call and latest_call.next_followup_date:

                if latest_call.next_followup_date < today:

                    overdue_followups.append(
                        (
                            assignment,
                            lead_score,
                            priority,
                            "OVERDUE_FOLLOW_UP"
                        )
                    )

                    continue

                if latest_call.next_followup_date == today:

                    today_followups.append(
                        (
                            assignment,
                            lead_score,
                            priority,
                            "FOLLOW_UP_DUE"
                        )
                    )

                    continue

            # ---------- Never Contacted ----------

            if not self.call_repo.has_calls(assignment.id):

                never_contacted.append(
                    (
                        assignment,
                        lead_score,
                        priority,
                        "NEVER_CONTACTED"
                    )
                )

                continue

            # ---------- Lead Score ----------

            scored_leads.append(
                (
                    assignment,
                    lead_score,
                    priority,
                    "HIGH_SCORE"
                )
            )

        # Sort by Lead Score
        scored_leads.sort(
            key=lambda x: x[1],
            reverse=True
        )

        final_queue = []

        final_queue.extend(overdue_followups)
        final_queue.extend(today_followups)
        final_queue.extend(never_contacted)

        final_queue.extend(scored_leads)

        final_queue = final_queue[:20]

        queue_items = []

        order = 1

        for assignment, lead_score, priority, reason in final_queue:

            queue_items.append(

                DailyCallQueue(

                    employee_id=employee_id,

                    assignment_id=assignment.id,

                    lead_score=lead_score,

                    priority=priority,

                    queue_reason=reason,

                    queue_date=today,

                    queue_order=order,

                    status="PENDING"

                )

            )

            order += 1

        self.queue_repo.bulk_create(queue_items)

        return self.queue_repo.get_employee_queue(employee_id)
    

    def complete_queue_item(
    self,
    queue_id: int,
    ):
        return self.queue_repo.mark_completed(queue_id)