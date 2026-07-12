from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware

from app.routes.auth import router as auth_router
from app.routes.business import router as business_router

from app.routes.upload_history import router as upload_router
from app.routes.import_route import router as import_router

from app.routes.dashboard import router as dashboard_router
from app.routes.call_log import router as call_log_router

from app.routes.report import router as report_router

from app.routes.lead_score import (
    router as lead_score_router
)


app = FastAPI(
    title="ProspectIQ",
    version="1.0.0"
)

app.mount("/static", StaticFiles(directory="static"), name="static")


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
app.include_router(call_log_router)
app.include_router(report_router)
app.include_router(lead_score_router)

@app.get("/")
def home():
    return {
        "message": "ProspectIQ Backend Running"
    }