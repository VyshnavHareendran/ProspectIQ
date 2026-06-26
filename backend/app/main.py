from fastapi import FastAPI
from app.routes.business_routes import router

app = FastAPI(title="ProspectIQ")

app.include_router(router)

@app.get("/")
def home():
    return {
        "message": "ProspectIQ Backend Running"
    }