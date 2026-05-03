import { NextResponse } from "next/server";
import { createRepo, listRepos } from "@/lib/repo-store";
import type { AppRepoCreateInput } from "@/lib/repo-types";

export async function GET() {
  return NextResponse.json({ data: listRepos() });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as AppRepoCreateInput;
    const repo = createRepo(body);
    return NextResponse.json({ data: repo }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "failed to create repo";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
