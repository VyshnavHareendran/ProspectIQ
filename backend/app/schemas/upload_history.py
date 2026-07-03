from datetime import datetime
from typing import Optional

from pydantic import BaseModel

class UploadHistoryCreate(BaseModel):
    filename: str
    file_type: str
    source_type: str = "CSV"
    source_name: Optional[str] = None


class UploadHistoryResponse(BaseModel):
    id: int

    filename: str
    file_type: str

    source_type: str
    source_name: Optional[str]

    total_records: int
    valid_records: int
    invalid_records: int
    duplicate_records: int

    status: str
    remarks: Optional[str]

    uploaded_by: int
    created_at: datetime

    class Config:
        from_attributes = True