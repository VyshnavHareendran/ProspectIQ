from pathlib import Path

import joblib
import xgboost as xgb


class ModelLoader:

    _preprocessor = None
    _model = None

    @classmethod
    def load(cls):

        base_path = Path(__file__).parent

        if cls._preprocessor is None:

            cls._preprocessor = joblib.load(
                base_path / "preprocessor.joblib"
            )

        if cls._model is None:

            cls._model = xgb.XGBClassifier()

            cls._model.load_model(
                base_path / "xgb_model.json"
            )

        return cls._preprocessor, cls._model