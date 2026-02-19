const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

async function fetchJSON<T = any>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, { next: { revalidate: 60 } });
  if (!res.ok) {
    throw new Error(`API error ${res.status}`);
  }
  return res.json();
}

export async function getDashboard() {
  return fetchJSON("/dashboard");
}

export async function getCities() {
  return fetchJSON("/cities");
}

export async function getCity(id: string) {
  return fetchJSON(`/cities/${id}`);
}

export async function getModules() {
  return fetchJSON("/modules");
}

export async function getModule(id: string) {
  return fetchJSON(`/modules/${id}`);
}

export async function getScenarios() {
  return fetchJSON("/scenarios");
}

export async function getMatrix() {
  return fetchJSON("/matrix");
}

export async function getReports() {
  return fetchJSON("/reports");
}

export async function getLogs() {
  return fetchJSON("/logs");
}
