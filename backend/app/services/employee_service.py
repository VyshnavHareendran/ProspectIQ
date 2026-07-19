def get_my_leads(self, employee_id: int):
    return self.lead_assignment_repository.get_employee_assignments(
        employee_id
    )