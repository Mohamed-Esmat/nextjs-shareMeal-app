"use server";
import { redirect } from "next/navigation";
import { saveMeal } from "./meals";
import { revalidatePath } from "next/cache";
import slugify from "slugify";

function isInvalidText(text) {
  return !text || text.trim() === "";
}

export async function shareMeal(prevState, formData) {
  const meal = {
    creator: formData.get("creator")?.toString() || "",
    creator_email: formData.get("creator_email")?.toString() || "",
    title: formData.get("title")?.toString() || "",
    image: formData.get("image"),
    summary: formData.get("summary")?.toString() || "",
    instructions: formData.get("instructions")?.toString() || "",
  };

  // Validate the meal data
  if (
    isInvalidText(meal.creator) ||
    isInvalidText(meal.creator_email) ||
    isInvalidText(meal.title) ||
    isInvalidText(meal.summary) ||
    isInvalidText(meal.instructions) ||
    !meal.image ||
    meal.image.size === 0 ||
    !meal.creator_email.includes("@")
  ) {
    // throw new Error("Invalid input");
    return {
      error: "Invalid input. Please check your data and try again.",
    };
  }
  // Here you would typically send the meal data to your server or database
  const savedMeal = await saveMeal(meal);
  if (!savedMeal) {
    // throw new Error("Failed to save meal");
    return {
      error: "Failed to save meal. Please try again later.",
    };
  }

  revalidatePath("/meals", "layout");
  redirect("/meals");
}
