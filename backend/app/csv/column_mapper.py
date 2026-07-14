# Maps CSV headers to database fields.

class ColumnMapper:

    COLUMN_MAPPING = {

        "business_name": [
            "business_name",
            "Business Name",
            "Business",
            "Company",
            "Company Name",
            "Shop Name",
            "Name",
            "name"
        ],

        "category": [
            "category",
            "Category",
            "Business Category",
            "Type",
            "category_grouped"
        ],

        "phone_number": [
            "phone_number",
            "phone",
            "Phone",
            "Phone Number",
            "Mobile",
            "Mobile Number",
            "Contact Number"
        ],

        "whatsapp_number": [
            "whatsapp_number",
            "WhatsApp",
            "WhatsApp Number"
        ],

        "email": [
            "email",
            "Email",
            "Email Address",
            "Mail"
        ],

        "website_url": [
            "website_url",
            "website",
            "Website",
            "Website URL",
            "Website Link"
        ],

        "address": [
            "address",
            "Address",
            "Location",
            "full_address"
        ],

        "city": [
            "city",
            "City",
            "Town"
        ],

        "state": [
            "state",
            "State",
            "Province",
            "Region"
        ],

        "google_maps_link": [
            "google_maps_link",
            "Google Maps",
            "Google Maps Link",
            "Map Link"
        ],

        "google_rating": [
            "google_rating",
            "stars",
            "rating",
            "Rating",
            "Google Rating",
            "Google Score"
        ],

        "review_count": [
            "review_count",
            "Reviews",
            "Review Count",
            "Number of Reviews"
        ],

        "business_hours": [
            "business_hours",
            "Business Hours",
            "Working Hours",
            "Opening Hours"
        ],

        "remarks": [
            "remarks",
            "Remarks",
            "Notes"
        ],

        "description": [
            "description",
            "Description",
            "About"
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
        Rename CSV columns using the mapping confirmed by the frontend.
        Accepts either CSV column -> database field or
        database field -> CSV column for compatibility with older UI code.
        """

        dataframe_columns = set(dataframe.columns)

        source_matches = sum(
            1
            for source in mapping
            if source in dataframe_columns
        )
        value_matches = sum(
            1
            for target in mapping.values()
            if target in dataframe_columns
        )

        if value_matches > source_matches:
            csv_to_field_mapping = {
                csv_column: db_field
                for db_field, csv_column in mapping.items()
                if csv_column in dataframe_columns
            }
        else:
            csv_to_field_mapping = {
                source: target
                for source, target in mapping.items()
                if source in dataframe_columns
            }

        dataframe = dataframe.rename(
            columns=csv_to_field_mapping
        )

        return dataframe
