from sqlalchemy import Column, Integer, String, TIMESTAMP, UniqueConstraint, text
from sqlalchemy.types import JSON

from .base import Base


class AdminSetting(Base):
    __tablename__ = "admin_settings"

    id = Column(Integer, primary_key=True, index=True)
    key = Column(String(80), nullable=False)
    user_id = Column(Integer, nullable=True, index=True)
    value = Column(JSON, nullable=False, default=dict)
    created_at = Column(TIMESTAMP, server_default=text("CURRENT_TIMESTAMP"))
    updated_at = Column(
        TIMESTAMP,
        server_default=text("CURRENT_TIMESTAMP"),
        onupdate=text("CURRENT_TIMESTAMP"),
    )

    __table_args__ = (
        UniqueConstraint("key", "user_id", name="uq_admin_settings_key_user_id"),
    )
