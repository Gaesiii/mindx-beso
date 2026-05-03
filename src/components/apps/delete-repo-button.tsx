"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

type DeleteRepoButtonProps = {
  id: string;
};

export function DeleteRepoButton({ id }: DeleteRepoButtonProps) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    setDeleting(true);
    const response = await fetch(`/api/repos/${id}`, { method: "DELETE" });
    setDeleting(false);

    if (response.ok) {
      router.refresh();
    }
  }

  return (
    <Button variant="destructive" size="sm" disabled={deleting} onClick={handleDelete}>
      {deleting ? "Deleting..." : "Delete"}
    </Button>
  );
}
