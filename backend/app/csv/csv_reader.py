#Only reads the file.

import pandas as pd
from fastapi import HTTPException, UploadFile


class CSVReader:

    @staticmethod
    async def read(file: UploadFile):

        # Check extension
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