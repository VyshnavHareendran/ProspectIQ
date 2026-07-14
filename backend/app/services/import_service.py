import os
import math
from urllib.parse import quote_plus

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

        dataframe = self._prepare_dataframe(dataframe)

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

                business_name=str(row["business_name"]).strip(),

                category=str(row["category"]).strip(),

                description=row.get("description"),

                phone_number=str(row["phone_number"]).strip(),

                whatsapp_number=str(row.get(
                    "whatsapp_number"
                ))
                if row.get("whatsapp_number")
                else None,

                email=row.get("email"),

                website_url=row.get(
                    "website_url"
                ),

                address=str(row["address"]).strip(),

                city=str(row["city"]).strip(),

                state=row.get("state"),

                google_maps_link=row[
                    "google_maps_link"
                ],

                google_rating=self._to_float(
                    row.get("google_rating")
                ),

                review_count=self._to_int(
                    row.get("review_count")
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

            upload.valid_records = len(valid_rows)

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

    def _prepare_dataframe(self, dataframe):
        dataframe = dataframe.where(dataframe.notna(), None)

        for column in dataframe.columns:
            dataframe[column] = dataframe[column].map(self._clean_value)

        optional_defaults = {
            "description": None,
            "whatsapp_number": None,
            "email": None,
            "website_url": None,
            "state": None,
            "google_rating": 0,
            "review_count": 0,
            "business_hours": None,
            "remarks": None,
        }

        for column, default in optional_defaults.items():
            if column not in dataframe.columns:
                dataframe[column] = default

        dataframe["website_url"] = dataframe["website_url"].map(
            self._normalize_http_url
        )

        if "google_maps_link" not in dataframe.columns:
            dataframe["google_maps_link"] = None

        dataframe["google_maps_link"] = dataframe.apply(
            self._ensure_google_maps_link,
            axis=1
        )

        return dataframe

    @staticmethod
    def _clean_value(value):
        if value is None:
            return None

        if isinstance(value, float) and math.isnan(value):
            return None

        if isinstance(value, str):
            stripped = value.strip()
            if stripped.lower() in ["nan", "none", "null"]:
                return None

            return stripped or None

        try:
            if value != value:
                return None
        except TypeError:
            pass

        return value

    @staticmethod
    def _ensure_google_maps_link(row):
        existing = row.get("google_maps_link")

        if not ImportService._is_empty(existing):
            return ImportService._normalize_http_url(existing)

        query_parts = [
            row.get("business_name"),
            row.get("address"),
            row.get("city"),
            row.get("state"),
        ]
        query = " ".join(
            str(part).strip()
            for part in query_parts
            if part is not None and str(part).strip() != ""
        )

        if not query:
            query = str(row.get("phone_number") or "business").strip()

        return f"https://maps.google.com/?q={quote_plus(query)}"

    @staticmethod
    def _normalize_http_url(value):
        if ImportService._is_empty(value):
            return None

        url = str(value).strip()

        if url.startswith(("http://", "https://")):
            return url

        return f"https://{url}"

    @staticmethod
    def _is_empty(value):
        return (
            value is None
            or str(value).strip().lower() in ["", "nan", "none", "null"]
        )

    @staticmethod
    def _to_float(value):
        if ImportService._is_empty(value):
            return 0.0

        return float(value)

    @staticmethod
    def _to_int(value):
        if ImportService._is_empty(value):
            return 0

        return int(float(value))
