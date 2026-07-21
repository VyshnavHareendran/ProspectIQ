"""create admin settings table

Revision ID: 2b6d7f0a8c91
Revises: fa3f1cad41b1
Create Date: 2026-07-20 12:45:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = "2b6d7f0a8c91"
down_revision: Union[str, Sequence[str], None] = "fa3f1cad41b1"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "admin_settings",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("key", sa.String(length=80), nullable=False),
        sa.Column("user_id", sa.Integer(), nullable=True),
        sa.Column("value", sa.JSON(), nullable=False),
        sa.Column(
            "created_at",
            sa.TIMESTAMP(),
            server_default=sa.text("CURRENT_TIMESTAMP"),
            nullable=True,
        ),
        sa.Column(
            "updated_at",
            sa.TIMESTAMP(),
            server_default=sa.text("CURRENT_TIMESTAMP"),
            nullable=True,
        ),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("key", "user_id", name="uq_admin_settings_key_user_id"),
    )
    op.create_index(op.f("ix_admin_settings_id"), "admin_settings", ["id"], unique=False)
    op.create_index(
        op.f("ix_admin_settings_user_id"),
        "admin_settings",
        ["user_id"],
        unique=False,
    )


def downgrade() -> None:
    op.drop_index(op.f("ix_admin_settings_user_id"), table_name="admin_settings")
    op.drop_index(op.f("ix_admin_settings_id"), table_name="admin_settings")
    op.drop_table("admin_settings")
