import fs from "node:fs";
import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";

const db = sql("meals.db");

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate a delay for demonstration purposes
  const meals = db.prepare("SELECT * FROM meals").all();
  return meals.map((meal) => ({
    ...meal,
    image: meal.image.startsWith("/") ? meal.image : `/${meal.image}`,
  }));
}

export async function getMealBySlug(slug) {
  return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug) || null;
}

export async function saveMeal(meal) {
  const slug = slugify(meal.title, {
    lower: true,
  });

  const extension = meal.image.name.split(".").pop();
  const fileName = `${slug}.${extension}`;

  const stream = fs.createWriteStream(`public/images/${fileName}`);
  const bufferedImage = await meal.image.arrayBuffer();

  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error("Failed to write image file: " + error.message);
    }
  });

  const sanitizedMeal = {
    creator: xss(meal.creator),
    creator_email: xss(meal.creator_email),
    title: xss(meal.title),
    image: `/images/${fileName}`,
    summary: xss(meal.summary),
    instructions: xss(meal.instructions),
    slug,
  };

  db.prepare(
    `INSERT INTO meals (creator, creator_email, title, image, summary, instructions, slug) VALUES (
    @creator, @creator_email, @title, @image, @summary, @instructions, @slug)`
  ).run(sanitizedMeal);
}
