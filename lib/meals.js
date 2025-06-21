import fs from "node:fs";
import { Buffer } from "buffer";

import sql from "better-sqlite3";
import { unstable_cache, revalidateTag } from "next/cache";
import slugify from "slugify";
import xss from "xss";
import { supabase } from "@/lib/supabaseClient";

const db = sql("meals.db");

// Create a cached version of the database query
const getCachedMeals = unstable_cache(
  async () => {
    // Simulate a delay for demonstration purposes
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const meals = db.prepare("SELECT * FROM meals").all();
    // throw new Error("Simulated error for testing purposes"); // Simulate an error for testing
    if (!meals || meals.length === 0) {
      return [];
    }
    return meals.map((meal) => ({
      ...meal,
      image: /^https?:\/\//i.test(meal.image)
        ? meal.image
        : meal.image.startsWith("/")
        ? meal.image
        : `/${meal.image}`,
    }));
  },
  ["meals"], // cache key
  {
    revalidate: 300, // Cache for 5 minutes (300 seconds)
    tags: ["meals"], // Cache tags for invalidation
  }
);

export async function getMeals() {
  return await getCachedMeals();
}

export async function getMealBySlug(slug) {
  return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug) || null;
}

export async function saveMeal(meal) {
  let slug = slugify(meal.title, {
    lower: true,
  });

  // Check if slug already exists and make it unique

  let counter = 1;
  let originalSlug = slug;
  while (db.prepare("SELECT slug FROM meals WHERE slug = ?").get(slug)) {
    slug = `${originalSlug}-${counter}`;
    counter++;
  }

  // upload image to Supabase storage
  const extension = meal.image.name.split(".").pop();
  const fileName = `${slug}.${extension}`;

  // Read file into Buffer for Node upload
  const arrayBuffer = await meal.image.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const contentType = meal.image.type || `image/${extension}`;

  // Upload to Supabase Storage, overwrite existing if necessary
  const { error: uploadError } = await supabase.storage
    .from("images")
    .upload(fileName, buffer, {
      cacheControl: "3600",
      upsert: true, // overwrite file if it already exists
      contentType,
    });
  if (uploadError) {
    throw new Error(`Failed to upload image: ${uploadError.message}`);
  }

  // Get the public URL
  const { data, error: urlError } = supabase.storage
    .from("images")
    .getPublicUrl(fileName);
  console.log("Supabase getPublicUrl result:", { data, urlError });
  if (urlError) {
    throw new Error(`Failed to get public URL: ${urlError.message}`);
  }
  const publicUrl = data.publicUrl;

  // Build meal record
  const sanitizedMeal = {
    creator: xss(meal.creator),
    creator_email: xss(meal.creator_email),
    title: xss(meal.title),
    image: publicUrl,
    summary: xss(meal.summary),
    instructions: xss(meal.instructions),
    slug,
  };
  try {
    db.prepare(
      `INSERT INTO meals (creator, creator_email, title, image, summary, instructions, slug) VALUES (
      @creator, @creator_email, @title, @image, @summary, @instructions, @slug)`
    ).run(sanitizedMeal);
  } catch (error) {
    // If database insertion fails, clean up the uploaded image
    try {
      fs.unlinkSync(`public/images/${fileName}`);
    } catch (cleanupError) {
      console.warn("Failed to cleanup image file:", cleanupError);
    }
    throw new Error(`Failed to save meal: ${error.message}`);
  }

  // Invalidate the cache when a new meal is added
  revalidateTag("meals");

  return sanitizedMeal;
}
