#Validates rows.

import re


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

        # Required business name
        if not row.get("business_name"):
            errors.append(
                "Business name is required."
            )

        # Email
        email = row.get("email")

        if email:

            if not cls.EMAIL_REGEX.match(
                str(email)
            ):
                errors.append(
                    "Invalid email."
                )

        # Website
        website = row.get("website_url")

        if website:

            if not cls.WEBSITE_REGEX.match(
                str(website)
            ):
                errors.append(
                    "Invalid website."
                )

        # Rating
        rating = row.get("google_rating")

        if rating not in [None, ""]:

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