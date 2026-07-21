const SUPABASE_URL = "https://valwpmiwzaqgijtrbizl.supabase.co";
const SUPABASE_KEY = "sb_publishable_REbhQNOsjfE4aT5oMXX6YA_COOzqYF8";

const { createClient } = window.supabase;

window.supabaseClient = createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);
