import type { ComponentType } from "react";

type ToolDocModule = {
  default: ComponentType;
  metadata?: {
    owner?: string;
    updatedAt?: string;
  };
};

const toolDocLoaders = {
  "build-monitor": () => import("@/content/tools/build-monitor.mdx"),
  "release-downloader": () => import("@/content/tools/release-downloader.mdx"),
} as const;

export async function loadToolDoc(slug: string): Promise<ToolDocModule | null> {
  const loader = toolDocLoaders[slug as keyof typeof toolDocLoaders];
  if (!loader) {
    return null;
  }

  return (await loader()) as ToolDocModule;
}
