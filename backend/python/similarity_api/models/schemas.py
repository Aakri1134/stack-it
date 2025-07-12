from pydantic import BaseModel
from typing import List

class Question(BaseModel):
    id: str
    title: str
    description: str
    tags: List[str]

class QuestionQuery(BaseModel):
    query: str