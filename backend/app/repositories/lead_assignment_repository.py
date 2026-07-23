from sqlalchemy.orm import Session
from sqlalchemy.orm import joinedload
from app.models.lead_assignment import LeadAssignment
from app.models.lead_score import LeadScore
from app.models.business import Business
from app.schemas.lead_assignment_status import LeadAssignmentStatus


class LeadAssignmentRepository:

    def __init__(self, db: Session):
        self.db = db

    def create(
        self,
        assignment: LeadAssignment
    ):

        self.db.add(assignment)

        self.db.commit()

        self.db.refresh(assignment)

        return assignment

    def update(
        self,
        assignment: LeadAssignment
    ):

        self.db.commit()

        self.db.refresh(assignment)

        return assignment
    
    def update_employee_lead(
    self,
    assignment: LeadAssignment,
    ):
        self.db.commit()

        self.db.refresh(assignment)

        return assignment

    def get_by_id(
        self,
        assignment_id: int
    ):

        return (
            self.db.query(LeadAssignment)
            .filter(
                LeadAssignment.id == assignment_id
            )
            .first()
        )

    def get_active_assignment(
        self,
        business_id: int
    ):

        return (
            self.db.query(LeadAssignment)
            .filter(
                LeadAssignment.business_id == business_id,
                LeadAssignment.is_active == True
            )
            .first()
        )

    def get_business_assignments(
        self,
        business_id: int
    ):

        return (
            self.db.query(LeadAssignment)
            .filter(
                LeadAssignment.business_id == business_id
            )
            .all()
        )

    def get_employee_assignments(
    self,
    employee_id: int
    ):

        return (
            self.db.query(LeadAssignment)
            .join(
                LeadAssignment.business
            )
            .join(
                Business.lead_scores
            )
            .options(
                joinedload(
                    LeadAssignment.business
                ).joinedload(
                    Business.lead_scores
                )
            )
            .filter(
                LeadAssignment.employee_id == employee_id,
                LeadAssignment.is_active == True
            )
            .order_by(
                LeadScore.lead_score.desc()
            )
            .all()
        )
    
    
    def get_employee_followup_assignments(
    self,
    employee_id: int,
    ):

        return (

            self.db.query(LeadAssignment)

            .options(

                joinedload(
                    LeadAssignment.business
                ).joinedload(
                    Business.lead_scores
                )

            )

            .filter(

                LeadAssignment.employee_id == employee_id,

                LeadAssignment.is_active == True,

                LeadAssignment.status == LeadAssignmentStatus.FOLLOW_UP.value

            )

            .all()

        )
    
    def get_all_followup_assignments(self):

        return (

            self.db.query(LeadAssignment)

            .options(

                joinedload(
                    LeadAssignment.employee
                ),

                joinedload(
                    LeadAssignment.business
                ).joinedload(
                    Business.lead_scores
                )

            )

            .filter(

                LeadAssignment.is_active == True,

                LeadAssignment.status == LeadAssignmentStatus.FOLLOW_UP.value

            )

            .all()

        )

    def get_all(self):

        return (
            self.db.query(LeadAssignment)
            .filter(
                LeadAssignment.is_active == True
            )
            .all()
        )
    
    def get_active_count(self):

        return (
            self.db.query(LeadAssignment)
            .filter(
                LeadAssignment.is_active == True
            )
            .count()
        )

    def deactivate(
        self,
        assignment: LeadAssignment
    ):

        assignment.is_active = False

        self.db.commit()

        self.db.refresh(assignment)

        return assignment

    def delete(
        self,
        assignment: LeadAssignment
    ):

        self.db.delete(assignment)

        self.db.commit()

    def get_assigned_business_ids(self):

        return [
            assignment.business_id
            for assignment in (
                self.db.query(LeadAssignment)
                .filter(
                    LeadAssignment.is_active == True
                )
                .all()
            )
        ]
    
    def get_employee_assignment_count(
    self,
    employee_id: int
    ):
        return (
            self.db.query(LeadAssignment)
            .filter(
                LeadAssignment.employee_id == employee_id,
                LeadAssignment.is_active == True
            )
            .count()
        )
    
    def get_high_priority_count(
    self,
    employee_id: int
    ):
        return (
            self.db.query(LeadAssignment)
            .join(LeadAssignment.business)
            .join(Business.lead_scores)
            .filter(
                LeadAssignment.employee_id == employee_id,
                LeadAssignment.is_active == True,
                LeadScore.priority == "High"
            )
            .count()
        )
    
    def get_closed_count(
    self,
    employee_id: int
    ):
        return (
            self.db.query(LeadAssignment)
            .filter(
                LeadAssignment.employee_id == employee_id,
                LeadAssignment.is_active == True,
                LeadAssignment.status == LeadAssignmentStatus.CLOSED.value
            )
            .count()
        )

    def get_employee_dashboard_leads(
    self,
    employee_id: int
    ):

        return (

            self.db.query(
                LeadAssignment
            )

            .options(

                joinedload(
                    LeadAssignment.business
                ).joinedload(
                    Business.lead_scores
                )

            )

            .filter(

                LeadAssignment.employee_id == employee_id,

                LeadAssignment.is_active == True,

                LeadAssignment.status.in_([

                    LeadAssignmentStatus.NEW.value,

                    LeadAssignmentStatus.IN_PROGRESS.value

                ])

            )

            .order_by(
                LeadAssignment.status.desc()
            )

            .all()

        )
    
    def get_followup_count(
    self,
    employee_id: int
    ):

        return (

            self.db.query(LeadAssignment)

            .filter(

                LeadAssignment.employee_id == employee_id,

                LeadAssignment.is_active == True,

                LeadAssignment.status == LeadAssignmentStatus.FOLLOW_UP.value

            )

            .count()

        )