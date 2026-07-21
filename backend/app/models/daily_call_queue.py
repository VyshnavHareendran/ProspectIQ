from sqlalchemy import (
    Column,
    Integer,
    Float,
    ForeignKey,
    Date,
    DateTime,
    String,
)
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from .base import Base


class DailyCallQueue(Base):
    __tablename__ = "daily_call_queue"

    id = Column(Integer, primary_key=True, index=True)

    employee_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False,
    )

    assignment_id = Column(
        Integer,
        ForeignKey("lead_assignments.id"),
        nullable=False,
    )

    lead_score = Column(
        Float,
        nullable=False,
    )

    priority = Column(
        String(20),
        nullable=False,
    )

    queue_reason = Column(
        String(50),
        nullable=False
    )

    queue_date = Column(
        Date,
        nullable=False,
    )

    queue_order = Column(
        Integer,
        nullable=False,
    )

    status = Column(
        String,
        default="PENDING",
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
    )

    employee = relationship("User")
    assignment = relationship("LeadAssignment")