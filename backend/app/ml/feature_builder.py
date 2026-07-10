# This file converts a Business object into the features expected by the model.
# This creates the exact DataFrame structure expected by the trained pipeline. Some values (like digital_signal_count) are approximated because your Business model doesn't have Yelp's attributes field. Once you collect richer business metadata, this builder can be improved without changing the rest of the prediction flow.

import math
import pandas as pd


class FeatureBuilder:

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

        review_count_log = math.log1p(
            business.review_count
        )

        # ---------- Rating ----------

        stars = business.google_rating

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

        return pd.DataFrame([{

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