# Rail-Intel Monorepo

Demo monorepo for the National Rail Transit Scenario Intelligence dashboard.

## Structure
- `apps/web`: Next.js (App Router) UI with Tailwind styling.
- `apps/api`: FastAPI service providing mock data.

## Local Development

### API
```bash
cd apps/api
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python seed_db.py
uvicorn main:app --reload --port 8000
```

The API uses a local SQLite database at `apps/api/rail_intel.db`. On startup it will auto-create tables and seed demo data if the database is empty. The `seed_db.py` script can be run manually to re-seed.
### Web
```bash
cd apps/web
npm install
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000 npm run dev
```

Open `http://localhost:3000`.

## Docker Compose
```bash
docker compose up --build
```

Web runs on `http://localhost:3000` and API on `http://localhost:8000`.
