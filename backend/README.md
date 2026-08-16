# FrontDesk Backend (FastAPI + PostgreSQL)

## Structure

```
backend/
├── main.py                  # FastAPI app entry point (server yahan se start hota hai)
├── app/
│   ├── config.py            # Settings — .env file se DATABASE_URL padhta hai
│   └── routers/
│       └── visitors.py      # API endpoints (URL routes)
├── db/
│   ├── database.py          # SQLAlchemy engine + session + Base
│   └── models.py            # Database tables (SQLAlchemy models)
├── schemas/
│   └── visitor.py           # Pydantic schemas (request/response validation)
├── services/
│   └── visitor_service.py   # Business logic (DB operations)
├── .env                     # Secrets/config (git me nahi jata)
└── requirements.txt         # Pinned dependencies
```

## Request flow

```
Client → main.py → app/routers → services → db/models → PostgreSQL
                        ↑ schemas (validation) ↑
```

1. Request `main.py` ke through aata hai, router match hota hai.
2. Router pe Pydantic schema request body validate karta hai.
3. Service function business logic chalata hai (DB session `Depends(get_db)` se milta hai).
4. SQLAlchemy model ke through PostgreSQL me data read/write hota hai.
5. Response schema (`VisitorOut`) data ko JSON me convert karke return karta hai.

## Run karne ke liye

Pehle venv activate karo (zaroori hai — taskipy PATH se commands uthata hai):

```powershell
cd backend
.\venv\Scripts\Activate.ps1
```

Phir taskipy shortcuts use karo (tasks `pyproject.toml` me defined hain):

```powershell
task db        # PostgreSQL container start
task dev       # FastAPI dev server (auto-reload)
task psql      # Postgres ka SQL shell
task db-stop   # PostgreSQL container band
task --list    # saare tasks dekho
```

- API docs: http://127.0.0.1:8000/docs
- Health check: http://127.0.0.1:8000/health

## Naya feature add karne ka flow

1. `db/models.py` me table/model banao
2. `schemas/` me Pydantic schemas banao
3. `services/` me business logic likho
4. `app/routers/` me endpoints banao
5. `main.py` me router include karo
