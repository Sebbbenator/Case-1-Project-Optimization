const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const headers = {
  apikey: import.meta.env.VITE_SUPABASE_APIKEY,
  "Content-Type": "application/json"
};

export async function fetchFromSupabase(path) {
  const response = await fetch(`${SUPABASE_URL}${path}`, { headers });
  return response.json();
}
