from fastapi import HTTPException, UploadFile, status

from app.models.upload_history import UploadHistory
from app.repositories.upload_history_repository import UploadHistoryRepository
from app.schemas.upload_history import UploadHistoryCreate

from app.csv.csv_reader import CSVReader
from app.csv.preview_generator import PreviewGenerator

from app.storage.file_storage import FileStorage


class UploadHistoryService:

    def __init__(
        self,
        repository: UploadHistoryRepository
    ):
        self.repository = repository

    def create_upload(
        self,
        upload_data: UploadHistoryCreate,
        uploaded_by: int
    ):

        upload = UploadHistory(
            filename=upload_data.filename,
            stored_file_path=upload_data.stored_file_path,
            file_type=upload_data.file_type,
            source_type=upload_data.source_type,
            source_name=upload_data.source_name,

            uploaded_by=uploaded_by,

            total_records=0,
            valid_records=0,
            invalid_records=0,
            duplicate_records=0,

            status="PROCESSING"
        )

        return self.repository.create(upload)

    def get_all_uploads(self, current_user):

        if current_user.role.upper() == "ADMIN":
            return self.repository.get_all_uploads()

        return self.repository.get_uploads_by_user(
            current_user.id
        )

    def get_upload_by_id(
    self,
    upload_id: int,
    current_user
    ):

        upload = self.repository.get_upload_by_id(upload_id)

        if not upload:
            raise ValueError("Upload not found.")

        if (
            current_user.role.upper() != "ADMIN"
            and upload.uploaded_by != current_user.id
        ):
            raise ValueError(
                "You cannot access this upload."
            )

        return upload

    async def preview_csv(
        self,
        file: UploadFile,
        uploaded_by: int
    ):
        """
        Save uploaded CSV,
        create upload session,
        generate preview.
        """

        # Step 1: Save the uploaded file
        saved = await FileStorage.save(file)

        # Step 2: Create UploadHistory schema
        upload = UploadHistoryCreate(
            filename=file.filename,
            stored_file_path=saved["path"],
            file_type="CSV",
            source_type="CSV",
            source_name=file.filename
        )

        # Step 3: Save upload history
        history = self.create_upload(
            upload,
            uploaded_by
        )

        # Step 4: Read the saved CSV
        dataframe = CSVReader.read_from_path(
            saved["path"]
        )

        # Step 5: Generate preview
        preview = PreviewGenerator.generate(
            dataframe
        )

        # Step 6: Return upload session + preview
        return {
            "upload_id": history.id,
            **preview
        }