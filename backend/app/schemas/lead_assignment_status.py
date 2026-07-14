from enum import Enum

class LeadAssignmentStatus(str, Enum):
    NEW = "NEW"
    IN_PROGRESS = "IN_PROGRESS"
    FOLLOW_UP = "FOLLOW_UP"
    CLOSED = "CLOSED"