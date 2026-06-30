from fastapi import FastAPI

from app.routes.auth import router as auth_router
from app.routes.business import router as business_router


app = FastAPI(
    title="ProspectIQ",
    version="1.0.0"
)

app.include_router(auth_router)
app.include_router(business_router)


@app.get("/")
def home():
    return {
        "message": "ProspectIQ Backend Running"
    }