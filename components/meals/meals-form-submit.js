"use client";

import { useFormStatus } from "react-dom";

export default function MealsFormSubmit() {
  const status = useFormStatus();
  const isSubmitting = status.pending;

  return (
    <button type="submit" disabled={isSubmitting}>
      {isSubmitting ? "Sharing..." : "Share Meal"}
    </button>
  );
}
