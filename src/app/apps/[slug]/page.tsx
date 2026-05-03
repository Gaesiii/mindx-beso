import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getRepoBySlug } from "@/lib/repo-store";

type AppLandingPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

export default async function AppLandingPage({ params }: AppLandingPageProps) {
  const { slug } = await params;
  const appRepo = getRepoBySlug(slug);

  if (!appRepo) {
    notFound();
  }

  return (
    <main className="min-h-svh bg-gradient-to-b from-red-50 via-white to-slate-100">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8">
        <header className="rounded-2xl border border-red-100 bg-white p-6 shadow-sm">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <Badge className="bg-red-600 text-white hover:bg-red-500">{appRepo.category}</Badge>
            <Badge variant="outline">{appRepo.slug}</Badge>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">{appRepo.name}</h1>
          <p className="mt-2 max-w-3xl text-slate-600">{appRepo.shortDescription}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            <a
              href={appRepo.githubUrl}
              target="_blank"
              rel="noreferrer"
              className={buttonVariants({ size: "sm" })}
            >
              Open GitHub Repository
            </a>
            <Link href="/apps" className={buttonVariants({ variant: "outline", size: "sm" })}>
              Back To Apps
            </Link>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="space-y-6">
            <Card className="border-red-100/70 bg-white">
              <CardHeader>
                <CardTitle>README Rendering Placeholder</CardTitle>
                <CardDescription>
                  Reserved for GitHub README fetch, markdown parse, and sanitized rendering.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-xl border border-dashed border-red-200 bg-red-50/60 p-4">
                  <p className="text-sm font-medium text-red-700">Planned data source</p>
                  <p className="mt-1 text-sm text-slate-700">
                    <code>{appRepo.githubUrl}</code> → <code>README.md</code>
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
                <CardTitle>Usage Guide Placeholder</CardTitle>
                <CardDescription>
                  Structured sections for onboarding, setup, and operational instructions.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border bg-slate-50 p-4">
                  <h3 className="font-semibold text-slate-900">Prerequisites</h3>
                  <p className="mt-2 text-sm text-slate-600">
                    Place environment variables, required permissions, and dependencies here.
                  </p>
                </div>
                <div className="rounded-xl border bg-slate-50 p-4">
                  <h3 className="font-semibold text-slate-900">Quick Start</h3>
                  <p className="mt-2 text-sm text-slate-600">
                    Insert first-run steps with screenshots, commands, and expected outcomes.
                  </p>
                </div>
                <div className="rounded-xl border bg-slate-50 p-4 sm:col-span-2">
                  <h3 className="font-semibold text-slate-900">Advanced Operations</h3>
                  <p className="mt-2 text-sm text-slate-600">
                    Add troubleshooting matrix, runbooks, and escalation paths.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="h-fit border-red-100/70 bg-white">
            <CardHeader>
              <CardTitle>App Metadata</CardTitle>
              <CardDescription>Data passed from repository entity.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <p className="font-medium text-slate-900">Repository URL</p>
                <p className="truncate text-slate-600">{appRepo.githubUrl}</p>
              </div>
              <div>
                <p className="font-medium text-slate-900">Tags</p>
                <div className="mt-1 flex flex-wrap gap-2">
                  {appRepo.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="font-medium text-slate-900">Updated At</p>
                <p className="text-slate-600">
                  {new Date(appRepo.updatedAt).toLocaleDateString("en-US", {
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
