import psycopg2
from dotenv import load_dotenv
import os

load_dotenv()



conn = psycopg2.connect(
    host=os.getenv("PG_HOST"),
    dbname=os.getenv("PG_DB"),
    user=os.getenv("PG_USER"),
    password=os.getenv("PG_PASSWORD")
)
cursor = conn.cursor()

def store_question_pg(q_id: str, title: str, description: str, tags: list):
    try:
        cursor.execute("""
            INSERT INTO questions (id, title, description, tags)
            VALUES (%s, %s, %s, %s)
        """, (q_id, title, description, tags))
        conn.commit()
    except Exception as e:
        print("Error inserting into PostgreSQL:", e)
        conn.rollback()  # Important to reset failed transaction


def fetch_questions_by_ids(ids: list):
    sql = "SELECT id, title, description, tags FROM questions WHERE id = ANY(%s);"
    cursor.execute(sql, (ids,))
    rows = cursor.fetchall()
    return [
        {"id": r[0], "title": r[1], "description": r[2], "tags": r[3]}
        for r in rows
    ]
