import { fetchFromSupabase, sendToSupabase } from "../lib/supabaseClient";
import { supabaseAuth } from "../lib/supabaseAuthClient";

async function getAuthHeaders() {
  const { data } = await supabaseAuth.auth.getSession();
  return data.session ? { Authorization: `Bearer ${data.session.access_token}` } : {};
}

export async function getAll() {
  const authHeaders = await getAuthHeaders();
  return fetchFromSupabase("/registrations?order=createdAt.desc", authHeaders);
}

export async function getById(id) {
  const authHeaders = await getAuthHeaders();
  const registrations = await fetchFromSupabase(`/registrations?id=eq.${id}`, authHeaders);
  return registrations[0] ?? null;
}

export async function update(id, registration) {
  await sendToSupabase(`/registrations?id=eq.${id}`, "PATCH", registration);
}

export async function remove(id) {
  await sendToSupabase(`/registrations?id=eq.${id}`, "DELETE");
}
