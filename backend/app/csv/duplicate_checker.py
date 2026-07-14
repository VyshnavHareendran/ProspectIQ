#Finds duplicates.

class DuplicateChecker:

    @staticmethod
    def remove_csv_duplicates(valid_rows):
        """
        Removes duplicate businesses
        within the uploaded CSV.
        """

        unique_rows = []

        duplicate_rows = []

        seen = set()

        for row in valid_rows:

            if DuplicateChecker._has_value(row.get("google_maps_link")):

                key = (
                    "MAP",
                    str(row["google_maps_link"]).strip().lower()
                )

            elif DuplicateChecker._has_value(row.get("email")):

                key = (
                    "EMAIL",
                    str(row["business_name"]).strip().lower(),
                    str(row["email"]).strip().lower()
                )

            else:

                key = (
                    "PHONE",
                    str(row["business_name"]).strip().lower(),
                    str(row["phone_number"]).strip()
                )

            if key in seen:

                duplicate_rows.append(row)

            else:

                seen.add(key)

                unique_rows.append(row)

        return unique_rows, duplicate_rows

    @staticmethod
    def _has_value(value):
        return (
            value is not None
            and str(value).strip().lower() not in ["", "nan", "none", "null"]
        )
