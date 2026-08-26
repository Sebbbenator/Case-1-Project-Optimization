import { fetchFromSupabase, sendToSupabase } from "../lib/supabaseClient";

export async function getAll() {
  return fetchFromSupabase("/events?order=date.asc");
}

export async function getById(id) {
  const events = await fetchFromSupabase(`/events?id=eq.${id}`);
  return events[0] ?? null;
}

export async function create(event) {
  await sendToSupabase("/events", "POST", event);
}

export async function update(id, event) {
  await sendToSupabase(`/events?id=eq.${id}`, "PATCH", event);
}

export async function remove(id) {
  await sendToSupabase(`/events?id=eq.${id}`, "DELETE");
}
