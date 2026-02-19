from datetime import datetime
from typing import Any

from pydantic import BaseModel, ConfigDict


class CityOut(BaseModel):
    id: str
    name: str
    region: str
    population_m: float
    lines: int
    stations: int
    daily_ridership_m: float
    on_time_rate: float
    safety_index: float
    sustainability_score: float
    overall_index: float
    module_scores: dict[str, int]
    signals: dict[str, Any]

    model_config = ConfigDict(from_attributes=True)


class CityList(BaseModel):
    items: list[CityOut]


class ModuleOut(BaseModel):
    id: str
    name: str
    description: str
    key_fields: list[str]

    model_config = ConfigDict(from_attributes=True)


class ModuleList(BaseModel):
    items: list[ModuleOut]


class ScenarioOut(BaseModel):
    id: str
    name: str
    description: str
    drivers: list[str]

    model_config = ConfigDict(from_attributes=True)


class ScenarioList(BaseModel):
    items: list[ScenarioOut]


class ReportOut(BaseModel):
    id: str
    title: str
    city: str
    focus: str
    status: str
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)


class ReportList(BaseModel):
    items: list[ReportOut]


class UpdateLogOut(BaseModel):
    id: str
    timestamp: datetime
    source: str
    summary: str
    status: str

    model_config = ConfigDict(from_attributes=True)


class UpdateLogList(BaseModel):
    items: list[UpdateLogOut]


class CityBasicOut(BaseModel):
    city_id: str
    city_name: str
    region: str
    gdp_billion: float | None
    population_10k: float | None
    fiscal_revenue_billion: float | None
    rail_invest_billion: float | None
    rail_mileage_km: float | None
    lines_open: int | None
    lines_under_construction: int | None
    daily_ridership_10k: float | None
    passenger_intensity: float | None
    modal_share: float | None
    operator_name: str | None
    subsidy_billion: float | None
    data_status: str

    model_config = ConfigDict(from_attributes=True)


class CityBasicList(BaseModel):
    items: list[CityBasicOut]


class ScenarioMatrix(BaseModel):
    rows: list[str]
    columns: list[str]
    cells: list[list[int]]
