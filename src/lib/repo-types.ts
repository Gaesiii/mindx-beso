export type AppRepo = {
  id: string;
  slug: string;
  name: string;
  githubUrl: string;
  shortDescription: string;
  category: string;
  tags: string[];
  readmeSource?: string;
  usageGuide?: string;
  createdAt: string;
  updatedAt: string;
};

export type AppRepoCreateInput = {
  name: string;
  githubUrl: string;
  shortDescription: string;
  category: string;
  tags?: string[];
  readmeSource?: string;
  usageGuide?: string;
};

export type AppRepoUpdateInput = Partial<AppRepoCreateInput>;
