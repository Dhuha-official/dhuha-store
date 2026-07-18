const SUPABASE_URL = "ISI_URL_SUPABASE_KAMU";

const SUPABASE_ANON_KEY = "ISI_ANON_KEY_KAMU";

const supabase = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);
