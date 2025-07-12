from fastapi import FastAPI
from routers import questions

app = FastAPI()
app.include_router(questions.router, prefix="/questions")

@app.get("/")
def root():
    return {"msg": "StackIt Similar Questions API is running."}
