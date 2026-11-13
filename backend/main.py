from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import visitors

app = FastAPI(title="FrontDesk API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(visitors.router)


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}
