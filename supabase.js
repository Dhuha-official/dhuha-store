const supabaseUrl = "https://valwpmiwzaqgijtrbizl.supabase.co";
const supabaseKey = "sb_publishable_REbhQNOsjfE4aT5oMXX6YA_COOzqYF8";

window.supabaseClient = window.supabase.createClient(
    supabaseUrl,
    supabaseKey
);
