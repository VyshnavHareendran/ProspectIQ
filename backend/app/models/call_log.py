from sqlalchemy import (
    Column,
    Integer,
    String,
    Text,
    TIMESTAMP,
    ForeignKey,
    Date,
    text
)

from sqlalchemy.orm import relationship

from .base import Base


class CallLog(Base):
    __tablename__ = "call_logs"

    id = Column(Integer, primary_key=True, index=True)

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

    call_status = Column(
        String(30),
        nullable=False
    )

    notes = Column(
        Text,
        nullable=True
    )

    next_followup_date = Column(
        Date,
        nullable=True
    )

    created_at = Column(
        TIMESTAMP,
        server_default=text("CURRENT_TIMESTAMP")
    )

    business = relationship("Business", back_populates="call_logs")
    
    employee = relationship("User", back_populates="call_logs")