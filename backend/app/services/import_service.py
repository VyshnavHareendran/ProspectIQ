from sqlalchemy.orm import Session

from app.schemas.import_request import ImportRequest

from app.repositories.upload_history_repository import (
    UploadHistoryRepository,
)

from app.csv.importer import Importer


class ImportService:

    def __init__(
        self,
        db: Session
    ):
        self.db = db

        self.upload_repository = UploadHistoryRepository(
            db
        )

        self.importer = Importer()

    def import_businesses(
        self,
        request: ImportRequest
    ):

        # Find the upload session
        upload = self.upload_repository.get_by_id(
            request.upload_id
        )

        if not upload:
            return {
                "success": False,
                "message": "Upload session not found."
            }

        # Read the stored CSV
        dataframe = self.importer.load_csv(
            upload.stored_file_path
        )

        dataframe = self.importer.apply_mapping(
            dataframe,
            request.mapping
        )

        return {
            "success": True,
            "rows": len(dataframe),
            "columns": dataframe.columns.tolist(),
            "sample": dataframe.head(5).to_dict(
                orient="records"
            )
        }