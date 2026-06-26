from sqlalchemy import (
    Column,
    Integer,
    Float,
    String,
    Text,
    TIMESTAMP,
    ForeignKey,
    text
)

from sqlalchemy.orm import relationship

from .base import Base


class LeadScore(Base):
    __tablename__ = "lead_scores"

    id = Column(Integer, primary_key=True, index=True)

    business_id = Column(
        Integer,
        ForeignKey("businesses.id"),
        nullable=False
    )

    lead_score = Column(
        Float,
        nullable=False
    )

    priority = Column(
        String(20),
        nullable=False
    )

    score_reason = Column(
        Text,
        nullable=True
    )

    score_version = Column(
    Integer,
    nullable=False,
    default=1
    )

    business = relationship("Business", back_populates="lead_scores")