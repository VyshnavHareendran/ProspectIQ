from sqlalchemy import (
    Column,
    Integer,
    String,
    TIMESTAMP,
    ForeignKey,
    Text,
    text
)

from sqlalchemy.orm import relationship

from .base import Base


class UploadHistory(Base):
    __tablename__ = "upload_history"

    id = Column(Integer, primary_key=True, index=True)

    filename = Column(String(255), nullable=False)

    stored_file_path = Column(
    String(500),
    nullable=True
    )

    file_type = Column(String(20), nullable=False)

    # NEW
    source_type = Column(String(30), nullable=False, default="CSV")

    # NEW
    source_name = Column(String(255), nullable=True)

    uploaded_by = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    total_records = Column(Integer, nullable=False)

    valid_records = Column(Integer, nullable=False)

    invalid_records = Column(Integer, nullable=False)

    # NEW
    duplicate_records = Column(Integer, default=0)

    # NEW
    status = Column(String(30), default="PROCESSING")

    # NEW
    remarks = Column(Text, nullable=True)

    created_at = Column(
        TIMESTAMP,
        server_default=text("CURRENT_TIMESTAMP")
    )

    uploader = relationship(
        "User",
        back_populates="uploads"
    )