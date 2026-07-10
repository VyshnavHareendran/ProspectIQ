import joblib

MODEL_PATH = "app/ml/lead_scoring_model_yelp.joblib"

model = joblib.load(MODEL_PATH)

print("=" * 60)

print("MODEL TYPE")
print(type(model))

print("=" * 60)

print("HAS PREDICT")
print(hasattr(model, "predict"))

print("=" * 60)

print("HAS PREDICT_PROBA")
print(hasattr(model, "predict_proba"))

print("=" * 60)

print("FEATURES")

if hasattr(model, "feature_names_in_"):
    for feature in model.feature_names_in_:
        print(feature)

print("=" * 60)
