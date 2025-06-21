// scripts/uploadImages.js
// Load environment variables from .env.local
require("dotenv").config({
  path: require("path").resolve(__dirname, "../.env.local"),
});

const path = require("path");
const fs = require("fs");
const mime = require("mime-types");
const { createClient } = require("@supabase/supabase-js");

// Initialize Supabase client
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error("Missing Supabase environment variables. Check .env.local");
  process.exit(1);
}
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function uploadImages() {
  const imagesDir = path.join(process.cwd(), "public", "images");
  const files = fs.readdirSync(imagesDir);

  for (const file of files) {
    const filePath = path.join(imagesDir, file);
    if (!fs.statSync(filePath).isFile()) continue;

    const ext = path.extname(file);
    const contentType = mime.lookup(ext) || "application/octet-stream";
    const buffer = fs.readFileSync(filePath);
    console.log(`Uploading ${file}...`);

    const { data, error } = await supabase.storage
      .from("images")
      .upload(file, buffer, {
        cacheControl: "3600",
        upsert: false,
        contentType,
      });

    if (error) {
      console.error(`Error uploading ${file}: ${error.message}`);
    } else {
      console.log(`Successfully uploaded ${file}`);
    }
  }
}

uploadImages().catch((err) => {
  console.error("Upload script failed:", err);
  process.exit(1);
});
