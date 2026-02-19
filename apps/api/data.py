from datetime import datetime

MODULES = [
    {
        "id": "infra_health",
        "name": "Infrastructure Health",
        "description": "Track, signaling, and rolling stock integrity across the network.",
        "key_fields": ["track_condition_index", "signal_uptime", "fleet_availability", "maintenance_backlog_days"],
    },
    {
        "id": "ops_reliability",
        "name": "Operations & Reliability",
        "description": "Service punctuality, disruptions, and capacity utilization.",
        "key_fields": ["on_time_rate", "mean_time_to_recover_min", "capacity_utilization", "service_disruptions"],
    },
    {
        "id": "passenger_experience",
        "name": "Passenger Experience",
        "description": "Crowding, satisfaction, and accessibility metrics.",
        "key_fields": ["satisfaction_score", "crowding_index", "accessibility_coverage", "complaints_per_100k"],
    },
    {
        "id": "safety_security",
        "name": "Safety & Security",
        "description": "Incident rates, security readiness, and compliance.",
        "key_fields": ["incident_rate", "security_readiness", "compliance_score", "near_miss_rate"],
    },
    {
        "id": "sustainability",
        "name": "Sustainability",
        "description": "Energy efficiency and emissions performance.",
        "key_fields": ["energy_intensity", "renewable_share", "emissions_index", "regen_braking_coverage"],
    },
    {
        "id": "innovation_digital",
        "name": "Innovation & Digitalization",
        "description": "Digital operations, data quality, and automation maturity.",
        "key_fields": ["digital_twin_coverage", "predictive_maintenance_rate", "data_quality_score", "automation_index"],
    },
]

CITIES = [
    {
        "id": "metrovale",
        "name": "Metrovale",
        "region": "North Corridor",
        "population_m": 9.2,
        "lines": 14,
        "stations": 182,
        "daily_ridership_m": 3.4,
        "on_time_rate": 92.4,
        "safety_index": 88.1,
        "sustainability_score": 82.5,
        "overall_index": 87.3,
        "module_scores": {
            "infra_health": 86,
            "ops_reliability": 90,
            "passenger_experience": 85,
            "safety_security": 88,
            "sustainability": 83,
            "innovation_digital": 92,
        },
        "signals": {
            "alert_level": "Watch",
            "trend": "Improving",
            "top_risks": ["Peak-hour dwell time", "Aging interlockings"],
        },
    },
    {
        "id": "rivergate",
        "name": "Rivergate",
        "region": "Central Belt",
        "population_m": 6.1,
        "lines": 9,
        "stations": 121,
        "daily_ridership_m": 2.1,
        "on_time_rate": 88.7,
        "safety_index": 84.3,
        "sustainability_score": 79.1,
        "overall_index": 82.6,
        "module_scores": {
            "infra_health": 80,
            "ops_reliability": 84,
            "passenger_experience": 81,
            "safety_security": 83,
            "sustainability": 78,
            "innovation_digital": 86,
        },
        "signals": {
            "alert_level": "Caution",
            "trend": "Stable",
            "top_risks": ["Signal latency", "Crowding hotspots"],
        },
    },
    {
        "id": "northton",
        "name": "Northton",
        "region": "Lake District",
        "population_m": 4.3,
        "lines": 7,
        "stations": 98,
        "daily_ridership_m": 1.5,
        "on_time_rate": 90.2,
        "safety_index": 90.5,
        "sustainability_score": 86.4,
        "overall_index": 88.2,
        "module_scores": {
            "infra_health": 89,
            "ops_reliability": 88,
            "passenger_experience": 87,
            "safety_security": 91,
            "sustainability": 90,
            "innovation_digital": 84,
        },
        "signals": {
            "alert_level": "Normal",
            "trend": "Improving",
            "top_risks": ["Winter resilience", "Platform accessibility"],
        },
    },
    {
        "id": "sunridge",
        "name": "Sunridge",
        "region": "South Plains",
        "population_m": 5.7,
        "lines": 10,
        "stations": 136,
        "daily_ridership_m": 2.6,
        "on_time_rate": 86.9,
        "safety_index": 81.6,
        "sustainability_score": 75.8,
        "overall_index": 80.3,
        "module_scores": {
            "infra_health": 78,
            "ops_reliability": 82,
            "passenger_experience": 79,
            "safety_security": 80,
            "sustainability": 74,
            "innovation_digital": 83,
        },
        "signals": {
            "alert_level": "Caution",
            "trend": "Declining",
            "top_risks": ["Heat stress on assets", "Power supply variability"],
        },
    },
    {
        "id": "coastport",
        "name": "Coastport",
        "region": "Maritime Arc",
        "population_m": 3.9,
        "lines": 6,
        "stations": 84,
        "daily_ridership_m": 1.1,
        "on_time_rate": 91.5,
        "safety_index": 87.7,
        "sustainability_score": 88.9,
        "overall_index": 86.1,
        "module_scores": {
            "infra_health": 85,
            "ops_reliability": 89,
            "passenger_experience": 82,
            "safety_security": 87,
            "sustainability": 92,
            "innovation_digital": 80,
        },
        "signals": {
            "alert_level": "Watch",
            "trend": "Stable",
            "top_risks": ["Storm surge planning", "Port interface delays"],
        },
    },
]

