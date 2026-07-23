from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware

from app.routes import business_profile
from app.routes import employee_management

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

from app.routes.lead_assignment import router as lead_assignment_router
from app.routes.employee import (
    router as employee_router
)
from app.routes.settings import router as settings_router
from app.routes.employee_settings import router as employee_settings_router
from app.routes.daily_queue import router as daily_queue_router

from app.routes.employee_dashboard import (
    router as employee_dashboard_router
)
from app.routes import profile

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
app.include_router(employee_management.router)
app.include_router(business_router)
app.include_router(upload_router)
app.include_router(import_router)
app.include_router(dashboard_router)
app.include_router(call_log_router)
app.include_router(report_router)
app.include_router(lead_score_router)
app.include_router(lead_assignment_router)
app.include_router(employee_router)
app.include_router(business_profile.router)
app.include_router(settings_router)
app.include_router(employee_settings_router)
app.include_router(employee_dashboard_router)
app.include_router(daily_queue_router)
app.include_router(profile.router)

@app.get("/")
def home():
    return {
        "message": "ProspectIQ Backend Running"
    }
