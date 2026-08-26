const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const headers = {
  apikey: import.meta.env.VITE_SUPABASE_APIKEY,
  "Content-Type": "application/json"
};

export async function fetchFromSupabase(path) {
  const response = await fetch(`${SUPABASE_URL}${path}`, { headers });

  if (!response.ok) {
    throw new Error("Kunne ikke hente data.");
  }

  return response.json();
}

export async function sendToSupabase(path, method, body) {
  const response = await fetch(`${SUPABASE_URL}${path}`, {
    headers,
    method,
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    throw new Error("Kunne ikke gemme data.");
  }
}
