import pandas as pd
from fastapi import HTTPException, UploadFile


class CSVReader:

    @staticmethod
    async def read(file: UploadFile):
        """
        Read CSV directly from an uploaded file.
        Used when the file has not been saved yet.
        """

        # Check file extension
        if not file.filename.lower().endswith(".csv"):
            raise HTTPException(
                status_code=400,
                detail="Only CSV files are allowed."
            )

        try:
            dataframe = pd.read_csv(file.file)

        except Exception:
            raise HTTPException(
                status_code=400,
                detail="Invalid CSV file."
            )

        return dataframe

    @staticmethod
    def read_from_path(path: str):
        """
        Read CSV from a saved file path.
        Used after the file is stored temporarily.
        """

        try:
            return pd.read_csv(path)

        except Exception:
            raise HTTPException(
                status_code=400,
                detail="Unable to read stored CSV file."
            )