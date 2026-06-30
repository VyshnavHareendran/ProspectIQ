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

db = SessionLocal()

existing_admin = (
    db.query(User)
    .filter(User.email == "admin@prospectiq.com")
    .first()
)

if existing_admin:
    print("Admin already exists.")
    db.close()
    exit()

admin = User(
    full_name="System Administrator",
    email="admin@prospectiq.com",
    password_hash=hash_password("Admin@123"),
    role="Admin"
)

db.add(admin)
db.commit()
db.refresh(admin)

db.close()

print("Admin user created successfully!")
print("Email: admin@prospectiq.com")
print("Password: Admin@123")