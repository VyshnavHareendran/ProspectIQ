from fastapi import FastAPI

from app.routes.auth import router as auth_router
from app.routes.business import router as business_router

from fastapi.middleware.cors import CORSMiddleware

from app.routes.upload_history import router as upload_router
from app.routes.import_route import router as import_router

from app.routes.dashboard import router as dashboard_router

app = FastAPI(
    title="ProspectIQ",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(business_router)
app.include_router(upload_router)
app.include_router(import_router)
app.include_router(dashboard_router)

@app.get("/")
def home():
    return {
        "message": "ProspectIQ Backend Running"
    }