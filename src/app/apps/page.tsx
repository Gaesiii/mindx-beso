import Link from "next/link";
import { AddRepoForm } from "@/components/apps/add-repo-form";
import { DeleteRepoButton } from "@/components/apps/delete-repo-button";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { listRepos } from "@/lib/repo-store";

export const dynamic = "force-dynamic";

export default function AppsDirectoryPage() {
  const repos = listRepos();

  return (
    <main className="min-h-svh bg-gradient-to-b from-red-50 via-white to-slate-100">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8">
        <header className="rounded-2xl border border-red-100 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold tracking-[0.2em] text-red-600 uppercase">
            MindX Internal Tool Hub
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
            Repository Management
          </h1>
          <p className="mt-2 max-w-3xl text-sm text-slate-600">
            Public repository catalog for internal applications. Add repository metadata, open
            dedicated app landing pages, and manage records through CRUD APIs.
          </p>
        </header>

        <section className="grid gap-6 lg:grid-cols-[380px_1fr]">
          <AddRepoForm />

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {repos.map((repo) => (
              <Card key={repo.id} className="border-red-100/80 bg-white">
                <CardHeader>
                  <div className="mb-2 flex flex-wrap gap-2">
                    <Badge className="bg-red-600 text-white hover:bg-red-500">
                      {repo.category}
                    </Badge>
                    <Badge variant="outline">{repo.slug}</Badge>
                  </div>
                  <CardTitle>{repo.name}</CardTitle>
                  <CardDescription>{repo.shortDescription}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <a
                    href={repo.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="block truncate text-sm text-red-700 underline underline-offset-4"
                  >
                    {repo.githubUrl}
                  </a>
                  <div className="flex flex-wrap gap-2">
                    {repo.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700"
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
                  <DeleteRepoButton id={repo.id} />
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
