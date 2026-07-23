import os
import sys

sys.path.append(
    os.path.dirname(
        os.path.dirname(os.path.abspath(__file__))
    )
)

import app.models

from app.database import SessionLocal
from app.models.user import User
from app.core.security import hash_password


admin_email = os.getenv("ADMIN_EMAIL")
admin_password = os.getenv("ADMIN_PASSWORD")
admin_name = os.getenv(
    "ADMIN_NAME",
    "System Administrator",
)

if not admin_email or not admin_password:
    print(
        "ADMIN_EMAIL and ADMIN_PASSWORD "
        "environment variables are required."
    )
    sys.exit(1)


db = SessionLocal()

try:
    existing_admin = (
        db.query(User)
        .filter(User.email == admin_email)
        .first()
    )

    if existing_admin:
        print("Admin already exists.")
        sys.exit(0)

    admin = User(
        full_name=admin_name,
        email=admin_email,
        password_hash=hash_password(admin_password),
        role="Admin",
    )

    db.add(admin)
    db.commit()
    db.refresh(admin)

    print("Admin user created successfully!")
    print(f"Email: {admin_email}")

finally:
    db.close()