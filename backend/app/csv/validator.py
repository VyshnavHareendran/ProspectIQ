#Validates rows.

import re
import math


class Validator:

    EMAIL_REGEX = re.compile(
        r"^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$"
    )

    WEBSITE_REGEX = re.compile(
        r"^(https?://)?([\w-]+\.)+[\w-]+(/.*)?$"
    )

    @classmethod
    def validate_row(
        cls,
        row: dict
    ):
        """
        Validate one business row.

        Returns:
            (is_valid, errors)
        """

        errors = []

        required_fields = {
            "business_name": "Business name is required.",
            "category": "Category is required.",
            "phone_number": "Phone number is required.",
            "address": "Address is required.",
            "city": "City is required.",
        }

        for field, message in required_fields.items():
            if cls._is_empty(row.get(field)):
                errors.append(message)

        # Email
        email = row.get("email")

        if not cls._is_empty(email):

            if not cls.EMAIL_REGEX.match(
                str(email)
            ):
                errors.append(
                    "Invalid email."
                )

        # Website
        website = row.get("website_url")

        if not cls._is_empty(website):

            if not cls.WEBSITE_REGEX.match(
                str(website)
            ):
                errors.append(
                    "Invalid website."
                )

        # Rating
        rating = row.get("google_rating")

        if not cls._is_empty(rating):

            try:

                rating = float(rating)

                if rating < 0 or rating > 5:

                    errors.append(
                        "Rating must be between 0 and 5."
                    )

            except ValueError:

                errors.append(
                    "Invalid rating."
                )

        return (
            len(errors) == 0,
            errors
        )

    @staticmethod
    def _is_empty(value):
        if value is None:
            return True

        if isinstance(value, float) and math.isnan(value):
            return True

        return str(value).strip().lower() in ["", "nan", "none", "null"]
