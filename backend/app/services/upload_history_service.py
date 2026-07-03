from fastapi import HTTPException, status

from app.models.upload_history import UploadHistory
from app.repositories.upload_history_repository import UploadHistoryRepository
from app.schemas.upload_history import UploadHistoryCreate

from app.csv.csv_reader import CSVReader
from app.csv.preview_generator import PreviewGenerator


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

    def get_all_uploads(self):
        return self.repository.get_all()

    def get_upload_by_id(
        self,
        upload_id: int
    ):
        upload = self.repository.get_by_id(upload_id)

        if not upload:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Upload history not found."
            )

        return upload
    

    from fastapi import UploadFile

    async def preview_csv(
        self,
        file: UploadFile
        ):
            """
            Read CSV and generate preview.
            """

            dataframe = await CSVReader.read(file)

            preview = PreviewGenerator.generate(
                dataframe
            )

            return preview