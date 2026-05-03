"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MindxBrand } from "@/components/apps/mindx-brand";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { AppRepo } from "@/lib/repo-types";

type AppLandingProps = {
  slug: string;
};

export function AppLanding({ slug }: AppLandingProps) {
  const [appRepo, setAppRepo] = useState<AppRepo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRepo() {
      const response = await fetch(`/api/repos?slug=${encodeURIComponent(slug)}`, {
        cache: "no-store",
      });

      if (!response.ok) {
        setAppRepo(null);
        setLoading(false);
        return;
      }

      const payload = (await response.json()) as { data: AppRepo | null };
      setAppRepo(payload.data);
      setLoading(false);
    }

    loadRepo();
  }, [slug]);

  if (loading) {
    return (
      <main className="min-h-svh bg-gradient-to-b from-red-50 via-white to-slate-100">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8">
          <div className="rounded-2xl border border-red-200 bg-white p-6 text-base shadow-sm">
            Loading app landing page...
          </div>
        </div>
      </main>
    );
  }

  if (!appRepo) {
    return (
      <main className="min-h-svh bg-gradient-to-b from-red-50 via-white to-slate-100">
        <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 py-8">
          <div className="rounded-2xl border border-red-200 bg-white p-8 text-center shadow-sm">
            <p className="text-2xl font-bold text-slate-900">App not found</p>
            <p className="mt-2 text-lg text-slate-600">
              This slug has no repository metadata yet.
            </p>
            <Link href="/apps" className={`${buttonVariants({ size: "sm" })} mt-4 inline-flex`}>
              Back To Repositories
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-svh bg-gradient-to-b from-red-50 via-white to-slate-100">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8">
        <header className="rounded-2xl border border-red-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
            <MindxBrand />
            <Link href="/apps" className={buttonVariants({ variant: "outline", size: "sm" })}>
              Back To Repositories
            </Link>
          </div>
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <Badge className="bg-red-600 text-white hover:bg-red-500">{appRepo.category}</Badge>
            <Badge variant="outline">{appRepo.slug}</Badge>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">{appRepo.name}</h1>
          <p className="mt-3 max-w-3xl text-lg text-slate-600">{appRepo.shortDescription}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            <a
              href={appRepo.githubUrl}
              target="_blank"
              rel="noreferrer"
              className={buttonVariants({ size: "sm" })}
            >
              Open GitHub Repository
            </a>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="space-y-6">
            <Card className="border-red-100/70 bg-white">
              <CardHeader>
                <CardTitle className="text-2xl">README Rendering Placeholder</CardTitle>
                <CardDescription className="text-base">
                  Reserved for GitHub README fetch, markdown parse, and sanitized rendering.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-xl border border-dashed border-red-200 bg-red-50/60 p-4">
                  <p className="text-base font-semibold text-red-700">Planned data source</p>
                  <p className="mt-1 text-base text-slate-700">
                    <code>{appRepo.githubUrl}</code> {"->"} <code>README.md</code>
                  </p>
                </div>
                <div className="space-y-2 rounded-xl border bg-slate-50 p-4">
                  <div className="h-4 w-2/3 rounded bg-slate-200" />
                  <div className="h-4 w-5/6 rounded bg-slate-200" />
                  <div className="h-4 w-4/6 rounded bg-slate-200" />
                  <div className="h-24 rounded bg-slate-100" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-red-100/70 bg-white">
              <CardHeader>
                <CardTitle className="text-2xl">Usage Guide Placeholder</CardTitle>
                <CardDescription className="text-base">
                  Structured sections for onboarding, setup, and operational instructions.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border bg-slate-50 p-4">
                  <h3 className="text-lg font-semibold text-slate-900">Prerequisites</h3>
                  <p className="mt-2 text-base text-slate-600">
                    Place environment variables, required permissions, and dependencies here.
                  </p>
                </div>
                <div className="rounded-xl border bg-slate-50 p-4">
                  <h3 className="text-lg font-semibold text-slate-900">Quick Start</h3>
                  <p className="mt-2 text-base text-slate-600">
                    Insert first-run steps with screenshots, commands, and expected outcomes.
                  </p>
                </div>
                <div className="rounded-xl border bg-slate-50 p-4 sm:col-span-2">
                  <h3 className="text-lg font-semibold text-slate-900">Advanced Operations</h3>
                  <p className="mt-2 text-base text-slate-600">
                    Add troubleshooting matrix, runbooks, and escalation paths.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="h-fit border-red-100/70 bg-white">
            <CardHeader>
              <CardTitle className="text-2xl">App Metadata</CardTitle>
              <CardDescription className="text-base">Data passed from repository entity.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-base">
              <div>
                <p className="font-semibold text-slate-900">Repository URL</p>
                <p className="truncate text-slate-600">{appRepo.githubUrl}</p>
              </div>
              <div>
                <p className="font-semibold text-slate-900">Tags</p>
                <div className="mt-1 flex flex-wrap gap-2">
                  {appRepo.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-red-50 px-2 py-1 text-sm font-semibold text-red-700"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="font-semibold text-slate-900">Updated At</p>
                <p className="text-slate-600">
                  {new Date(appRepo.updatedAt).toLocaleDateString("vi-VN", {
                    dateStyle: "medium",
                  })}
                </p>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}
