from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.controllers import quiz_controller, ranking_controller
from app.database.connection import get_db_connection

app = FastAPI(
    title="uTech Trivia API",
    description="API for the Trivia mini-game internship challenge.",
    version="1.0.0",

)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(quiz_controller.router, tags=["Quiz"])
app.include_router(ranking_controller.router, tags=["Ranking"])


@app.get("/")
def read_root():
    return {"message": "uTech Trivia API is running perfectly!"}
