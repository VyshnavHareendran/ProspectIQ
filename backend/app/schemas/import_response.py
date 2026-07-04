from pydantic import BaseModel


class ImportResponse(BaseModel):

    success: bool

    imported_records: int

    duplicate_records: int

    invalid_records: int

    message: str