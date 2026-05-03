"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { AppRepo } from "@/lib/repo-types";
import { DeleteRepoButton } from "@/components/apps/delete-repo-button";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type RepoResponse = { data: AppRepo[] };

export function ReposGrid() {
  const [repos, setRepos] = useState<AppRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadRepos() {
      const response = await fetch("/api/repos", { cache: "no-store" });

      if (!response.ok) {
        if (mounted) {
          setError("Failed to load repositories.");
          setLoading(false);
        }
        return;
      }

      const result = (await response.json()) as RepoResponse;
      if (mounted) {
        setRepos(result.data ?? []);
        setLoading(false);
      }
    }

    loadRepos();

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="rounded-2xl border border-red-100 bg-white p-8 text-base text-slate-600 shadow-sm">
        Loading repositories...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-base text-red-700 shadow-sm">
        {error}
      </div>
    );
  }

  if (repos.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-red-300 bg-white p-10 text-center shadow-sm">
        <p className="text-xl font-bold text-slate-900">No repositories yet</p>
        <p className="mt-2 text-base text-slate-600">
          Click <span className="font-semibold text-red-700">Add Repository</span> to create your
          first app landing page.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {repos.map((repo) => (
        <Card key={repo.id} className="border-red-100/80 bg-white shadow-sm">
          <CardHeader>
            <div className="mb-2 flex flex-wrap gap-2">
              <Badge className="bg-red-600 text-white hover:bg-red-500">{repo.category}</Badge>
              <Badge variant="outline">{repo.slug}</Badge>
            </div>
            <CardTitle className="text-xl">{repo.name}</CardTitle>
            <CardDescription className="text-base">{repo.shortDescription}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <a
              href={repo.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="block truncate text-base text-red-700 underline underline-offset-4"
            >
              {repo.githubUrl}
            </a>
            <div className="flex flex-wrap gap-2">
              {repo.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md bg-red-50 px-2 py-1 text-sm font-semibold text-red-700"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex items-center justify-between gap-2">
            <Link href={`/apps/${repo.slug}`} className={buttonVariants({ size: "sm" })}>
              Open Landing
            </Link>
            <DeleteRepoButton
              id={repo.id}
              onDeleted={() => setRepos((prev) => prev.filter((item) => item.id !== repo.id))}
            />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
