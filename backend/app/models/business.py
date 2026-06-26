from sqlalchemy import (
    Column,
    Integer,
    String,
    Text,
    Float,
    Boolean,
    TIMESTAMP,
    ForeignKey,
    func
)

from sqlalchemy.orm import relationship

from .base import Base


class Business(Base):
    __tablename__ = "businesses"

    id = Column(Integer, primary_key=True, index=True)

    business_name = Column(String(255), nullable=False)

    category = Column(String(100), index=True, nullable=False)

    phone_number = Column(String(30), index=True, nullable=False)

    email = Column(String(255), nullable=True)

    address = Column(Text, nullable=False)

    city = Column(String(100), index=True, nullable=False)

    website_url = Column(String(500), nullable=True)

    google_rating = Column(Float, nullable=True)

    review_count = Column(Integer, nullable=True)

    google_maps_link = Column(Text, nullable=True)

    business_hours = Column(Text, nullable=True)

    whatsapp_number = Column(String(30), nullable=True)

    remarks = Column(Text, nullable=True)

    data_source = Column(String(30), nullable=False)

    lead_scores = relationship(
        "LeadScore",
        back_populates="business"
    )

    call_logs = relationship(
    "CallLog",
    back_populates="business"
)

    created_at = Column(
        TIMESTAMP,
        server_default=func.now()
    )

    updated_at = Column(
        TIMESTAMP,
        server_default=func.now(),
        onupdate=func.now()
    )

    updated_by = Column(
    Integer,
    ForeignKey("users.id"),
    nullable=True
    )

    is_active = Column(Boolean, default=True, nullable=False)