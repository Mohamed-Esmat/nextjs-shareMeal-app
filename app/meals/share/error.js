"use client";
export default function ErrorPage({ error }) {
  return (
    <main className="error">
      <h1>An error occurred while fetching meals.</h1>
      <p>Failed to create meal.</p>
    </main>
  );
}
