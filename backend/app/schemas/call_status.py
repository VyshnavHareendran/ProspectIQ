from enum import Enum


class CallStatus(str, Enum):
    INTERESTED = "INTERESTED"
    FOLLOW_UP = "FOLLOW_UP"
    NO_ANSWER = "NO_ANSWER"
    BUSY = "BUSY"
    NOT_INTERESTED = "NOT_INTERESTED"
    WRONG_NUMBER = "WRONG_NUMBER"
    CLOSED = "CLOSED"