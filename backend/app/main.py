from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from . import models, database, routers
from .database import engine

models.user.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Matrimony API", version="1.0.0")

# Set up CORS
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["Content-Type", "Authorization"],
)

app.include_router(routers.auth.router)
app.include_router(routers.users.router)

@app.get("/")
async def root():
    return {"message": "Welcome to the Matrimony API", "status": "online"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}
