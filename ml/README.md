# 🤖 Machine Learning Module

This folder contains the Machine Learning component of the **AI-Powered Lead Generation & Daily Cold Call Recommendation System**.

The ML module is responsible for analyzing business information and generating lead scores that help prioritize businesses with the highest conversion potential. These predictions are consumed by the backend and displayed in the frontend application.

---

## 📌 Objective

The goal of this module is to rank businesses based on their likelihood of becoming valuable sales leads, enabling sales teams to focus on high-priority prospects.

---

## 🧠 ML Workflow

```
Business Data
      │
      ▼
Data Cleaning & Preprocessing
      │
      ▼
Feature Engineering
      │
      ▼
Lead Scoring Model
      │
      ▼
Prediction Probability
      │
      ▼
Priority Ranking
      │
      ▼
Daily Cold Call Recommendations
```

---

## 📂 Folder Structure

```
ml/
│── yelp_lead_scoring.ipynb        # Model development notebook
│── lead_scoring_model_yelp.joblib # Trained model
│── daily_call_list_yelp.csv       # Sample prediction output
│── feature_importance_yelp.png    # Feature importance visualization
│── model_comparison_yelp.json     # Model evaluation results
└── README.md
```

---

## 📂 Dataset

The dataset is not included in this repository because of its size.

You can download it from Google Drive:

**Dataset:** [Google Drive Folder](https://drive.google.com/drive/folders/1aB1j7A9skLgp2fodD8ODpbWIil725zLA?usp=sharing)

 **Note:** After downloading, update the dataset path in the notebook before running the project.

## ⚙️ Features Used

The lead scoring model uses business-related information such as:

- ⭐ Business Rating
- 📝 Review Count
- 🌐 Website Availability
- 📱 Social Media Presence
- 🏢 Industry Category

These features are transformed into model inputs to predict the conversion potential of each business.

---

## 🛠 Technologies

- Python
- Pandas
- NumPy
- Scikit-learn
- Matplotlib
- Joblib
- Jupyter Notebook

---

## 🚀 Pipeline

1. Load business dataset
2. Clean and preprocess data
3. Perform feature engineering
4. Train and evaluate machine learning models
5. Select the best-performing model
6. Generate lead scores
7. Rank businesses based on prediction scores
8. Export prioritized leads for the application

---

## 📊 Outputs

- Trained Machine Learning model
- Lead score predictions
- Ranked daily call list
- Model evaluation metrics
- Feature importance visualization

---

## 🔗 Integration

This module is designed to integrate with the backend service.

The backend:
- Loads the trained model
- Sends business data for prediction
- Receives lead scores
- Stores predictions in the database
- Serves ranked recommendations to the frontend

---


## 👨‍💻 Developed By

**Deepeshkumar K**

---

> **Note:** This folder contains only the Machine Learning implementation. The complete project also includes separate frontend and backend modules maintained by the project team.
