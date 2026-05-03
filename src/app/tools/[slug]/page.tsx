import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getLatestRelease } from "@/lib/github";
import { loadToolDoc } from "@/lib/tool-docs";
import { toolBySlug, tools } from "@/lib/tool-registry";

type ToolPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return tools.map((tool) => ({ slug: tool.slug }));
}

export const dynamicParams = false;

export default async function ToolDetailPage({ params }: ToolPageProps) {
  const { slug } = await params;
  const tool = toolBySlug.get(slug);

  if (!tool) {
    notFound();
  }

  const docModule = await loadToolDoc(slug);
  if (!docModule) {
    notFound();
  }

  const Guide = docModule.default;
  const latestRelease = tool.github
    ? await getLatestRelease(tool.github.owner, tool.github.repo)
    : null;

  return (
    <main className="min-h-svh bg-slate-50">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-8">
        <header className="rounded-2xl border bg-white p-6 shadow-sm">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <Badge variant="secondary">{tool.category}</Badge>
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">{tool.name}</h1>
          <p className="mt-2 max-w-3xl text-slate-600">{tool.summary}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            <a
              href={tool.repositoryUrl}
              target="_blank"
              rel="noreferrer"
              className={buttonVariants({ size: "sm" })}
            >
              Repository
            </a>
            {tool.downloadUrl ? (
              <a
                href={tool.downloadUrl}
                target="_blank"
                rel="noreferrer"
                className={buttonVariants({ variant: "outline", size: "sm" })}
              >
                <ExternalLink className="mr-1 size-4" />
                Direct Download
              </a>
            ) : null}
            <Link href="/" className={buttonVariants({ variant: "ghost", size: "sm" })}>
              Back To Hub
            </Link>
          </div>
        </header>

        {latestRelease ? (
          <Card>
            <CardHeader>
              <CardTitle>Latest GitHub Release</CardTitle>
              <CardDescription>
                {(latestRelease.name || latestRelease.tag_name).trim()}
                {latestRelease.published_at
                  ? ` • ${new Date(latestRelease.published_at).toLocaleDateString("en-US", {
                      dateStyle: "medium",
                    })}`
                  : ""}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <a
                href={latestRelease.html_url}
                target="_blank"
                rel="noreferrer"
                className={buttonVariants({ variant: "outline", size: "sm" })}
              >
                View Release Notes
              </a>
              {latestRelease.assets[0] ? (
                <a
                  href={latestRelease.assets[0].browser_download_url}
                  target="_blank"
                  rel="noreferrer"
                  className={buttonVariants({ size: "sm" })}
                >
                  Download {latestRelease.assets[0].name}
                </a>
              ) : null}
            </CardContent>
          </Card>
        ) : null}

        <article className="rounded-2xl border bg-white p-6 shadow-sm">
          <Guide />
        </article>
      </div>
    </main>
  );
}
