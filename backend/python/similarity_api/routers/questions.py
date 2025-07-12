from fastapi import APIRouter
from models.schemas import Question, QuestionQuery
from services.embedding import get_embedding
from services.pinecone_service import store_question_vector, search_similar_vectors
from services.postgres_service import store_question_pg, fetch_questions_by_ids
import uuid

router = APIRouter()

@router.post("/ask")
def ask_question(q: Question):
    q_id = q.id or str(uuid.uuid4())
    emb = get_embedding(q.title + " " + q.description)
    store_question_vector(q_id, emb, {"title": q.title, "tags": q.tags})
    store_question_pg(q_id, q.title, q.description, q.tags)
    return {"status": "success", "id": q_id}

@router.post("/similar")
def get_similar(q: QuestionQuery):
    emb = get_embedding(q.query)
    results = search_similar_vectors(emb)

    if not results:
        return {"message": "No similar questions found.", "matches": []}

    ids = [r['id'] for r in results]
    return fetch_questions_by_ids(ids)


@router.post("/ask")
def ask_question(q: Question):
    print("RECEIVED:", q)
    ...

