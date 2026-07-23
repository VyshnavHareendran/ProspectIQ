from app.models.lead_assignment import LeadAssignment

from app.repositories.lead_assignment_repository import (
    LeadAssignmentRepository
)

from app.repositories.business_repository import (
    BusinessRepository
)

from app.repositories.user_repository import (
    UserRepository
)

from app.schemas.lead_assignment import (
    LeadAssignmentCreate,
    LeadAssignmentUpdate,
    EmployeeLeadUpdate,
)

from app.repositories.call_log_repository import (
    CallLogRepository
)

from app.models.call_log import CallLog

from app.schemas.lead_assignment_status import (
    LeadAssignmentStatus
)

from app.schemas.user_role import UserRole

from datetime import datetime

class LeadAssignmentService:

    def __init__(
        self,
        lead_assignment_repository: LeadAssignmentRepository,
        business_repository: BusinessRepository,
        user_repository: UserRepository,
        call_log_repository: CallLogRepository,
    ):

        self.lead_assignment_repository = (
            lead_assignment_repository
        )

        self.business_repository = (
            business_repository
        )

        self.user_repository = (
            user_repository
        )

        self.call_log_repository = (
            call_log_repository
        )

    def create(
        self,
        request: LeadAssignmentCreate,
        current_user
    ):

        # Validate Business

        business = (

            self.business_repository.get_by_id(
                request.business_id
            )
        )

        if not business:

            raise ValueError(
                "Business not found."
            )

        # Validate Employee

        employee = (
            self.user_repository.get_by_id(
                request.employee_id
            )
        )


        if not employee:

            raise ValueError(
                "Employee not found."
            )

        if employee.role != UserRole.EMPLOYEE.value:
            raise ValueError("Selected user is not an employee.")

        # Deactivate previous assignment

        active_assignment = (
            self.lead_assignment_repository
            .get_active_assignment(
                request.business_id
            )
        )

        if active_assignment:

            self.lead_assignment_repository.deactivate(
                active_assignment
            )

        # Create new assignment

        assignment = LeadAssignment(

            business_id=request.business_id,

            employee_id=request.employee_id,

            assigned_by=current_user.id,

            status=LeadAssignmentStatus.NEW.value,

            remarks=request.remarks,

            is_active=True

        )

        return (
            self.lead_assignment_repository
            .create(assignment)
        )
    
    def bulk_assign(
    self,
    request,
    current_user,
    ):
        assigned_business_ids = (
            self.lead_assignment_repository
            .get_assigned_business_ids()
        )

        businesses = (
            self.business_repository
            .get_unassigned_businesses(
                assigned_business_ids,
                request.count,
            )
        )

        if not businesses:
            raise ValueError(
                "No unassigned businesses available."
            )

        if not request.employee_ids:
            raise ValueError(
                "Please select at least one employee."
            )

        assignments = []

        employee_count = len(request.employee_ids)

        for index, business in enumerate(businesses):

            employee_id = request.employee_ids[
                index % employee_count
            ]

            create_request = LeadAssignmentCreate(
                business_id=business.id,
                employee_id=employee_id,
                remarks="Bulk Assigned"
            )

            assignment = self.create(
                create_request,
                current_user,
            )

            assignments.append(assignment)

        return assignments
    
    def get_bulk_assignment_stats(self):

        total_businesses = (
            self.business_repository.get_active_count()
        )

        assigned_businesses = (
            self.lead_assignment_repository.get_active_count()
        )

        available_businesses = (
            total_businesses -
            assigned_businesses
        )

        return {
            "total_businesses": total_businesses,
            "assigned_businesses": assigned_businesses,
            "available_businesses": available_businesses,
        }

    def get_by_id(
        self,
        assignment_id: int
    ):

        assignment = (
            self.lead_assignment_repository
            .get_by_id(
                assignment_id
            )
        )

        if not assignment:

            raise ValueError(
                "Assignment not found."
            )

        return assignment

    def get_all(self):

        return (
            self.lead_assignment_repository
            .get_all()
        )

    def get_employee_assignments(
        self,
        employee_id: int
    ):

        return (
            self.lead_assignment_repository
            .get_employee_assignments(
                employee_id
            )
        )
    
    def get_my_leads(
    self,
    employee_id: int,
    search: str | None = None,
    ):

        assignments = (
            self.lead_assignment_repository
            .get_employee_assignments(employee_id)
        )


        if search:
            search = search.strip().lower()

            assignments = [
                assignment
                for assignment in assignments
                if search in assignment.business.business_name.lower()
            ]

        result = []

        for assignment in assignments:

            business = assignment.business

            latest_score = business.lead_scores[0] if business.lead_scores else None

            result.append({

                "assignment_id": assignment.id,

                "business_id": business.id,

                "business_name": business.business_name,

                "category": business.category,

                "city": business.city,

                "status": assignment.status,

                "assigned_date": assignment.assigned_at,

                "remarks": assignment.remarks,

                "lead_score": (
                    latest_score.lead_score
                    if latest_score
                    else 0
                ),

                "priority": (
                    latest_score.priority
                    if latest_score
                    else "LOW"
                )

            })

        return result
    
    
    def update_employee_lead(
    self,
    assignment_id: int,
    request: EmployeeLeadUpdate,
    current_user,
    ):

        assignment = self.get_by_id(assignment_id)

        if not assignment:
            raise ValueError("Lead assignment not found.")

        if assignment.employee_id != current_user.id:
            raise ValueError(
                "You are not assigned to this lead."
            )

        assignment.status = request.status.value
        assignment.remarks = request.remarks
        assignment.call_outcome = request.call_outcome

        return self.lead_assignment_repository.update_employee_lead(
            assignment
        )

    def update(
        self,
        assignment_id: int,
        request: LeadAssignmentUpdate,
        current_user
    ):

        assignment = (
            self.get_by_id(
                assignment_id
            )
        )

        self.lead_assignment_repository.deactivate(
            assignment
        )

        create_request = LeadAssignmentCreate(

            business_id=assignment.business_id,

            employee_id=request.employee_id,

            remarks=request.remarks

        )

        return self.create(
            create_request,
            current_user
        )

    def delete(
        self,
        assignment_id: int
    ):

        assignment = (
            self.get_by_id(
                assignment_id
            )
        )

        return (
            self.lead_assignment_repository
            .deactivate(
                assignment
            )
        )
    
    def complete_call(
    self,
    request,
    current_user,
    ):
        assignment = self.get_by_id(request.assignment_id)

        if assignment.employee_id != current_user.id:
            raise ValueError("You are not assigned to this lead.")

        attempt_number = (
            self.call_log_repository.get_attempt_count(
                assignment.id
            ) + 1
        )

        # Create call log
        call_log = CallLog(
            lead_assignment_id=assignment.id,
            employee_id=current_user.id,
            call_outcome=request.call_status,
            attempt_number=attempt_number,
            notes=request.remarks,
            duration=request.duration,
            next_followup_date=request.next_followup_date,
            created_at=datetime.utcnow(),
        )

        self.call_log_repository.create(call_log)

        # Update assignment
        assignment.call_outcome = request.call_status
        assignment.remarks = request.remarks

        if request.call_status == "FOLLOW_UP":
            assignment.status = LeadAssignmentStatus.FOLLOW_UP.value

        elif request.call_status in ["INTERESTED", "NO_ANSWER", "BUSY"]:
            assignment.status = LeadAssignmentStatus.IN_PROGRESS.value

        elif request.call_status in [
            "NOT_INTERESTED",
            "WRONG_NUMBER",
            "CLOSED",
        ]:
            assignment.status = LeadAssignmentStatus.CLOSED.value

        self.lead_assignment_repository.update_employee_lead(assignment)

        return {
            "message": "Call completed successfully."
        }
    
    