import os
import uuid
import shutil

from fastapi import UploadFile


class FileStorage:

    TEMP_FOLDER = "app/storage/uploads/temp"

    @classmethod
    async def save(cls, file: UploadFile):

        os.makedirs(
            cls.TEMP_FOLDER,
            exist_ok=True
        )

        unique_name = (
            f"{uuid.uuid4()}_{file.filename}"
        )

        path = os.path.join(
            cls.TEMP_FOLDER,
            unique_name
        )

        with open(path, "wb") as buffer:
            shutil.copyfileobj(
                file.file,
                buffer
            )

        return {
            "filename": unique_name,
            "path": path
        }