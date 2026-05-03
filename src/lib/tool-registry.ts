export type Tool = {
  slug: string;
  name: string;
  summary: string;
  category: string;
  repositoryUrl: string;
  downloadUrl?: string;
  github?: {
    owner: string;
    repo: string;
  };
};

export const tools: Tool[] = [
  {
    slug: "build-monitor",
    name: "Build Monitor",
    summary: "Track CI build health across internal repositories in one view.",
    category: "Engineering",
    repositoryUrl: "https://github.com/your-org/build-monitor",
    github: { owner: "your-org", repo: "build-monitor" },
  },
  {
    slug: "release-downloader",
    name: "Release Downloader",
    summary: "Fetch and download released artifacts from approved repositories.",
    category: "Operations",
    repositoryUrl: "https://github.com/your-org/release-downloader",
    downloadUrl: "https://github.com/your-org/release-downloader/releases/latest",
    github: { owner: "your-org", repo: "release-downloader" },
  },
];

export const toolBySlug = new Map(tools.map((tool) => [tool.slug, tool]));

export const categories = ["All", ...new Set(tools.map((tool) => tool.category))];
