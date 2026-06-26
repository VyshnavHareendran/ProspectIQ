from sqlalchemy import (
    Column,
    Integer,
    String,
    TIMESTAMP,
    ForeignKey,
    text
)

from sqlalchemy.orm import relationship

from .base import Base


class UploadHistory(Base):
    __tablename__ = "upload_history"

    id = Column(Integer, primary_key=True, index=True)

    filename = Column(String(255), nullable=False)

    file_type = Column(String(20), nullable=False)

    uploaded_by = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    total_records = Column(Integer, nullable=False)

    valid_records = Column(Integer, nullable=False)

    invalid_records = Column(Integer, nullable=False)

    created_at = Column(
        TIMESTAMP,
        server_default=text("CURRENT_TIMESTAMP")
    )

    uploader = relationship("User", back_populates="uploads")