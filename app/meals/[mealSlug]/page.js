import Image from "next/image";
import { notFound } from "next/navigation";
import classes from "./page.module.css";
import { getMealBySlug } from "@/lib/meals";

export async function generateMetadata({ params }) {
  const meal = await getMealBySlug(params.mealSlug);

  if (!meal) {
    notFound();
  }

  return {
    title: meal?.title
      ? `${meal.title} - NextLevel Food Recipes`
      : "Meal Not Found",
    description: meal?.summary
      ? meal.summary
      : "Explore this delicious meal shared by our community.",
  };
}

export default async function MealDetailPage({ params }) {
  const meal = await getMealBySlug(params.mealSlug);

  if (!meal) {
    notFound();
  }
  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image src={meal?.image} alt={meal?.title} fill fetchPriority="low" />
        </div>
        <div className={classes.headerText}>
          <h1>{meal?.title}</h1>
          <p className={classes.creator}>
            by <a href={`mailto:${meal?.creator_email}`}>{meal?.creator}</a>
          </p>
          <p className={classes.summary}>{meal?.summary}</p>
        </div>
      </header>
      <main>
        <p
          className={classes.instructions}
          dangerouslySetInnerHTML={{
            __html: meal?.instructions.replace(/(?:\r\n|\r|\n)/g, "<br />"),
          }}
        ></p>
      </main>
    </>
  );
}
