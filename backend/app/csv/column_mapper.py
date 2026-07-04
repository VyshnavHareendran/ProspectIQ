# Maps CSV headers to database fields.

class ColumnMapper:

    COLUMN_MAPPING = {

        "business_name": [
            "Business Name",
            "Business",
            "Company",
            "Company Name",
            "Shop Name"
        ],

        "category": [
            "Category",
            "Business Category",
            "Type"
        ],

        "phone_number": [
            "Phone",
            "Phone Number",
            "Mobile",
            "Mobile Number",
            "Contact Number"
        ],

        "whatsapp_number": [
            "WhatsApp",
            "WhatsApp Number"
        ],

        "email": [
            "Email",
            "Email Address",
            "Mail"
        ],

        "website_url": [
            "Website",
            "Website URL",
            "Website Link"
        ],

        "address": [
            "Address",
            "Location"
        ],

        "city": [
            "City",
            "Town"
        ],

        "google_maps_link": [
            "Google Maps",
            "Google Maps Link",
            "Map Link"
        ],

        "google_rating": [
            "Rating",
            "Google Rating",
            "Google Score"
        ],

        "review_count": [
            "Reviews",
            "Review Count",
            "Number of Reviews"
        ],

        "business_hours": [
            "Business Hours",
            "Working Hours",
            "Opening Hours"
        ],

        "remarks": [
            "Remarks",
            "Notes"
        ]
    }

    @classmethod
    def suggest_mapping(
        cls,
        csv_columns: list[str]
    ):

        mapping = {}

        unmapped = []

        for column in csv_columns:

            matched = False

            normalized = column.strip().lower()

            for db_field, aliases in cls.COLUMN_MAPPING.items():

                alias_list = [
                    alias.lower()
                    for alias in aliases
                ]

                if normalized in alias_list:

                    mapping[column] = db_field

                    matched = True

                    break

            if not matched:

                unmapped.append(column)

        return {
            "suggested_mapping": mapping,
            "unmapped_columns": unmapped
        }

    @staticmethod
    def apply_mapping(
        dataframe,
        mapping: dict
    ):
        """
        Rename CSV columns using the
        mapping confirmed by the frontend.
        """

        dataframe = dataframe.rename(
            columns=mapping
        )

        return dataframe