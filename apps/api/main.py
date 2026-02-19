from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from data import CITIES, MODULES, SCENARIOS, SCENARIO_MATRIX, REPORTS, UPDATE_LOGS, DASHBOARD_SUMMARY

app = FastAPI(title="National Rail Transit Scenario Intelligence API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
async def health():
    return {"status": "ok"}


@app.get("/dashboard")
async def dashboard():
    return DASHBOARD_SUMMARY


@app.get("/cities")
async def cities():
    return {"items": CITIES}


@app.get("/cities/{city_id}")
async def city_detail(city_id: str):
    for city in CITIES:
        if city["id"] == city_id:
            return city
    return {"error": "City not found"}


@app.get("/modules")
async def modules():
    return {"items": MODULES}


@app.get("/modules/{module_id}")
async def module_detail(module_id: str):
    for module in MODULES:
        if module["id"] == module_id:
            return module
    return {"error": "Module not found"}


@app.get("/scenarios")
async def scenarios():
    return {"items": SCENARIOS}


@app.get("/matrix")
async def matrix():
    return SCENARIO_MATRIX


@app.get("/reports")
async def reports():
    return {"items": REPORTS}


@app.get("/logs")
async def logs():
    return {"items": UPDATE_LOGS}
