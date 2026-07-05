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

            if row.get("google_maps_link"):

                key = (
                    "MAP",
                    row["google_maps_link"].strip().lower()
                )

            elif row.get("email"):

                key = (
                    "EMAIL",
                    row["business_name"].strip().lower(),
                    row["email"].strip().lower()
                )

            else:

                key = (
                    "PHONE",
                    row["business_name"].strip().lower(),
                    row["phone_number"].strip()
                )

            if key in seen:

                duplicate_rows.append(row)

            else:

                seen.add(key)

                unique_rows.append(row)

        return unique_rows, duplicate_rows