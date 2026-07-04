from typing import Any

from pydantic import BaseModel


class CSVPreviewResponse(BaseModel):

    upload_id: int

    columns: list[str]

    total_rows: int

    sample_rows: list[dict[str, Any]]

    suggested_mapping: dict[str, str]

    unmapped_columns: list[str]