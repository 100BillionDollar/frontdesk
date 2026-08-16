from app.routers import visitors
from db import models  # noqa: F401
from db.database import Base, engine
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="FrontDesk API")

# Dev-only: DB me tables auto-create ho jayengi. Production me Alembic use karein.
Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(visitors.router)


@app.get("/health")
def health():
    return {"status": "ok"}
