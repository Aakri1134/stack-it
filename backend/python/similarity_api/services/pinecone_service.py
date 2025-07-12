import os
from dotenv import load_dotenv
from pinecone import Pinecone, ServerlessSpec, CloudProvider, AwsRegion

load_dotenv()

# Get your API key and environment
API_KEY = "pcsk_6ERSDB_ACFdhXBRdh95o8qE3mZApWy61pYj1EXGjHhE59BWXXReX18kgUEBjzY8hbjvEmt "
ENV = os.getenv("PINECONE_ENVIRONMENT", "us-east1-gcp")
INDEX_NAME = os.getenv("PINECONE_INDEX", "stackit-questions")
DIMENSION = int(os.getenv("EMBED_DIM", "768"))

# Initialize Pinecone client
pc = Pinecone(api_key=API_KEY)

# Create index if not exists
if INDEX_NAME not in [idx.name for idx in pc.list_indexes().indexes]:
    pc.create_index(
        name=INDEX_NAME,
        dimension=DIMENSION,
        metric="cosine",
        spec=ServerlessSpec(cloud=CloudProvider.AWS, region=AwsRegion.US_EAST_1)
    )

# Connect to the index
index_config = pc.describe_index(name=INDEX_NAME)
index_host = index_config.host
index = pc.Index(host=index_host)

def store_question_vector(q_id: str, embedding: list, metadata: dict):
    index.upsert(vectors=[(q_id, embedding, metadata)])

def search_similar_vectors(query_embedding: list, top_k: int = 5):
    try:
        results = index.query(vector=query_embedding, top_k=top_k, include_metadata=True)
        return results.get('matches', [])  # Always return a list
    except Exception as e:
        print("Pinecone search error:", e)
        return []  # Avoid crashing the app


