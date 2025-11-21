const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export async function apiGet(path: string) {
  const url = `${API_BASE}${path}`;
  const res = await fetch(url, { credentials: "include" });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function apiPost(path: string, body: any) {
  const url = `${API_BASE}${path}`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    credentials: "include",
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export default { apiGet, apiPost };