SCENARIOS = [
    {
        "id": "peak_disruption",
        "name": "Peak-Hour Disruption",
        "description": "Service continuity under peak demand spikes.",
        "drivers": ["dwell_time", "platform_crowding", "turnback_capacity"],
    },
    {
        "id": "asset_fatigue",
        "name": "Asset Fatigue",
        "description": "Lifecycle stress on track and rolling stock assets.",
        "drivers": ["track_defects", "wheelset_wear", "maintenance_backlog"],
    },
    {
        "id": "weather_resilience",
        "name": "Weather Resilience",
        "description": "Operational resilience to extreme weather events.",
        "drivers": ["flood_risk", "heat_exposure", "snow_clearance"],
    },
    {
        "id": "demand_surge",
        "name": "Demand Surge",
        "description": "Capacity response to major events and policy shifts.",
        "drivers": ["special_events", "fare_policy", "modal_shift"],
    },
]

SCENARIO_MATRIX = {
    "rows": [s["name"] for s in SCENARIOS],
    "columns": [m["name"] for m in MODULES],
    "cells": [
        [78, 85, 80, 74, 70, 88],
        [82, 79, 76, 81, 73, 84],
        [69, 72, 77, 83, 88, 71],
        [75, 82, 79, 72, 76, 86],
    ],
}

REPORTS = [
    {
        "id": "rpt-2026-01",
        "title": "Q4 Network Health Brief",
        "city": "Metrovale",
        "focus": "Infrastructure Health",
        "status": "Published",
        "updated_at": "2026-01-15T10:30:00Z",
    },
    {
        "id": "rpt-2026-02",
        "title": "Winter Resilience Readiness",
        "city": "Northton",
        "focus": "Weather Resilience",
        "status": "Draft",
        "updated_at": "2026-02-05T14:15:00Z",
    },
    {
        "id": "rpt-2026-03",
        "title": "Demand Surge Capacity Plan",
        "city": "Sunridge",
        "focus": "Operations & Reliability",
        "status": "In Review",
        "updated_at": "2026-02-10T09:00:00Z",
    },
]

UPDATE_LOGS = [
    {
        "id": "log-001",
        "timestamp": "2026-02-18T07:45:00Z",
        "source": "Asset Monitoring",
        "summary": "Uploaded 18,420 new track sensor readings.",
        "status": "Success",
    },
    {
        "id": "log-002",
        "timestamp": "2026-02-17T18:10:00Z",
        "source": "Operations Control",
        "summary": "Service disruption tags normalized for January events.",
        "status": "Success",
    },
    {
        "id": "log-003",
        "timestamp": "2026-02-17T10:30:00Z",
        "source": "Passenger Feedback",
        "summary": "New survey batch ingested (12,500 responses).",
        "status": "Success",
    },
    {
        "id": "log-004",
        "timestamp": "2026-02-16T22:05:00Z",
        "source": "Sustainability Reporting",
        "summary": "Energy intensity recalculated for Q4 baseline.",
        "status": "Warning",
    },
]

DASHBOARD_SUMMARY = {
    "as_of": datetime.utcnow().isoformat() + "Z",
    "network_health": 85.4,
    "risk_index": 27.8,
    "reliability_index": 88.2,
    "active_alerts": 6,
    "priority_actions": [
        "Replace 32 high-risk interlockings",
        "Rebalance peak-hour capacity in Rivergate",
        "Accelerate heat-hardening program for Sunridge",
    ],
}
