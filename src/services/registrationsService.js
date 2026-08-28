import { sendToSupabase } from "../lib/supabaseClient";

export async function create(registration) {
  await sendToSupabase("/registrations", "POST", registration);
}
