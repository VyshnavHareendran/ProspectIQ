from app.repositories.dashboard_repository import DashboardRepository


class DashboardService:

    def __init__(
        self,
        repository: DashboardRepository
    ):
        self.repository = repository

    def get_summary(self):

        return self.repository.get_summary()
    
    def get_city_distribution(self):

        return self.repository.get_city_distribution()
    
    def get_category_distribution(self):

        return self.repository.get_category_distribution()

    def get_recent_businesses(self):

        return self.repository.get_recent_businesses()
    
    def get_import_summary(self):

        return self.repository.get_import_summary()
    
    def get_top_rated_businesses(self):

        return self.repository.get_top_rated_businesses()
    
    def get_recent_uploads(self):

        return self.repository.get_recent_uploads()
    
    def get_recent_activity(self):

        return self.repository.get_recent_activity()
    
    def get_top_rated_businesses(self):

        return self.repository.get_top_rated_businesses()


    def get_recent_uploads(self):

        return self.repository.get_recent_uploads()


    def get_recent_activity(self):

        return self.repository.get_recent_activity()
    
    def get_upcoming_followups(self):
        return self.repository.get_upcoming_followups()
    
    def get_lead_assignment_status(self):
        return self.repository.get_lead_assignment_status()
    
    def get_recent_calls(self):
        return self.repository.get_recent_calls()
    
    def get_employee_performance(self):
        return self.repository.get_employee_performance()