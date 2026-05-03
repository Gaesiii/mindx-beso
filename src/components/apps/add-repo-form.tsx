"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

type FormState = {
  name: string;
  githubUrl: string;
  shortDescription: string;
  category: string;
  tags: string;
  usageGuide: string;
};

const initialState: FormState = {
  name: "",
  githubUrl: "",
  shortDescription: "",
  category: "",
  tags: "",
  usageGuide: "",
};

export function AddRepoForm() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setMessage(null);
    setError(null);

    const payload = {
      name: form.name,
      githubUrl: form.githubUrl,
      shortDescription: form.shortDescription,
      category: form.category,
      tags: form.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      usageGuide: form.usageGuide,
      readmeSource: "github",
    };

    const response = await fetch("/api/repos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = (await response.json()) as { data?: { slug?: string }; error?: string };

    if (!response.ok) {
      setError(result.error ?? "Failed to add repository.");
      setSubmitting(false);
      return;
    }

    setMessage("Repository added successfully.");
    setForm(initialState);
    router.refresh();
    if (result.data?.slug) {
      router.push(`/apps/${result.data.slug}`);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-5 rounded-2xl border border-red-200 bg-white p-6 shadow-sm"
    >
      <h2 className="text-2xl font-bold text-red-700">Add Repo</h2>

      <label className="grid gap-1.5 text-base">
        <span className="font-semibold text-slate-700">App Name</span>
        <input
          required
          value={form.name}
          onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
          className="h-11 rounded-lg border border-slate-200 px-3 text-base outline-none transition focus:border-red-400 focus:ring-2 focus:ring-red-200"
          placeholder="Release Manager"
        />
      </label>

      <label className="grid gap-1.5 text-base">
        <span className="font-semibold text-slate-700">GitHub Repository URL</span>
        <input
          required
          type="url"
          value={form.githubUrl}
          onChange={(event) => setForm((prev) => ({ ...prev, githubUrl: event.target.value }))}
          className="h-11 rounded-lg border border-slate-200 px-3 text-base outline-none transition focus:border-red-400 focus:ring-2 focus:ring-red-200"
          placeholder="https://github.com/your-org/release-manager"
        />
      </label>

      <label className="grid gap-1.5 text-base">
        <span className="font-semibold text-slate-700">Short Description</span>
        <input
          required
          value={form.shortDescription}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, shortDescription: event.target.value }))
          }
          className="h-11 rounded-lg border border-slate-200 px-3 text-base outline-none transition focus:border-red-400 focus:ring-2 focus:ring-red-200"
          placeholder="Centralized release package orchestration."
        />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-1.5 text-base">
          <span className="font-semibold text-slate-700">Category</span>
          <input
            required
            value={form.category}
            onChange={(event) => setForm((prev) => ({ ...prev, category: event.target.value }))}
            className="h-11 rounded-lg border border-slate-200 px-3 text-base outline-none transition focus:border-red-400 focus:ring-2 focus:ring-red-200"
            placeholder="Operations"
          />
        </label>

        <label className="grid gap-1.5 text-base">
          <span className="font-semibold text-slate-700">Tags (comma separated)</span>
          <input
            value={form.tags}
            onChange={(event) => setForm((prev) => ({ ...prev, tags: event.target.value }))}
            className="h-11 rounded-lg border border-slate-200 px-3 text-base outline-none transition focus:border-red-400 focus:ring-2 focus:ring-red-200"
            placeholder="release, tooling"
          />
        </label>
      </div>

      <label className="grid gap-1.5 text-base">
        <span className="font-semibold text-slate-700">Usage Guide Seed</span>
        <textarea
          rows={5}
          value={form.usageGuide}
          onChange={(event) => setForm((prev) => ({ ...prev, usageGuide: event.target.value }))}
          className="rounded-lg border border-slate-200 px-3 py-2 text-base outline-none transition focus:border-red-400 focus:ring-2 focus:ring-red-200"
          placeholder="Short onboarding notes before README integration."
        />
      </label>

      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" size="lg" disabled={submitting}>
          {submitting ? "Saving..." : "Save Repository"}
        </Button>
        {message ? <p className="text-base text-emerald-700">{message}</p> : null}
        {error ? <p className="text-base text-red-700">{error}</p> : null}
      </div>
    </form>
  );
}
