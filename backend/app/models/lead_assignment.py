from sqlalchemy import (
    Column,
    Integer,
    ForeignKey,
    String,
    TIMESTAMP,
    Boolean,
    text
)

from sqlalchemy.orm import relationship

from .base import Base

from app.schemas.lead_assignment_status import LeadAssignmentStatus

class LeadAssignment(Base):

    __tablename__ = "lead_assignments"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    business_id = Column(
        Integer,
        ForeignKey("businesses.id"),
        nullable=False
    )

    employee_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    assigned_by = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    status = Column(
        String(30),
        nullable=False,
        default=LeadAssignmentStatus.NEW.value
    )

    remarks = Column(
        String(500),
        nullable=True
    )

    assigned_at = Column(
        TIMESTAMP,
        server_default=text("CURRENT_TIMESTAMP")
    )

    business = relationship(
        "Business",
        back_populates="lead_assignments"
    )

    employee = relationship(
        "User",
        foreign_keys=[employee_id]
    )

    admin = relationship(
        "User",
        foreign_keys=[assigned_by]
    )

    is_active = Column(
        Boolean,
        nullable=False,
        default=True
    )