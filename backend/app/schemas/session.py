from pydantic import BaseModel


class CurrentSessionResponse(BaseModel):

    browser: str

    operating_system: str

    ip_address: str

    last_login: str