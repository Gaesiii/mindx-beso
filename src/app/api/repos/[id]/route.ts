import { NextResponse } from "next/server";
import { deleteRepo, getRepoById, updateRepo } from "@/lib/repo-store";
import type { AppRepoUpdateInput } from "@/lib/repo-types";

type RouteProps = {
  params: Promise<{ id: string }>;
};

export async function GET(_: Request, { params }: RouteProps) {
  const { id } = await params;
  const repo = await getRepoById(id);
  if (!repo) {
    return NextResponse.json({ error: "repo not found" }, { status: 404 });
  }
  return NextResponse.json({ data: repo });
}

export async function PATCH(request: Request, { params }: RouteProps) {
  const { id } = await params;

  try {
    const body = (await request.json()) as AppRepoUpdateInput;
    const repo = await updateRepo(id, body);
    if (!repo) {
      return NextResponse.json({ error: "repo not found" }, { status: 404 });
    }
    return NextResponse.json({ data: repo });
  } catch (error) {
    const message = error instanceof Error ? error.message : "failed to update repo";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function DELETE(_: Request, { params }: RouteProps) {
  const { id } = await params;
  const deleted = await deleteRepo(id);
  if (!deleted) {
    return NextResponse.json({ error: "repo not found" }, { status: 404 });
  }
  return NextResponse.json({ success: true });
}
