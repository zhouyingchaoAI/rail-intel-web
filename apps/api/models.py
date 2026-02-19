from datetime import datetime

from sqlalchemy import DateTime, Float, ForeignKey, Integer, JSON, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from database import Base


class City(Base):
    __tablename__ = "cities"

    id: Mapped[str] = mapped_column(String, primary_key=True)
    name: Mapped[str] = mapped_column(String, nullable=False)
    region: Mapped[str] = mapped_column(String, nullable=False)
    population_m: Mapped[float] = mapped_column(Float, nullable=False)
    lines: Mapped[int] = mapped_column(Integer, nullable=False)
    stations: Mapped[int] = mapped_column(Integer, nullable=False)
    daily_ridership_m: Mapped[float] = mapped_column(Float, nullable=False)
    on_time_rate: Mapped[float] = mapped_column(Float, nullable=False)
    safety_index: Mapped[float] = mapped_column(Float, nullable=False)
    sustainability_score: Mapped[float] = mapped_column(Float, nullable=False)
    overall_index: Mapped[float] = mapped_column(Float, nullable=False)
    module_scores: Mapped[dict] = mapped_column(JSON, nullable=False)
    signals: Mapped[dict] = mapped_column(JSON, nullable=False)
    sort_order: Mapped[int] = mapped_column(Integer, default=0, nullable=False)

    line_items: Mapped[list["Line"]] = relationship("Line", back_populates="city")
    station_items: Mapped[list["Station"]] = relationship("Station", back_populates="city")


class Line(Base):
    __tablename__ = "lines"

    id: Mapped[str] = mapped_column(String, primary_key=True)
    city_id: Mapped[str] = mapped_column(String, ForeignKey("cities.id"), nullable=False)
    name: Mapped[str] = mapped_column(String, nullable=False)
    code: Mapped[str] = mapped_column(String, nullable=False)
    status: Mapped[str] = mapped_column(String, nullable=False)
    length_km: Mapped[float] = mapped_column(Float, nullable=False)
    stations: Mapped[int] = mapped_column(Integer, nullable=False)
    sort_order: Mapped[int] = mapped_column(Integer, default=0, nullable=False)

    city: Mapped[City] = relationship("City", back_populates="line_items")
    station_items: Mapped[list["Station"]] = relationship("Station", back_populates="line")


class Station(Base):
    __tablename__ = "stations"

    id: Mapped[str] = mapped_column(String, primary_key=True)
    city_id: Mapped[str] = mapped_column(String, ForeignKey("cities.id"), nullable=False)
    line_id: Mapped[str] = mapped_column(String, ForeignKey("lines.id"), nullable=False)
    name: Mapped[str] = mapped_column(String, nullable=False)
    ridership_k: Mapped[float] = mapped_column(Float, nullable=False)
    accessibility_score: Mapped[float] = mapped_column(Float, nullable=False)
    status: Mapped[str] = mapped_column(String, nullable=False)
    sort_order: Mapped[int] = mapped_column(Integer, default=0, nullable=False)

    city: Mapped[City] = relationship("City", back_populates="station_items")
    line: Mapped[Line] = relationship("Line", back_populates="station_items")


class Module(Base):
    __tablename__ = "modules"

    id: Mapped[str] = mapped_column(String, primary_key=True)
    name: Mapped[str] = mapped_column(String, nullable=False)
    description: Mapped[str] = mapped_column(String, nullable=False)
    key_fields: Mapped[list[str]] = mapped_column(JSON, nullable=False)
    sort_order: Mapped[int] = mapped_column(Integer, default=0, nullable=False)


class Scenario(Base):
    __tablename__ = "scenarios"

    id: Mapped[str] = mapped_column(String, primary_key=True)
    name: Mapped[str] = mapped_column(String, nullable=False)
    description: Mapped[str] = mapped_column(String, nullable=False)
    drivers: Mapped[list[str]] = mapped_column(JSON, nullable=False)
    sort_order: Mapped[int] = mapped_column(Integer, default=0, nullable=False)


class Report(Base):
    __tablename__ = "reports"

    id: Mapped[str] = mapped_column(String, primary_key=True)
    title: Mapped[str] = mapped_column(String, nullable=False)
    city: Mapped[str] = mapped_column(String, nullable=False)
    focus: Mapped[str] = mapped_column(String, nullable=False)
    status: Mapped[str] = mapped_column(String, nullable=False)
    updated_at: Mapped[datetime] = mapped_column(DateTime, nullable=False)
    sort_order: Mapped[int] = mapped_column(Integer, default=0, nullable=False)


class UpdateLog(Base):
    __tablename__ = "update_logs"

    id: Mapped[str] = mapped_column(String, primary_key=True)
    timestamp: Mapped[datetime] = mapped_column(DateTime, nullable=False)
    source: Mapped[str] = mapped_column(String, nullable=False)
    summary: Mapped[str] = mapped_column(String, nullable=False)
    status: Mapped[str] = mapped_column(String, nullable=False)
    sort_order: Mapped[int] = mapped_column(Integer, default=0, nullable=False)


class ScenarioMatrixCell(Base):
    __tablename__ = "scenario_matrix_cells"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    scenario_id: Mapped[str] = mapped_column(String, ForeignKey("scenarios.id"), nullable=False)
    module_id: Mapped[str] = mapped_column(String, ForeignKey("modules.id"), nullable=False)
    value: Mapped[int] = mapped_column(Integer, nullable=False)
