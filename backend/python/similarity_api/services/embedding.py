from langchain_google_genai import GoogleGenerativeAIEmbeddings
import os
from dotenv import load_dotenv

load_dotenv()

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

embedding_model = GoogleGenerativeAIEmbeddings(model="models/text-embedding-004", google_api_key=  "AIzaSyC1f1ayYLVUDw0eCPFHD7Emz3XmXen3Jtc")

def get_embedding(text: str) -> list:
    return embedding_model.embed_query(text)


if __name__== "__main__":
    user_input = input("write some input")
    get_embedding(user_input)
