from datetime import datetime

from pydantic import BaseModel, ConfigDict


class VisitorCreate(BaseModel):
    name: str
    phone: str | None = None
    purpose: str | None = None


class VisitorOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    phone: str | None
    purpose: str | None
    checked_in_at: datetime
    checked_out_at: datetime | None
