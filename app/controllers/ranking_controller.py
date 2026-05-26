from fastapi import APIRouter
from pydantic import BaseModel
from app.database.connection import get_db_connection

router = APIRouter()


class PlayerScore(BaseModel):
    name: str
    score: int


@router.post("/ranking")
def save_score(player: PlayerScore):
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute('''
        CREATE TABLE IF NOT EXISTS players (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            score INTEGER NOT NULL
        )
    ''')

    cursor.execute(
        "INSERT INTO players (name, score) VALUES (?, ?)",
        (player.name, player.score)
    )
    conn.commit()
    conn.close()
    return {"message": "Score saved successfully!"}


@router.get("/ranking/top5")
def get_top5():
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute('''
        CREATE TABLE IF NOT EXISTS players (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            score INTEGER NOT NULL
        )
    ''')

    cursor.execute(
        "SELECT name, score FROM players ORDER BY score DESC LIMIT 5"
    )
    rows = cursor.fetchall()
    conn.close()

    top5 = [{"name": row["name"], "score": row["score"]} for row in rows]
    return {"top5": top5}


@router.delete("/ranking/reset")
def reset_ranking():
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute('''
        CREATE TABLE IF NOT EXISTS players (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            score INTEGER NOT NULL
        )
    ''')

    cursor.execute("DELETE FROM players")
    conn.commit()
    conn.close()
    return {"message": "Ranking reset successfully!"}
