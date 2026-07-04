from app.database import SessionLocal
from app.models.user import User
from app.repositories.user_repository import UserRepository
from app.core.security import hash_password

ADMIN_NAME = "Administrator"
ADMIN_EMAIL = "admin@prospectiq.com"
ADMIN_PASSWORD = "Admin@123"
ADMIN_ROLE = "ADMIN"


def seed_admin():

    db = SessionLocal()

    try:

        user_repository = UserRepository(db)

        existing_user = user_repository.get_by_email(
            ADMIN_EMAIL
        )

        if existing_user:

            print("Admin user already exists.")
            return

        admin = User(
            full_name=ADMIN_NAME,
            email=ADMIN_EMAIL,
            password_hash=hash_password(
                ADMIN_PASSWORD
            ),
            role=ADMIN_ROLE
        )

        user_repository.create(admin)

        print("===================================")
        print("Admin user created successfully.")
        print("===================================")
        print(f"Email    : {ADMIN_EMAIL}")
        print(f"Password : {ADMIN_PASSWORD}")

    finally:
        db.close()


if __name__ == "__main__":
    seed_admin()