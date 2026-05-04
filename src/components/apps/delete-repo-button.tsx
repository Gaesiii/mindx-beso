"use client";

import { useState, type MouseEvent } from "react";

type DeleteRepoButtonProps = {
  id: string;
  onDeleted?: () => void;
};

export function DeleteRepoButton({ id, onDeleted }: DeleteRepoButtonProps) {
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleDelete(event: MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    const confirmed = window.confirm("Xóa app này khỏi danh sách?");
    if (!confirmed) return;

    setDeleting(true);
    setError(null);
    const response = await fetch(`/api/repos/${id}`, { method: "DELETE" });
    setDeleting(false);

    if (response.ok) {
      onDeleted?.();
      return;
    }

    setError("Không xóa được");
  }

  return (
    <div className="flex flex-col items-end gap-1" onClick={(event) => event.stopPropagation()}>
      <button
        type="button"
        disabled={deleting}
        onClick={handleDelete}
        className="h-9 rounded-full border border-[#E31F26]/20 bg-white px-4 text-sm font-bold text-[#E31F26] transition hover:bg-[#E31F26]/10 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {deleting ? "Đang xóa..." : "Xóa"}
      </button>
      {error ? <p className="text-xs text-red-700">{error}</p> : null}
    </div>
  );
}
