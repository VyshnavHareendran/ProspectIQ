from pydantic import BaseModel
from typing import Optional

class CompleteCallRequest(BaseModel):
    queue_id: int
    outcome: str
    remarks: Optional[str] = None
