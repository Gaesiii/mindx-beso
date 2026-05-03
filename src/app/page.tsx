import Link from "next/link";
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
import { cn } from "@/lib/utils";
import { categories, tools } from "@/lib/tool-registry";

type DashboardProps = {
  searchParams: Promise<{ category?: string }>;
};

export default async function DashboardPage({ searchParams }: DashboardProps) {
  const query = await searchParams;
  const activeCategory = query.category && categories.includes(query.category) ? query.category : "All";
  const filteredTools =
    activeCategory === "All"
      ? tools
      : tools.filter((tool) => tool.category === activeCategory);

  return (
    <main className="min-h-svh bg-gradient-to-b from-slate-100 via-slate-50 to-white">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 md:grid-cols-[240px_1fr] md:py-8">
        <aside className="h-fit rounded-2xl border bg-white/90 p-4 shadow-sm backdrop-blur">
          <h2 className="mb-3 text-sm font-semibold tracking-wide text-slate-800 uppercase">
            Categories
          </h2>
          <nav className="space-y-1">
            {categories.map((category) => (
              <Link
                key={category}
                href={
                  category === "All"
                    ? "/"
                    : `/?category=${encodeURIComponent(category)}`
                }
                className={cn(
                  buttonVariants({
                    variant: activeCategory === category ? "default" : "ghost",
                    size: "sm",
                  }),
                  "w-full justify-start"
                )}
              >
                {category}
              </Link>
            ))}
          </nav>
        </aside>

        <section className="space-y-5">
          <header className="space-y-2">
            <p className="text-xs font-medium tracking-[0.2em] text-slate-500 uppercase">
              Internal Tool Hub
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
              Company Tools Directory
            </h1>
            <p className="max-w-2xl text-sm text-slate-600">
              Centralized catalog for internal tools, usage guides, repositories, and release downloads.
            </p>
          </header>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filteredTools.map((tool) => (
              <Card
                key={tool.slug}
                className="flex h-full flex-col border-slate-200/80 bg-white/95 shadow-sm"
              >
                <CardHeader className="space-y-3">
                  <div>
                    <Badge variant="secondary">{tool.category}</Badge>
                  </div>
                  <CardTitle className="text-lg">{tool.name}</CardTitle>
                  <CardDescription>{tool.summary}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1" />
                <CardFooter className="flex flex-wrap gap-2">
                  <Link
                    href={`/tools/${tool.slug}`}
                    className={buttonVariants({ size: "sm" })}
                  >
                    Open Guide
                  </Link>
                  <a
                    href={tool.repositoryUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={buttonVariants({ variant: "outline", size: "sm" })}
                  >
                    Repository
                  </a>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
