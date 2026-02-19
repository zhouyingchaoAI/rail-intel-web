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
uvicorn main:app --reload --port 8000
```

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
