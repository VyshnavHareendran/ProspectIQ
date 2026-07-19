from app.models.call_log import CallLog

from app.repositories.call_log_repository import (
    CallLogRepository
)

from app.repositories.lead_assignment_repository import (
    LeadAssignmentRepository
)

from app.repositories.user_repository import (
    UserRepository
)

from app.schemas.call_log import (
    CallLogCreate,
    CallLogUpdate
)


class CallLogService:

    def __init__(
    self,
    call_log_repository: CallLogRepository,
    lead_assignment_repository: LeadAssignmentRepository,
    user_repository: UserRepository
    ):

        self.call_log_repository = call_log_repository
        self.lead_assignment_repository = lead_assignment_repository
        self.user_repository = user_repository
   
    def create(
        self,
        request: CallLogCreate
    ):

        assignment = (
            self.lead_assignment_repository.get_by_id(
                request.lead_assignment_id
            )
        )

        if not assignment:
            raise ValueError("Lead assignment not found.")

        employee = (
            self.user_repository.get_by_id(
                request.employee_id
            )
        )

        if not employee:

            raise ValueError(
                "Employee not found."
            )

        call_log = CallLog(

            lead_assignment_id=request.lead_assignment_id,

            employee_id=request.employee_id,

            call_outcome=request.call_outcome,

            duration=request.duration,

            notes=request.notes,

            next_followup_date=request.next_followup_date

        )

        return self.call_log_repository.create(
            call_log
        )

    def get_by_id(
        self,
        call_log_id: int
    ):

        call_log = (
            self.call_log_repository.get_by_id(
                call_log_id
            )
        )

        if not call_log:

            raise ValueError(
                "Call log not found."
            )

        return call_log

    def get_all(self):

        return (
            self.call_log_repository.get_all()
        )

    def get_by_lead_assignment(
    self,
    lead_assignment_id: int
    ):

        return (
            self.call_log_repository.get_by_lead_assignment(
                lead_assignment_id
            )
        )

    def get_by_employee(
        self,
        employee_id: int
    ):

        return (
            self.call_log_repository.get_by_employee(
                employee_id
            )
        )

    def get_today_followups(
    self,
    employee_id: int | None = None
    ):

        return (
            self.call_log_repository.get_today_followups(
                employee_id
            )
        )

    def get_pending_followups(
    self,
    employee_id: int | None = None
    ):

        return (
            self.call_log_repository.get_pending_followups(
                employee_id
            )
        )
    
    def get_overdue_followups(
    self,
    employee_id: int | None = None
    ):

        return (
            self.call_log_repository
            .get_overdue_followups(
                employee_id
            )
        )

    def update(
        self,
        call_log_id: int,
        request: CallLogUpdate
    ):

        call_log = (
            self.call_log_repository.get_by_id(
                call_log_id
            )
        )

        if not call_log:

            raise ValueError(
                "Call log not found."
            )

        update_data = request.model_dump(
            exclude_unset=True
        )

        for field, value in update_data.items():

            setattr(
                call_log,
                field,
                value
            )

        return self.call_log_repository.update(
            call_log
        )

    def delete(
        self,
        call_log_id: int
    ):

        call_log = (
            self.call_log_repository.get_by_id(
                call_log_id
            )
        )

        if not call_log:

            raise ValueError(
                "Call log not found."
            )

        self.call_log_repository.delete(
            call_log
        )

        return {
            "message": "Call log deleted successfully."
        }
