from enum import Enum


class SourceType(str, Enum):
    CSV = "CSV"
    GOOGLE_MAPS = "GOOGLE_MAPS"