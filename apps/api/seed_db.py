from datetime import datetime

from sqlalchemy.orm import Session

from data import CITIES, CITY_BASICS, MODULES, REPORTS, SCENARIO_MATRIX, SCENARIOS, UPDATE_LOGS
from database import SessionLocal, engine
from models import City, CityBasic, Line, Module, Report, Scenario, ScenarioMatrixCell, Station, UpdateLog
from models import Base

LINES = [
    {
        "id": "metrovale-red",
        "city_id": "metrovale",
        "name": "Red Line",
        "code": "R1",
        "status": "Active",
        "length_km": 28.4,
        "stations": 22,
    },
    {
        "id": "metrovale-blue",
        "city_id": "metrovale",
        "name": "Blue Line",
        "code": "B2",
        "status": "Active",
        "length_km": 24.1,
        "stations": 19,
    },
    {
        "id": "rivergate-green",
        "city_id": "rivergate",
        "name": "Green Line",
        "code": "G1",
        "status": "Active",
        "length_km": 21.7,
        "stations": 16,
    },
    {
        "id": "northton-silver",
        "city_id": "northton",
        "name": "Silver Line",
        "code": "S3",
        "status": "Active",
        "length_km": 18.9,
        "stations": 14,
    },
    {
        "id": "sunridge-gold",
        "city_id": "sunridge",
        "name": "Gold Line",
        "code": "G5",
        "status": "Active",
        "length_km": 23.6,
        "stations": 18,
    },
    {
        "id": "coastport-teal",
        "city_id": "coastport",
        "name": "Teal Line",
        "code": "T2",
        "status": "Active",
        "length_km": 16.3,
        "stations": 12,
    },
]

STATIONS = [
    {
        "id": "metrovale-central",
        "city_id": "metrovale",
        "line_id": "metrovale-red",
        "name": "Central Hub",
        "ridership_k": 120.5,
        "accessibility_score": 92.0,
        "status": "Operational",
    },
    {
        "id": "metrovale-riverfront",
        "city_id": "metrovale",
        "line_id": "metrovale-blue",
        "name": "Riverfront",
        "ridership_k": 84.2,
        "accessibility_score": 88.5,
        "status": "Operational",
    },
    {
        "id": "rivergate-market",
        "city_id": "rivergate",
        "line_id": "rivergate-green",
        "name": "Market Square",
        "ridership_k": 73.4,
        "accessibility_score": 86.1,
        "status": "Operational",
    },
    {
        "id": "northton-lake",
        "city_id": "northton",
        "line_id": "northton-silver",
        "name": "Lakeview",
        "ridership_k": 61.3,
        "accessibility_score": 90.4,
        "status": "Operational",
    },
    {
        "id": "sunridge-heritage",
        "city_id": "sunridge",
        "line_id": "sunridge-gold",
        "name": "Heritage Park",
        "ridership_k": 68.9,
        "accessibility_score": 82.7,
        "status": "Operational",
    },
    {
        "id": "coastport-harbor",
        "city_id": "coastport",
        "line_id": "coastport-teal",
        "name": "Harbor Point",
        "ridership_k": 55.6,
        "accessibility_score": 89.2,
        "status": "Operational",
    },
]


def seed_database(session: Session) -> bool:
    has_city = session.query(City).first() is not None
    has_basics = session.query(CityBasic).first() is not None

    if has_city and has_basics:
        return False

    if not has_city:
        for index, module in enumerate(MODULES):
            session.add(
                Module(
                    id=module["id"],
                    name=module["name"],
                    description=module["description"],
                    key_fields=module["key_fields"],
                    sort_order=index,
                )
            )

        for index, scenario in enumerate(SCENARIOS):
            session.add(
                Scenario(
                    id=scenario["id"],
                    name=scenario["name"],
                    description=scenario["description"],
                    drivers=scenario["drivers"],
                    sort_order=index,
                )
            )

        for index, city in enumerate(CITIES):
            session.add(
                City(
                    id=city["id"],
                    name=city["name"],
                    region=city["region"],
                    population_m=city["population_m"],
                    lines=city["lines"],
                    stations=city["stations"],
                    daily_ridership_m=city["daily_ridership_m"],
                    on_time_rate=city["on_time_rate"],
                    safety_index=city["safety_index"],
                    sustainability_score=city["sustainability_score"],
                    overall_index=city["overall_index"],
                    module_scores=city["module_scores"],
                    signals=city["signals"],
                    sort_order=index,
                )
            )

        for index, report in enumerate(REPORTS):
            session.add(
                Report(
                    id=report["id"],
                    title=report["title"],
                    city=report["city"],
                    focus=report["focus"],
                    status=report["status"],
                    updated_at=datetime.fromisoformat(report["updated_at"].replace("Z", "+00:00")),
                    sort_order=index,
                )
            )

        for index, log in enumerate(UPDATE_LOGS):
            session.add(
                UpdateLog(
                    id=log["id"],
                    timestamp=datetime.fromisoformat(log["timestamp"].replace("Z", "+00:00")),
                    source=log["source"],
                    summary=log["summary"],
                    status=log["status"],
                    sort_order=index,
                )
            )

        for index, line in enumerate(LINES):
            session.add(
                Line(
                    id=line["id"],
                    city_id=line["city_id"],
                    name=line["name"],
                    code=line["code"],
                    status=line["status"],
                    length_km=line["length_km"],
                    stations=line["stations"],
                    sort_order=index,
                )
            )

        for index, station in enumerate(STATIONS):
            session.add(
                Station(
                    id=station["id"],
                    city_id=station["city_id"],
                    line_id=station["line_id"],
                    name=station["name"],
                    ridership_k=station["ridership_k"],
                    accessibility_score=station["accessibility_score"],
                    status=station["status"],
                    sort_order=index,
                )
            )

        scenario_by_name = {scenario["name"]: scenario["id"] for scenario in SCENARIOS}
        module_by_name = {module["name"]: module["id"] for module in MODULES}

        for row_index, scenario_name in enumerate(SCENARIO_MATRIX["rows"]):
            for col_index, module_name in enumerate(SCENARIO_MATRIX["columns"]):
                session.add(
                    ScenarioMatrixCell(
                        scenario_id=scenario_by_name[scenario_name],
                        module_id=module_by_name[module_name],
                        value=SCENARIO_MATRIX["cells"][row_index][col_index],
                    )
                )

    if not has_basics:
        for item in CITY_BASICS:
            session.add(
                CityBasic(
                    city_id=item["city_id"],
                    city_name=item["city_name"],
                    region=item["region"],
                    gdp_billion=item.get("gdp_billion"),
                    population_10k=item.get("population_10k"),
                    fiscal_revenue_billion=item.get("fiscal_revenue_billion"),
                    rail_invest_billion=item.get("rail_invest_billion"),
                    rail_mileage_km=item.get("rail_mileage_km"),
                    lines_open=item.get("lines_open"),
                    lines_under_construction=item.get("lines_under_construction"),
                    daily_ridership_10k=item.get("daily_ridership_10k"),
                    passenger_intensity=item.get("passenger_intensity"),
                    modal_share=item.get("modal_share"),
                    operator_name=item.get("operator_name"),
                    subsidy_billion=item.get("subsidy_billion"),
                    data_status=item.get("data_status", "待补充"),
                )
            )

    session.commit()
    return True


def seed_if_needed() -> bool:
    Base.metadata.create_all(bind=engine)
    with SessionLocal() as session:
        return seed_database(session)


if __name__ == "__main__":
    created = seed_if_needed()
    status = "Seeded database." if created else "Database already contains data."
    print(status)
