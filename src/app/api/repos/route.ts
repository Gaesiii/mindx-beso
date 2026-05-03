import { NextResponse } from "next/server";
import { createRepo, getRepoBySlug, listRepos } from "@/lib/repo-store";
import type { AppRepoCreateInput } from "@/lib/repo-types";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const slug = url.searchParams.get("slug");

  if (slug) {
    const repo = await getRepoBySlug(slug);
    return NextResponse.json({ data: repo ?? null });
  }

  return NextResponse.json({ data: await listRepos() });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as AppRepoCreateInput;
    const repo = await createRepo(body);
    return NextResponse.json({ data: repo }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "failed to create repo";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
