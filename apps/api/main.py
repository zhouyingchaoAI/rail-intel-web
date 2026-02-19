from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from data import CITIES, DASHBOARD_SUMMARY, MODULES, REPORTS, SCENARIOS, SCENARIO_MATRIX, UPDATE_LOGS
from database import SessionLocal
from models import City, Module, Report, Scenario, ScenarioMatrixCell, UpdateLog
from schemas import (
    CityList,
    CityOut,
    ModuleList,
    ModuleOut,
    ReportList,
    ScenarioList,
    ScenarioMatrix,
    UpdateLogList,
)
from seed_db import seed_if_needed

app = FastAPI(title="National Rail Transit Scenario Intelligence API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_db() -> Session:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.on_event("startup")
def startup() -> None:
    seed_if_needed()


@app.get("/health")
async def health():
    return {"status": "ok"}


@app.get("/dashboard")
async def dashboard():
    return DASHBOARD_SUMMARY


@app.get("/cities", response_model=CityList)
async def cities(db: Session = Depends(get_db)):
    items = db.query(City).order_by(City.sort_order).all()
    if not items:
        return {"items": [CityOut.model_validate(city) for city in CITIES]}
    return {"items": items}


@app.get("/cities/{city_id}")
async def city_detail(city_id: str, db: Session = Depends(get_db)):
    city = db.get(City, city_id)
    if city:
        return CityOut.model_validate(city)
    for fallback in CITIES:
        if fallback["id"] == city_id:
            return fallback
    return {"error": "City not found"}


@app.get("/modules", response_model=ModuleList)
async def modules(db: Session = Depends(get_db)):
    items = db.query(Module).order_by(Module.sort_order).all()
    if not items:
        return {"items": [ModuleOut.model_validate(module) for module in MODULES]}
    return {"items": items}


@app.get("/modules/{module_id}")
async def module_detail(module_id: str, db: Session = Depends(get_db)):
    module = db.get(Module, module_id)
    if module:
        return ModuleOut.model_validate(module)
    for fallback in MODULES:
        if fallback["id"] == module_id:
            return fallback
    return {"error": "Module not found"}


@app.get("/scenarios", response_model=ScenarioList)
async def scenarios(db: Session = Depends(get_db)):
    items = db.query(Scenario).order_by(Scenario.sort_order).all()
    if not items:
        return {"items": SCENARIOS}
    return {"items": items}


@app.get("/matrix", response_model=ScenarioMatrix)
async def matrix(db: Session = Depends(get_db)):
    scenarios = db.query(Scenario).order_by(Scenario.sort_order).all()
    modules = db.query(Module).order_by(Module.sort_order).all()
    if not scenarios or not modules:
        return SCENARIO_MATRIX

    cell_values = {
        (cell.scenario_id, cell.module_id): cell.value
        for cell in db.query(ScenarioMatrixCell).all()
    }

    rows = [scenario.name for scenario in scenarios]
    columns = [module.name for module in modules]
    cells = [
        [cell_values.get((scenario.id, module.id), 0) for module in modules]
        for scenario in scenarios
    ]
    return {"rows": rows, "columns": columns, "cells": cells}


@app.get("/reports", response_model=ReportList)
async def reports(db: Session = Depends(get_db)):
    items = db.query(Report).order_by(Report.sort_order).all()
    if not items:
        return {"items": REPORTS}
    return {"items": items}


@app.get("/logs", response_model=UpdateLogList)
async def logs(db: Session = Depends(get_db)):
    items = db.query(UpdateLog).order_by(UpdateLog.sort_order).all()
    if not items:
        return {"items": UPDATE_LOGS}
    return {"items": items}
