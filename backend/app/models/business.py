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


    #Primary Key
    id = Column(Integer, primary_key=True, index=True)

    #Basic Information
    business_name = Column(String(255), nullable=False)

    category = Column(String(100), index=True, nullable=False)

    description = Column(Text, nullable=True)

    #Contact Information    
    phone_number = Column(String(30), index=True, nullable=False)

    whatsapp_number = Column(String(30), nullable=True)

    email = Column(String(255), nullable=True)

    website_url = Column(String(500), nullable=True)

#Location Information
    address = Column(Text, nullable=False)

    city = Column(String(100), index=True, nullable=False)

    state = Column(String(100), nullable=True, index=True)

    google_maps_link = Column(Text, unique=True, nullable=False)

    #Business Metrics
    google_rating = Column(Float, nullable=False)

    review_count = Column(Integer, nullable=False)

    business_hours = Column(Text, nullable=True)

    remarks = Column(Text, nullable=True)

#CRM Fields
    status = Column(
    String(30),
    default="NEW",
    nullable=True
    )

    last_contacted_at = Column(
    TIMESTAMP,
    nullable=True
    )

    data_source = Column(
        String(30),
        nullable=False
    )

    is_active = Column(
        Boolean,
        default=True, 
        nullable=False)

#Audit Fields
    created_at = Column(
        TIMESTAMP,
        server_default=func.now()
    )

    updated_at = Column(
        TIMESTAMP,
        server_default=func.now(),
        onupdate=func.now()
    )

    created_by = Column(
    Integer,
    ForeignKey("users.id"),
    nullable=True
    )

    updated_by = Column(
    Integer,
    ForeignKey("users.id"),
    nullable=True
    )

#Relationships
    creator = relationship(
    "User",
    foreign_keys=[created_by]
    )

    updater = relationship(
    "User",
    foreign_keys=[updated_by]
    )

    lead_scores = relationship(
        "LeadScore",
        back_populates="business"
    )

    lead_assignments = relationship(
        "LeadAssignment",
        back_populates="business",
    )

    call_logs = relationship(
    "CallLog",
    back_populates="business"
    )


    