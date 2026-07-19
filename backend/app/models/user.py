from sqlalchemy import (
    Column, 
    Integer, 
    String, 
    Boolean,
    TIMESTAMP, 
    text
    )

from sqlalchemy.orm import relationship

from .base import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    full_name = Column(String(100), nullable=False)

    email = Column(
        String(255),
        unique=True,
        nullable=False,
        index=True
    )

    password_hash = Column(String(255), nullable=False)

    role = Column(String(20), nullable=False)

    is_active = Column(
        Boolean,
        nullable=False,
        default=True,
        server_default=text("true")
    )

    is_deleted = Column(
        Boolean,
        nullable=False,
        default=False,
        server_default=text("false")
    )

    must_change_password = Column(
        Boolean,
        nullable=False,
        default=False,
        server_default=text("false")
    )

    created_at = Column(
        TIMESTAMP,
        server_default=text("CURRENT_TIMESTAMP")
    )

    call_logs = relationship(
    "CallLog",
    back_populates="employee"
    )

    uploads = relationship(
    "UploadHistory",
    back_populates="uploader"
    )

    employee_assignments = relationship(
        "LeadAssignment",
        foreign_keys="LeadAssignment.employee_id"
    )

    admin_assignments = relationship(
        "LeadAssignment",
        foreign_keys="LeadAssignment.assigned_by"
    )
