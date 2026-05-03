import { randomUUID } from "crypto";
import { dbQuery } from "@/lib/repo-db";
import type { AppRepo, AppRepoCreateInput, AppRepoUpdateInput } from "@/lib/repo-types";

const githubRepoRegex = /^https:\/\/github\.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+\/?$/i;

type RepoRow = {
  id: string;
  slug: string;
  name: string;
  githubUrl: string;
  shortDescription: string;
  category: string;
  tags: string[];
  readmeSource: string | null;
  usageGuide: string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
};

function rowToRepo(row: RepoRow): AppRepo {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    githubUrl: row.githubUrl,
    shortDescription: row.shortDescription,
    category: row.category,
    tags: row.tags ?? [],
    readmeSource: row.readmeSource ?? undefined,
    usageGuide: row.usageGuide ?? undefined,
    createdAt: new Date(row.createdAt).toISOString(),
    updatedAt: new Date(row.updatedAt).toISOString(),
  };
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizeTags(tags?: string[]): string[] {
  if (!tags) return [];
  return [...new Set(tags.map((tag) => tag.trim().toLowerCase()).filter(Boolean))];
}

function assertCreateInput(input: AppRepoCreateInput): void {
  if (!input.name?.trim()) throw new Error("name is required");
  if (!input.shortDescription?.trim()) throw new Error("shortDescription is required");
  if (!input.category?.trim()) throw new Error("category is required");
  if (!input.githubUrl?.trim()) throw new Error("githubUrl is required");
  if (!githubRepoRegex.test(input.githubUrl.trim())) {
    throw new Error("githubUrl must be a valid GitHub repository URL");
  }
}

function assertUpdateInput(input: AppRepoUpdateInput): void {
  if (input.githubUrl && !githubRepoRegex.test(input.githubUrl.trim())) {
    throw new Error("githubUrl must be a valid GitHub repository URL");
  }
}

async function slugExists(slug: string, excludeId?: string): Promise<boolean> {
  const sql = excludeId
    ? `SELECT 1 FROM app_repos WHERE slug = $1 AND id <> $2 LIMIT 1`
    : `SELECT 1 FROM app_repos WHERE slug = $1 LIMIT 1`;
  const params = excludeId ? [slug, excludeId] : [slug];
  const result = await dbQuery(sql, params);
  return (result.rowCount ?? result.rows.length) > 0;
}

async function createUniqueSlug(name: string, excludeId?: string): Promise<string> {
  const base = slugify(name) || "app";
  let slug = base;
  let index = 2;

  while (await slugExists(slug, excludeId)) {
    slug = `${base}-${index}`;
    index += 1;
  }

  return slug;
}

function repoSelectSql() {
  return `
    SELECT
      id,
      slug,
      name,
      github_url AS "githubUrl",
      short_description AS "shortDescription",
      category,
      tags,
      readme_source AS "readmeSource",
      usage_guide AS "usageGuide",
      created_at AS "createdAt",
      updated_at AS "updatedAt"
    FROM app_repos
  `;
}

export async function listRepos(): Promise<AppRepo[]> {
  const result = await dbQuery<RepoRow>(`${repoSelectSql()} ORDER BY updated_at DESC`);
  return result.rows.map(rowToRepo);
}

export async function getRepoById(id: string): Promise<AppRepo | undefined> {
  const result = await dbQuery<RepoRow>(`${repoSelectSql()} WHERE id = $1 LIMIT 1`, [id]);
  return result.rows[0] ? rowToRepo(result.rows[0]) : undefined;
}

export async function getRepoBySlug(slug: string): Promise<AppRepo | undefined> {
  const result = await dbQuery<RepoRow>(`${repoSelectSql()} WHERE slug = $1 LIMIT 1`, [slug]);
  return result.rows[0] ? rowToRepo(result.rows[0]) : undefined;
}

export async function createRepo(input: AppRepoCreateInput): Promise<AppRepo> {
  assertCreateInput(input);
  const slug = await createUniqueSlug(input.name);
  const tags = normalizeTags(input.tags);
  const id = randomUUID();

  const result = await dbQuery<RepoRow>(
    `
      INSERT INTO app_repos (
        id,
        slug,
        name,
        github_url,
        short_description,
        category,
        tags,
        readme_source,
        usage_guide
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7::text[], $8, $9)
      RETURNING
        id,
        slug,
        name,
        github_url AS "githubUrl",
        short_description AS "shortDescription",
        category,
        tags,
        readme_source AS "readmeSource",
        usage_guide AS "usageGuide",
        created_at AS "createdAt",
        updated_at AS "updatedAt"
    `,
    [
      id,
      slug,
      input.name.trim(),
      input.githubUrl.trim(),
      input.shortDescription.trim(),
      input.category.trim(),
      tags,
      input.readmeSource?.trim() || "github",
      input.usageGuide?.trim() || "",
    ]
  );

  return rowToRepo(result.rows[0]);
}

export async function updateRepo(
  id: string,
  input: AppRepoUpdateInput
): Promise<AppRepo | null> {
  assertUpdateInput(input);
  const current = await getRepoById(id);
  if (!current) return null;

  const nextName = input.name?.trim() ?? current.name;
  const nextSlug =
    input.name && input.name.trim() !== current.name
      ? await createUniqueSlug(input.name, id)
      : current.slug;

  const result = await dbQuery<RepoRow>(
    `
      UPDATE app_repos
      SET
        slug = $2,
        name = $3,
        github_url = $4,
        short_description = $5,
        category = $6,
        tags = $7::text[],
        readme_source = $8,
        usage_guide = $9,
        updated_at = NOW()
      WHERE id = $1
      RETURNING
        id,
        slug,
        name,
        github_url AS "githubUrl",
        short_description AS "shortDescription",
        category,
        tags,
        readme_source AS "readmeSource",
        usage_guide AS "usageGuide",
        created_at AS "createdAt",
        updated_at AS "updatedAt"
    `,
    [
      id,
      nextSlug,
      nextName,
      input.githubUrl?.trim() ?? current.githubUrl,
      input.shortDescription?.trim() ?? current.shortDescription,
      input.category?.trim() ?? current.category,
      input.tags ? normalizeTags(input.tags) : current.tags,
      input.readmeSource?.trim() ?? current.readmeSource ?? "github",
      input.usageGuide?.trim() ?? current.usageGuide ?? "",
    ]
  );

  if (!result.rows[0]) return null;
  return rowToRepo(result.rows[0]);
}

export async function deleteRepo(id: string): Promise<boolean> {
  const result = await dbQuery(`DELETE FROM app_repos WHERE id = $1`, [id]);
  return (result.rowCount ?? 0) > 0;
}
