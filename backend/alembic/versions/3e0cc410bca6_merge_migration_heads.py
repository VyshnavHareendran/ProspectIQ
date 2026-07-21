"""merge migration heads

Revision ID: 3e0cc410bca6
Revises: 764e8f33f1dd, 2b6d7f0a8c91
Create Date: 2026-07-20 15:08:49.866267

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '3e0cc410bca6'
down_revision: Union[str, Sequence[str], None] = ('764e8f33f1dd', '2b6d7f0a8c91')
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
