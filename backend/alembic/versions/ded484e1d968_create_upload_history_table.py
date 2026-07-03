"""Create upload history table

Revision ID: ded484e1d968
Revises: af3ada67cacf
Create Date: 2026-07-02 00:23:08.535664

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


def upgrade():
    op.add_column(
        "upload_history",
        sa.Column(
            "source_type",
            sa.String(length=30),
            nullable=False,
            server_default="CSV"
        )
    )

    op.add_column(
        "upload_history",
        sa.Column(
            "source_name",
            sa.String(length=255),
            nullable=True
        )
    )

    op.add_column(
        "upload_history",
        sa.Column(
            "duplicate_records",
            sa.Integer(),
            nullable=False,
            server_default="0"
        )
    )

    op.add_column(
        "upload_history",
        sa.Column(
            "status",
            sa.String(length=30),
            nullable=False,
            server_default="PROCESSING"
        )
    )

    op.add_column(
        "upload_history",
        sa.Column(
            "remarks",
            sa.Text(),
            nullable=True
        )
    )