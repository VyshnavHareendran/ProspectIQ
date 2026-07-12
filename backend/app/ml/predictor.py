from app.ml.model_loader import ModelLoader
from app.ml.feature_builder import FeatureBuilder


class Predictor:

    @staticmethod
    def predict(business):

        # Load preprocessor and model
        preprocessor, model = ModelLoader.load()

        # Build feature DataFrame
        features = FeatureBuilder.build(
            business
        )

        # Validate feature contract
        validation = FeatureBuilder.validate_against_model(
            features,
            preprocessor
        )

        if validation["missing_columns"] or validation["extra_columns"]:

            raise ValueError(
                "Lead scoring feature contract mismatch: "
                f"{validation}"
            )

        if not validation["order_matches"]:

            features = features[
                validation["expected_columns"]
            ]

        # Transform using sklearn preprocessor
        transformed_features = preprocessor.transform(
            features
        )

        # Predict using XGBoost model
        probability = model.predict_proba(
            transformed_features
        )[0][1]

        score = float(
            round(
                float(probability) * 100,
                2
            )
        )

        if score >= 80:

            priority = "HIGH"

        elif score >= 50:

            priority = "MEDIUM"

        else:

            priority = "LOW"

        return {

            "lead_score": float(score),

            "priority": priority,

            "probability": float(probability)

        }