export type GitHubReleaseAsset = {
  id: number;
  name: string;
  browser_download_url: string;
  size: number;
  download_count: number;
};

export type GitHubRelease = {
  id: number;
  html_url: string;
  tag_name: string;
  name: string | null;
  published_at: string | null;
  assets: GitHubReleaseAsset[];
};

export async function getLatestRelease(
  owner: string,
  repo: string
): Promise<GitHubRelease | null> {
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2026-03-10",
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/releases/latest`,
    {
      headers,
      next: { revalidate: 1800 },
    }
  );

  if (!response.ok) {
    return null;
  }

  return (await response.json()) as GitHubRelease;
}
