"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ExternalLink,
  GitBranch,
  LoaderCircle,
  PackageSearch,
  Sparkles,
} from "lucide-react";
import type { AppRepo } from "@/lib/repo-types";
import { DeleteRepoButton } from "@/components/apps/delete-repo-button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type RepoResponse = { data: AppRepo[] };

function repoHandle(url: string) {
  return url.replace(/^https:\/\/github\.com\//, "").replace(/\/$/, "");
}

function isFeaturedRepo(repo: AppRepo) {
  const searchable = `${repo.slug} ${repo.name} ${repo.githubUrl}`.toLowerCase();
  return searchable.includes("mindx-auto-grader") || searchable.includes("auto-grader");
}

function isInteractiveElement(target: EventTarget | null) {
  return target instanceof HTMLElement && Boolean(target.closest("a,button"));
}

export function ReposGrid() {
  const router = useRouter();
  const [repos, setRepos] = useState<AppRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadRepos() {
      const response = await fetch("/api/repos", { cache: "no-store" });

      if (!response.ok) {
        if (mounted) {
          setError("Không tải được danh sách app. Kiểm tra lại Supabase hoặc API.");
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
      <div className="rounded-[32px] border border-[#E31F26]/10 bg-white p-6 shadow-[0_24px_80px_rgba(44,43,43,0.08)]">
        <div className="mb-5 flex items-center gap-3 text-sm font-bold text-[#E31F26]">
          <LoaderCircle className="size-4 animate-spin" />
          Đang tải danh sách app...
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {[0, 1, 2].map((item) => (
            <div
              key={item}
              className="h-64 animate-pulse rounded-[28px] border border-[#E31F26]/10 bg-gradient-to-br from-[#fff4ef] via-white to-[#ffe9df]"
            />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-[32px] border border-[#E31F26]/20 bg-[#fff4ef] p-8 shadow-[0_24px_80px_rgba(227,31,38,0.12)]">
        <div className="flex items-start gap-4">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[#E31F26] text-white">
            !
          </span>
          <div>
            <p className="text-xl font-extrabold text-[#2C2B2B]">Không thể tải dữ liệu</p>
            <p className="mt-2 max-w-2xl text-base font-medium text-[#58595B]">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (repos.length === 0) {
    return (
      <div className="rounded-[32px] border border-dashed border-[#E31F26]/30 bg-white p-10 text-center shadow-[0_24px_80px_rgba(44,43,43,0.08)]">
        <div className="mx-auto flex size-16 items-center justify-center rounded-3xl bg-[#E31F26]/10 text-[#E31F26]">
          <PackageSearch className="size-8" />
        </div>
        <p className="mt-5 text-2xl font-extrabold text-[#2C2B2B]">Chưa có app nào</p>
        <p className="mx-auto mt-2 max-w-xl text-base font-medium text-[#58595B]">
          Bấm <span className="font-extrabold text-[#E31F26]">Thêm app mới</span> để tạo landing
          page đầu tiên cho repository nội bộ.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {repos.map((repo) => {
        const featured = isFeaturedRepo(repo);
        const visibleTags = repo.tags.slice(0, 4);
        const hiddenTags = Math.max(repo.tags.length - visibleTags.length, 0);

        return (
          <Card
            key={repo.id}
            role="link"
            tabIndex={0}
            aria-label={`Mở landing page ${repo.name}`}
            onClick={(event) => {
              if (isInteractiveElement(event.target)) return;
              router.push(`/apps/${repo.slug}`);
            }}
            onKeyDown={(event) => {
              if (isInteractiveElement(event.target)) return;
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                router.push(`/apps/${repo.slug}`);
              }
            }}
            className={`relative min-h-[360px] cursor-pointer rounded-[30px] border bg-white py-0 shadow-[0_24px_70px_rgba(44,43,43,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_90px_rgba(227,31,38,0.16)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#E31F26]/25 ${
              featured ? "border-[#E31F26]/35 ring-4 ring-[#E31F26]/10" : "border-[#E31F26]/10"
            }`}
          >
            <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-[#E31F26] via-[#ff7a45] to-[#ffd3bd]" />
            <CardHeader className="gap-4 px-6 pt-7">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <Badge className="h-7 rounded-full bg-[#E31F26] px-3 text-sm font-extrabold text-white hover:bg-[#c8181f]">
                  {repo.category}
                </Badge>
                {featured ? (
                  <Badge className="h-7 rounded-full bg-[#fff0e8] px-3 text-sm font-extrabold text-[#E31F26] hover:bg-[#ffe4d6]">
                    <Sparkles className="size-3.5" />
                    Landing mới
                  </Badge>
                ) : null}
              </div>
              <div>
                <p className="mb-2 font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#E31F26]/70">
                  /apps/{repo.slug}
                </p>
                <CardTitle className="text-2xl font-extrabold leading-tight text-[#2C2B2B]">
                  {repo.name}
                </CardTitle>
              </div>
              <CardDescription className="line-clamp-3 text-base font-medium leading-7 text-[#58595B]">
                {repo.shortDescription}
              </CardDescription>
            </CardHeader>

            <CardContent className="flex flex-1 flex-col gap-4 px-6">
              <a
                href={repo.githubUrl}
                target="_blank"
                rel="noreferrer"
                onClick={(event) => event.stopPropagation()}
                className="flex items-center gap-3 rounded-2xl border border-[#2C2B2B]/10 bg-[#fff9f5] px-4 py-3 text-sm font-bold text-[#2C2B2B] transition hover:border-[#E31F26]/30 hover:bg-[#fff0e8]"
              >
                <GitBranch className="size-4 shrink-0 text-[#E31F26]" />
                <span className="truncate">{repoHandle(repo.githubUrl)}</span>
                <ExternalLink className="ml-auto size-4 shrink-0 text-[#58595B]" />
              </a>

              <div className="flex flex-wrap gap-2">
                {visibleTags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-[#fff0e8] px-3 py-1 text-sm font-bold text-[#E31F26]"
                  >
                    #{tag}
                  </span>
                ))}
                {hiddenTags > 0 ? (
                  <span className="rounded-full bg-[#2C2B2B]/5 px-3 py-1 text-sm font-bold text-[#58595B]">
                    +{hiddenTags}
                  </span>
                ) : null}
              </div>
            </CardContent>

            <CardFooter className="mt-auto flex items-center justify-end gap-3 border-t border-[#E31F26]/10 bg-[#fffaf7] p-5">
              <DeleteRepoButton
                id={repo.id}
                onDeleted={() => setRepos((prev) => prev.filter((item) => item.id !== repo.id))}
              />
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
