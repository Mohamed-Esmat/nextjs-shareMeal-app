// scripts/supabaseClient.cjs
require("dotenv").config({
  path: require("path").resolve(process.cwd(), ".env.local"),
});
const { createClient } = require("@supabase/supabase-js");

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  throw new Error("Missing Supabase environment variables in CJS client");
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);
module.exports = { supabase };
