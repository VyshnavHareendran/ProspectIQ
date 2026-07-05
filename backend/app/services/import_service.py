import os

from sqlalchemy.orm import Session

from app.schemas.import_request import ImportRequest

from app.repositories.upload_history_repository import (
    UploadHistoryRepository,
)
from app.repositories.business_repository import (
    BusinessRepository,
)

from app.csv.importer import Importer

from app.models.business import Business


class ImportService:

    def __init__(
        self,
        db: Session
    ):
        self.db = db

        self.upload_repository = UploadHistoryRepository(db)

        self.business_repository = BusinessRepository(db)

        self.importer = Importer()

    def import_businesses(
        self,
        request: ImportRequest
    ):

        # Find upload session
        upload = self.upload_repository.get_by_id(
            request.upload_id
        )

        if not upload:
            return {
                "success": False,
                "message": "Upload session not found."
            }

        # Load CSV
        dataframe = self.importer.load_csv(
            upload.stored_file_path
        )

        # Apply column mapping
        dataframe = self.importer.apply_mapping(
            dataframe,
            request.mapping
        )

        # Validate rows
        valid_rows, invalid_rows = (
            self.importer.validate(dataframe)
        )

        # Remove duplicate rows inside CSV
        unique_rows, csv_duplicates = (
            self.importer.remove_csv_duplicates(
                valid_rows
            )
        )

        # Check duplicates already in database
        ready_to_insert = []

        database_duplicates = []

        for row in unique_rows:

            existing = (
                self.business_repository
                .find_duplicate_from_dict(row)
            )

            if existing:

                database_duplicates.append(row)

            else:

                ready_to_insert.append(row)

        # Convert dictionaries to Business objects
        businesses = []

        for row in ready_to_insert:

            business = Business(

                business_name=row["business_name"],

                category=row["category"],

                description=row.get("description"),

                phone_number=row["phone_number"],

                whatsapp_number=row.get(
                    "whatsapp_number"
                ),

                email=row.get("email"),

                website_url=row.get(
                    "website_url"
                ),

                address=row["address"],

                city=row["city"],

                google_maps_link=row[
                    "google_maps_link"
                ],

                google_rating=float(
                    row.get("google_rating") or 0
                ),

                review_count=int(
                    row.get("review_count") or 0
                ),

                business_hours=row.get(
                    "business_hours"
                ),

                remarks=row.get(
                    "remarks"
                ),

                data_source="CSV",

                created_by=upload.uploaded_by,

                updated_by=upload.uploaded_by
            )

            businesses.append(
                business
            )

        # Import into database
        try:

            if businesses:

                self.business_repository.bulk_create(
                    businesses
                )

            # Update upload history
            upload.total_records = len(dataframe)

            upload.valid_records = len(businesses)

            upload.invalid_records = len(
                invalid_rows
            )

            upload.duplicate_records = (
                len(csv_duplicates)
                + len(database_duplicates)
            )

            upload.status = "COMPLETED"

            upload.remarks = (
                "Import completed successfully."
            )

            self.upload_repository.update(
                upload
            )

            # Delete temporary CSV
            if (
                upload.stored_file_path
                and os.path.exists(
                    upload.stored_file_path
                )
            ):

                os.remove(
                    upload.stored_file_path
                )

        except Exception as e:

            self.db.rollback()

            upload.status = "FAILED"

            upload.remarks = str(e)

            self.upload_repository.update(
                upload
            )

            raise

        return {

            "success": True,

            "message": "Businesses imported successfully.",

            "total_rows": len(dataframe),

            "imported_rows": len(
                businesses
            ),

            "invalid_rows": len(
                invalid_rows
            ),

            "csv_duplicates": len(
                csv_duplicates
            ),

            "database_duplicates": len(
                database_duplicates
            )
        }