const { createClient } = supabase;

const SUPABASE_URL = "https://tvremavnjtdsygizvjof.supabase.co";
const SUPABASE_KEY = "sb_publishable_WpgZuIo6Q5iM1FJk-TjaLg_iWYJLmhg";

const db = createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);