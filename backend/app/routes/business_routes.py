from fastapi import APIRouter

router = APIRouter()

@router.get("/businesses")
def get_businesses():
    return {
        "message": "Businesses API Working"
    }