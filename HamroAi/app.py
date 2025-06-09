import streamlit as st
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import KMeans
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, confusion_matrix
from xgboost import XGBClassifier
import joblib

st.set_page_config(page_title="Tender Evaluation AI", layout="wide")

st.title("🏗️ Tender Evaluation & Award Prediction System")

# File uploader
uploaded_file = st.file_uploader("Upload Tender CSV File", type=["csv"])

if uploaded_file is not None:
    df = pd.read_csv("government-procurement-via-gebiz.csv - Sheet1.csv")
    st.write("📄 **Data Preview:**")
    st.dataframe(df.head())

    # Drop rows with missing values
    df.dropna(inplace=True)

    features = [
        "Tender Amount", "Awarded Amount", "award_delay_days",
        "Award Year", "Award Month", "Tender to Award Ratio",
        "Agency_encoded", "Supplier Name_encoded"
    ]
    label = "Award_Success (Label)"

    if all(col in df.columns for col in features + [label]):
        X = df[features]
        y = df[label]

        # Scale features
        scaler = StandardScaler()
        X_scaled = scaler.fit_transform(X)

        # KMeans Clustering
        kmeans = KMeans(n_clusters=5, random_state=42)
        df["Cluster"] = kmeans.fit_predict(X_scaled)

        # Visualize Clusters
        st.subheader("📊 Tender Clustering")
        fig, ax = plt.subplots()
        sns.scatterplot(data=df, x="Tender Amount", y="Awarded Amount", hue="Cluster", palette="Set1", ax=ax)
        st.pyplot(fig)

        # Split and Train
        X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.2, random_state=42)

        model = XGBClassifier(
            n_estimators=100,
            learning_rate=0.1,
            max_depth=6,
            subsample=0.8,
            colsample_bytree=0.8,
            use_label_encoder=False,
            eval_metric="logloss",
            random_state=42
        )
        model.fit(X_train, y_train)

        # Prediction and Evaluation
        y_pred = model.predict(X_test)
        report = classification_report(y_test, y_pred, output_dict=True)
        matrix = confusion_matrix(y_test, y_pred)

        st.subheader("✅ Model Evaluation")
        st.text("Classification Report:")
        st.json(report)

        st.text("Confusion Matrix:")
        st.write(matrix)

        # Save model and scaler
        joblib.dump(model, "xgboost_model.pkl")
        joblib.dump(scaler, "scaler.pkl")
        joblib.dump(kmeans, "kmeans.pkl")

        st.success("✅ Model trained and saved successfully.")

        # Custom Prediction
        st.subheader("🔍 Try a Prediction")
        input_data = {}
        for col in features:
            input_data[col] = st.number_input(f"{col}", value=float(df[col].mean()))

        if st.button("Predict Award Success"):
            input_df = pd.DataFrame([input_data])
            input_scaled = scaler.transform(input_df)
            pred = model.predict(input_scaled)[0]
            st.write("🎯 **Prediction:**", "✅ Awarded" if pred == 1 else "❌ Not Awarded")
    else:
        st.error("Required columns missing from the uploaded CSV.")
