import { Pool, type QueryResult, type QueryResultRow } from "pg";

declare global {
  var __repoPool: Pool | undefined;
  var __repoSchemaReady: Promise<void> | undefined;
}

function getPool(): Pool {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is not configured");
  }

  if (!globalThis.__repoPool) {
    const useSsl =
      connectionString.includes("supabase.co") ||
      connectionString.includes("sslmode=require");

    globalThis.__repoPool = new Pool({
      connectionString,
      ssl: useSsl ? { rejectUnauthorized: false } : undefined,
    });
  }

  return globalThis.__repoPool;
}

async function ensureSchema(): Promise<void> {
  if (!globalThis.__repoSchemaReady) {
    const pool = getPool();
    globalThis.__repoSchemaReady = pool
      .query(`
        CREATE TABLE IF NOT EXISTS app_repos (
          id UUID PRIMARY KEY,
          slug TEXT UNIQUE NOT NULL,
          name TEXT NOT NULL,
          github_url TEXT NOT NULL,
          short_description TEXT NOT NULL,
          category TEXT NOT NULL,
          tags TEXT[] NOT NULL DEFAULT '{}'::TEXT[],
          readme_source TEXT,
          usage_guide TEXT,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );
      `)
      .then(() => undefined)
      .catch((error) => {
        globalThis.__repoSchemaReady = undefined;
        throw error;
      });
  }

  await globalThis.__repoSchemaReady;
}

export async function dbQuery<T extends QueryResultRow = QueryResultRow>(
  text: string,
  params: unknown[] = []
): Promise<QueryResult<T>> {
  await ensureSchema();
  return getPool().query<T>(text, params);
}
