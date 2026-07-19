from sqlalchemy.orm import Session
from sqlalchemy.orm import joinedload
from app.models.lead_assignment import LeadAssignment


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
            .options(
                joinedload(LeadAssignment.business)
            )
            .filter(
                LeadAssignment.employee_id == employee_id,
                LeadAssignment.is_active == True
            )
            .all()
        )

    def get_all(self):

        return (
            self.db.query(LeadAssignment)
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