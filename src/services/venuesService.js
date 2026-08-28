import { fetchFromSupabase } from "../lib/supabaseClient";

export async function getAll() {
  return fetchFromSupabase("/venues?select=*,events(id,title,date)&order=name.asc");
}
