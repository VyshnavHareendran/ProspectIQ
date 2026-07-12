# This file converts a Business object into the features expected by the model.
# This creates the exact DataFrame structure expected by the trained pipeline. Some values (like digital_signal_count) are approximated because your Business model doesn't have Yelp's attributes field. Once you collect richer business metadata, this builder can be improved without changing the rest of the prediction flow.

import math
import pandas as pd


class FeatureBuilder:
    FEATURE_COLUMNS = [
        "digital_maturity_score",
        "has_hours",
        "num_days_open",
        "digital_signal_count",
        "num_attributes",
        "review_count_log",
        "stars",
        "satisfaction_score",
        "popularity_score",
        "category_grouped",
        "state",
    ]

    @staticmethod
    def build(
        business
    ):

        # ---------- Hours ----------

        has_hours = (
            1 if business.business_hours else 0
        )

        num_days_open = 0

        if business.business_hours:

            try:

                num_days_open = len(
                    business.business_hours.split(",")
                )

            except Exception:

                num_days_open = 0

        # ---------- Digital Signals ----------

        digital_signal_count = 0

        if business.website_url:
            digital_signal_count += 1

        if business.email:
            digital_signal_count += 1

        if business.whatsapp_number:
            digital_signal_count += 1

        # ---------- Attributes ----------

        num_attributes = digital_signal_count

        # ---------- Reviews ----------

        review_count = business.review_count or 0

        review_count_log = math.log1p(review_count)

        # ---------- Rating ----------

        stars = business.google_rating if business.google_rating is not None else 0

        satisfaction_score = (
            stars / 5
        )

        popularity_score = min(

            review_count_log / 10,

            1

        )

        # ---------- Digital Maturity ----------

        digital_maturity_score = round(

            (
                0.4 * has_hours +

                0.3 * (
                    num_days_open / 7
                ) +

                0.3 * (
                    digital_signal_count / 3
                )

            ),

            3

        )

        # ---------- Category ----------

        category_grouped = (
            business.category
            if business.category
            else "Other"
        )

        # ---------- State ----------

        state = business.state or "Unknown"

        features = pd.DataFrame([{

            "digital_maturity_score":
                digital_maturity_score,

            "has_hours":
                has_hours,

            "num_days_open":
                num_days_open,

            "digital_signal_count":
                digital_signal_count,

            "num_attributes":
                num_attributes,

            "review_count_log":
                review_count_log,

            "stars":
                stars,

            "satisfaction_score":
                satisfaction_score,

            "popularity_score":
                popularity_score,

            "category_grouped":
                category_grouped,

            "state":
                state

        }])

        return features[FeatureBuilder.FEATURE_COLUMNS]

    @staticmethod
    def validate_against_model(features, preprocessor):

        # ColumnTransformer remembers the original input column names
        expected_columns = list(
            getattr(
                preprocessor,
                "feature_names_in_",
                FeatureBuilder.FEATURE_COLUMNS
            )
        )

        actual_columns = list(features.columns)

        return {

            "expected_columns": expected_columns,

            "actual_columns": actual_columns,

            "missing_columns": [

                column

                for column in expected_columns

                if column not in actual_columns

            ],

            "extra_columns": [

                column

                for column in actual_columns

                if column not in expected_columns

            ],

            "order_matches":

                actual_columns == expected_columns,

            "dtypes": {

                column: str(dtype)

                for column, dtype in features.dtypes.items()

            }

        }