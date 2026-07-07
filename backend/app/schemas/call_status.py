from enum import Enum


class CallStatus(str, Enum):
    INTERESTED = "INTERESTED"
    FOLLOW_UP = "FOLLOW_UP"
    NOT_INTERESTED = "NOT_INTERESTED"
    NO_ANSWER = "NO_ANSWER"
    CALL_BACK = "CALL_BACK"
    CLOSED = "CLOSED"