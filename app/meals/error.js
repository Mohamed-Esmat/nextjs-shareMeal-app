"use client";
export default function ErrorPage({ error }) {
  return (
    <main className="error">
      <h1>An error occurred while fetching meals.</h1>
      <p>Please try again later.</p>
      <p>If the problem persists, contact support.</p>
    </main>
  );
}
