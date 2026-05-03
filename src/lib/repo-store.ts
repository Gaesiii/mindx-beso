import type { AppRepo, AppRepoCreateInput, AppRepoUpdateInput } from "@/lib/repo-types";

const githubRepoRegex = /^https:\/\/github\.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+\/?$/i;

const initialRepos: AppRepo[] = [];

let repos = [...initialRepos];

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function createUniqueSlug(name: string): string {
  const base = slugify(name) || "app";
  let slug = base;
  let index = 2;

  while (repos.some((repo) => repo.slug === slug)) {
    slug = `${base}-${index}`;
    index += 1;
  }

  return slug;
}

function normalizeTags(tags?: string[]): string[] {
  if (!tags) return [];
  return [...new Set(tags.map((tag) => tag.trim().toLowerCase()).filter(Boolean))];
}

function assertCreateInput(input: AppRepoCreateInput): { ok: true } {
  if (!input.name?.trim()) throw new Error("name is required");
  if (!input.shortDescription?.trim()) throw new Error("shortDescription is required");
  if (!input.category?.trim()) throw new Error("category is required");
  if (!input.githubUrl?.trim()) throw new Error("githubUrl is required");
  if (!githubRepoRegex.test(input.githubUrl.trim())) {
    throw new Error("githubUrl must be a valid GitHub repository URL");
  }
  return { ok: true };
}

function assertUpdateInput(input: AppRepoUpdateInput): { ok: true } {
  if (input.githubUrl && !githubRepoRegex.test(input.githubUrl.trim())) {
    throw new Error("githubUrl must be a valid GitHub repository URL");
  }
  return { ok: true };
}

export function listRepos(): AppRepo[] {
  return [...repos].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export function getRepoById(id: string): AppRepo | undefined {
  return repos.find((repo) => repo.id === id);
}

export function getRepoBySlug(slug: string): AppRepo | undefined {
  return repos.find((repo) => repo.slug === slug);
}

export function createRepo(input: AppRepoCreateInput): AppRepo {
  assertCreateInput(input);
  const now = new Date().toISOString();

  const repo: AppRepo = {
    id: crypto.randomUUID(),
    slug: createUniqueSlug(input.name),
    name: input.name.trim(),
    githubUrl: input.githubUrl.trim(),
    shortDescription: input.shortDescription.trim(),
    category: input.category.trim(),
    tags: normalizeTags(input.tags),
    readmeSource: input.readmeSource?.trim() || "github",
    usageGuide: input.usageGuide?.trim() || "",
    createdAt: now,
    updatedAt: now,
  };

  repos = [repo, ...repos];
  return repo;
}

export function updateRepo(id: string, input: AppRepoUpdateInput): AppRepo | null {
  assertUpdateInput(input);
  const index = repos.findIndex((repo) => repo.id === id);
  if (index === -1) return null;

  const current = repos[index];
  const nextName = input.name?.trim();
  const nextSlug =
    nextName && nextName !== current.name ? createUniqueSlug(nextName) : current.slug;

  const updated: AppRepo = {
    ...current,
    slug: nextSlug,
    name: nextName ?? current.name,
    githubUrl: input.githubUrl?.trim() ?? current.githubUrl,
    shortDescription: input.shortDescription?.trim() ?? current.shortDescription,
    category: input.category?.trim() ?? current.category,
    tags: input.tags ? normalizeTags(input.tags) : current.tags,
    readmeSource: input.readmeSource?.trim() ?? current.readmeSource,
    usageGuide: input.usageGuide?.trim() ?? current.usageGuide,
    updatedAt: new Date().toISOString(),
  };

  repos = repos.map((repo) => (repo.id === id ? updated : repo));
  return updated;
}

export function deleteRepo(id: string): boolean {
  const before = repos.length;
  repos = repos.filter((repo) => repo.id !== id);
  return repos.length < before;
}
