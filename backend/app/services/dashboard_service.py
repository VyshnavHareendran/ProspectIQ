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