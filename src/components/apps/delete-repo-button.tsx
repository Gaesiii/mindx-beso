"use client";

import { useState } from "react";

type DeleteRepoButtonProps = {
  id: string;
  onDeleted?: () => void;
};

export function DeleteRepoButton({ id, onDeleted }: DeleteRepoButtonProps) {
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleDelete() {
    const confirmed = window.confirm("Delete this repository?");
    if (!confirmed) return;

    setDeleting(true);
    setError(null);
    const response = await fetch(`/api/repos/${id}`, { method: "DELETE" });
    setDeleting(false);

    if (response.ok) {
      onDeleted?.();
      return;
    }

    setError("Delete failed");
  }

  return (
    <div className="flex flex-col items-end gap-1">
      <button
        type="button"
        disabled={deleting}
        onClick={handleDelete}
        className="h-8 rounded-md bg-red-600 px-3 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {deleting ? "Deleting..." : "Delete"}
      </button>
      {error ? <p className="text-xs text-red-700">{error}</p> : null}
    </div>
  );
}
