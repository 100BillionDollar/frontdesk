# AGENTS.md — FrontDesk project ke working rules

Yeh file **har AI coding assistant** ke liye instructions hai — Claude Code, GitHub Copilot, Google Antigravity, Cursor, ya koi bhi aur tool. Har session mein inhe follow karna hai.

## Sabse important rule — Guide Mode (default)

**Development USER khud karega. AI assistant by default sirf GUIDE karega — koi code ya logic nahi likhega.**

- Jab user kuch banane ko kahe, toh assistant **clear aur simple steps** mein batayega ki kya karna hai — kaunsi file, kaunsa concept, kis order mein.
- Har guidance ke saath **Hinglish mein explanation** dena: *yeh kyun kar rahe hain* aur *iske alawa kya alternatives the* (aur unhe kyun nahi chuna).
- Assistant code tabhi likhega jab user **explicitly bole** — jaise "tum karo", "you do it", "tum likh do". Us case mein normal full development allowed hai.
- Guide mode mein assistant **read-only checks chala sakta hai** — tests, lint, typecheck, logs, server status — taaki diagnose karke sahi guidance de sake. Lekin files edit nahi karega (na code, na config).
- **Doubt ho toh pehle sawaal poochho**, changes baad mein. Assumptions pe kaam mat karo.
- Chat explanations hamesha **Hinglish** mein, beginner-friendly tone mein (user FastAPI/backend seekh raha hai).

## Project kya hai

FrontDesk — solo service professionals (doctor, physio, salon, tutor, CA) ke liye booking + WhatsApp reminders + UPI payment links. Poora PRD [REQUIREMENTS.md](REQUIREMENTS.md) mein hai — koi bhi feature guide karne se pehle PRD ka relevant section check karo (scope, build order, out-of-scope cheezein).

## Repo structure

```
frontend/   React 19 + Vite + TypeScript PWA (RTK Query, oxlint, prettier, vitest)
backend/    FastAPI + SQLAlchemy + Alembic + PostgreSQL (ruff, mypy, pytest)
```

## Backend — process aur standards

**Layered architecture — har request isi raaste se jaye:**

```
app/routers/  →  services/  →  db/ (models + database)
     ↑ sirf HTTP handling    ↑ business logic    ↑ data access
schemas/  →  Pydantic models (request/response validation)
```

- **Routers patle rakho** — sirf request receive karo, service call karo, response do. Business logic routers mein nahi.
- **Business logic services mein** — taaki test karna easy ho aur router/DB se decouple rahe.
- **Schemas (Pydantic) hi API ka contract hain** — DB models kabhi directly response mein mat bhejo. Input/output dono ke alag schemas banao.
- **Type hints mandatory** — mypy strict settings on hain (`disallow_untyped_defs`). Har function typed ho.
- **DB changes = Alembic migration** — model badla toh `makemigration` + `migrate`. Database mein manually schema change kabhi nahi. Auto-generated migration ko review karke hi apply karo.
- **Secrets sirf `.env` mein** — code mein kabhi nahi. `.env.example` ko updated rakho (bina real values ke).
- **Local services Docker se** — PostgreSQL docker compose se chalta hai, native install nahi.

**Backend commands (backend/ folder se, venv activate karke):**

| Command | Kya karta hai |
|---|---|
| `task dev` | FastAPI dev server (auto-reload) |
| `task db` / `task db-stop` | Postgres container start/stop |
| `task lint` / `task fix` | Ruff check / auto-fix + format |
| `task typecheck` | mypy |
| `task test` | pytest |
| `task makemigration "msg"` / `task migrate` | Migration banao / apply karo |

**Definition of done (backend):** `task lint` + `task typecheck` + `task test` teeno pass — tabhi kaam complete maana jayega.

## Frontend — process aur standards

**Feature-based structure:**

```
src/features/<feature>/   feature ka code (api slice, types, components)
src/app/                  store, typed hooks (useAppSelector/useAppDispatch)
src/services/api.ts       RTK Query base API
```

- **Server state = RTK Query** — API data ke liye `useState` + `fetch`/`useEffect` mat use karo. Har feature ka api slice `src/services/api.ts` ke base API ko `injectEndpoints` se extend kare.
- **Typed hooks use karo** — `useAppSelector`/`useAppDispatch` from `src/app/hooks.ts`, plain `useSelector`/`useDispatch` nahi.
- **Types alag file mein** — API request/response types `features/<feature>/types.ts` mein, backend schemas se match karte hue.
- **Components chhote aur focused** — ek component ek kaam. Logic bada ho toh custom hook mein nikalo.
- **Env vars `VITE_` prefix se** — aur `.env.example` updated rakho.
- **Mobile-first socho** — yeh PWA hai, primary users phone pe honge.

**Frontend commands (frontend/ folder se):**

| Command | Kya karta hai |
|---|---|
| `npm run dev` | Vite dev server |
| `npm run lint` / `npm run format` | oxlint / prettier |
| `npm run typecheck` | tsc |
| `npm run test` | vitest (single run) |
| `npm run build` | Production build |

**Definition of done (frontend):** `lint` + `typecheck` + `test` pass. Husky pre-commit hook lint-staged chalata hai — use bypass (`--no-verify`) kabhi mat karo.

## Testing approach

- **Backend:** pytest, tests `backend/tests/` mein. Har naye endpoint/service ke liye test likhna process ka hissa hai — happy path + kam se kam ek error case.
- **Frontend:** vitest + React Testing Library. User ke nazariye se test karo (kya dikhta hai, kya click hota hai) — implementation details mat test karo.

## Git practices

- **Chhote, focused commits** — ek commit ek logical change.
- **Commit message format:** `<area>: <kya kiya>` — jaise `backend: add booking slot model` ya `frontend: add visitor list page`. Imperative mood, lowercase.
- **Commit/push sirf tab jab user bole.**
- `main` pe direct kaam chal raha hai abhi; branches tab banao jab user kahe.

## Naya feature banane ka standard order

Jab user koi naya feature start kare, is order mein guide karo:

1. **PRD check** — scope aur requirements confirm karo
2. **Backend:** DB model → migration → Pydantic schemas → service → router → tests
3. **Frontend:** types → RTK Query endpoints → component/page → tests
4. **Verify:** dono taraf ke checks (lint + typecheck + test) pass

Yeh order isliye hai: data model pehle finalize hota hai toh API contract stable rehta hai, aur frontend ko baar-baar change nahi karna padta.
