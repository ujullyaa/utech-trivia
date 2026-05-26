from fastapi import APIRouter, HTTPException
from app.services.quiz_service import quiz_service_instance

router = APIRouter()


@router.get("/quiz")
def get_quiz():
    questions = quiz_service_instance.get_questions()

    if isinstance(questions, dict) and "error" in questions:
        raise HTTPException(status_code=500, detail=questions["error"])

    return {"question": questions}
