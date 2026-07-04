from pydantic import BaseModel

from typing import Dict


class ImportRequest(BaseModel):

    upload_id: int

    mapping: Dict[str, str]