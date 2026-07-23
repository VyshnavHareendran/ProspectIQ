from app.repositories.report_repository import (
    ReportRepository
)

from app.utils.csv_export import CSVExporter
from app.utils.excel_export import ExcelExporter

class ReportService:

    def __init__(
        self,
        repository: ReportRepository
    ):
        self.repository = repository

    def get_business_report(self):

        return (
            self.repository.get_business_report()
        )

    def get_upload_report(self):

        return (
            self.repository.get_upload_report()
        )

    def get_call_log_report(self):

        return (
            self.repository.get_call_log_report()
        )
    
    def export_business_csv(self):

        businesses = (

            self.repository

            .get_business_report()

        )

        fields = [

            "id",

            "business_name",

            "category",

            "city",

            "phone_number",

            "google_rating",

            "review_count",

            "status"

        ]

        return CSVExporter.export(

            businesses,

            fields

        )
    
    def export_upload_csv(self):

        uploads = (
            self.repository
            .get_upload_report()
        )

        fields = [

            "id",

            "filename",

            "file_type",

            "source_type",

            "total_records",

            "valid_records",

            "invalid_records",

            "duplicate_records",

            "status"

        ]

        return CSVExporter.export(
            uploads,
            fields
        )
    
    def export_call_log_csv(self):

        calls = (
            self.repository
            .get_call_log_report()
        )

        fields = [

            "id",

            "business_id",

            "employee_id",

            "call_status",

            "notes",

            "next_followup_date",

            "created_at"

        ]

        return CSVExporter.export(
            calls,
            fields
        )
    
    def export_business_excel(self):

        businesses = self.repository.get_business_report()

        fields = [

            "id",

            "business_name",

            "category",

            "city",

            "phone_number",

            "google_rating",

            "review_count",

            "status"

        ]

        return ExcelExporter.export(

            businesses,

            fields,

            "Businesses"

        )
    
    def export_upload_excel(self):

        uploads = self.repository.get_upload_report()

        fields = [

            "id",

            "filename",

            "file_type",

            "source_type",

            "total_records",

            "valid_records",

            "invalid_records",

            "duplicate_records",

            "status"

        ]

        return ExcelExporter.export(

            uploads,

            fields,

            "Uploads"

        )
    
    def export_call_log_excel(self):

        calls = self.repository.get_call_log_report()

        fields = [

            "id",

            "business_id",

            "employee_id",

            "call_status",

            "notes",

            "next_followup_date",

            "created_at"

        ]

        return ExcelExporter.export(

            calls,

            fields,

            "Call Logs"

        )
    
    def get_summary(self):

        return self.repository.get_summary()
    
    def get_business_category_distribution(self):

        return (
            self.repository
            .get_business_category_distribution()
        )

    def get_city_distribution(self):

        return (
            self.repository
            .get_city_distribution()
        )

    def get_lead_score_chart(self):

        return (
            self.repository
            .get_lead_score_chart()
        )

    def get_calls_per_employee_chart(self):

        return (
            self.repository
            .get_calls_per_employee_chart()
        )