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

from datetime import date, timedelta
from app.schemas.call_status import CallStatus
from app.schemas.lead_assignment_status import (
    LeadAssignmentStatus
)


class CallLogService:

    MAX_RETRY_ATTEMPTS = 5

    def __init__(
    self,
    call_log_repository: CallLogRepository,
    lead_assignment_repository: LeadAssignmentRepository,
    user_repository: UserRepository
    ):

        self.call_log_repository = call_log_repository
        self.lead_assignment_repository = lead_assignment_repository
        self.user_repository = user_repository
    

    def _get_followup_calls(
        self,
        employee_id: int | None = None
    ):

        if employee_id is None:

            assignments = (
                self.lead_assignment_repository
                .get_all_followup_assignments()
            )

        else:

            assignments = (
                self.lead_assignment_repository
                .get_employee_followup_assignments(
                    employee_id
                )
            )

        followups = []

        for assignment in assignments:

            latest_call = (
                self.call_log_repository
                .get_latest_by_assignment(
                    assignment.id
                )
            )

            if latest_call:

                followups.append(latest_call)

        return followups


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

        latest_call = (
            self.call_log_repository.get_latest_by_assignment(
                request.lead_assignment_id
            )
        )

        attempt = 1

        if latest_call:
            attempt = latest_call.attempt_number + 1

        call_log = CallLog(


            lead_assignment_id=request.lead_assignment_id,

            employee_id=request.employee_id,

            call_outcome=request.call_outcome,

            duration=request.duration,

            notes=request.notes,

            next_followup_date=request.next_followup_date,

            attempt_number=attempt

        

        )

        saved_call = self.call_log_repository.create(
            call_log
        )

        if request.call_outcome == CallStatus.INTERESTED:

            assignment.status = (
                LeadAssignmentStatus.IN_PROGRESS.value
            )

            saved_call.next_followup_date = None

        elif request.call_outcome in [
            CallStatus.FOLLOW_UP,
            "CALL_BACK",
        ]:

            assignment.status = (
                LeadAssignmentStatus.FOLLOW_UP.value
            )

            saved_call.next_followup_date = (
                request.next_followup_date
            )

        elif request.call_outcome == CallStatus.NO_ANSWER:

            if attempt < self.MAX_RETRY_ATTEMPTS:

                assignment.status = (
                    LeadAssignmentStatus.IN_PROGRESS.value
                )

                saved_call.next_followup_date = (
                    date.today() + timedelta(days=1)
                )

            else:

                assignment.status = (
                    LeadAssignmentStatus.CLOSED.value
                )

                saved_call.next_followup_date = None

        elif request.call_outcome == CallStatus.BUSY:

            if attempt < self.MAX_RETRY_ATTEMPTS:

                assignment.status = (
                    LeadAssignmentStatus.IN_PROGRESS.value
                )

                saved_call.next_followup_date = (
                    date.today() + timedelta(days=1)
                )

            else:

                assignment.status = (
                    LeadAssignmentStatus.CLOSED.value
                )

                saved_call.next_followup_date = None

        

        elif request.call_outcome == CallStatus.NOT_INTERESTED:

            assignment.status = (
                LeadAssignmentStatus.CLOSED.value
            )

            saved_call.next_followup_date = None

        elif request.call_outcome == CallStatus.WRONG_NUMBER:

            assignment.status = (
                LeadAssignmentStatus.CLOSED.value
            )

            saved_call.next_followup_date = None

        elif request.call_outcome == CallStatus.CLOSED:

            assignment.status = (
                LeadAssignmentStatus.CLOSED.value
            )

            saved_call.next_followup_date = None

        self.lead_assignment_repository.update(
            assignment
        )

        self.call_log_repository.update(
            saved_call
        )

        return saved_call

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

    def get_by_business(
        self,
        business_id: int
    ):

        return (
            self.call_log_repository.get_by_business(
                business_id
            )
        )


    def get_today_followups(
    self,
    employee_id: int | None = None
    ):

        return [

            call

            for call in self._get_followup_calls(
                employee_id
            )

            if (
                call.next_followup_date
                and call.next_followup_date == date.today()
            )

        ]

    def get_pending_followups(
    self,
    employee_id: int | None = None
    ):

        return [

            call

            for call in self._get_followup_calls(
                employee_id
            )

            if (
                call.next_followup_date
                and call.next_followup_date > date.today()
            )

        ]
    
    def get_overdue_followups(
    self,
    employee_id: int | None = None
    ):

        return [

            call

            for call in self._get_followup_calls(
                employee_id
            )

            if (
                call.next_followup_date
                and call.next_followup_date < date.today()
            )

        ]

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
