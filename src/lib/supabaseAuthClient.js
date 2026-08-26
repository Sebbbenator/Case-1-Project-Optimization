import { createClient } from "@supabase/supabase-js";

const SUPABASE_PROJECT_URL = import.meta.env.VITE_SUPABASE_URL.replace(/\/rest\/v1\/?$/, "");
const SUPABASE_APIKEY = import.meta.env.VITE_SUPABASE_APIKEY;

export const supabaseAuth = createClient(SUPABASE_PROJECT_URL, SUPABASE_APIKEY);
