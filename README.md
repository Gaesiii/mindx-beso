# MindX Internal Tool Hub

Next.js (App Router) web hub for managing internal tool repositories and rendering dynamic app landing pages.

## Architecture Overview

- **Frontend:** Next.js App Router + Tailwind CSS + shadcn/ui components.
- **Data layer (current):** PostgreSQL (Supabase) via `pg` in `src/lib/repo-store.ts`.
- **Data layer (optional path):** Prisma schema included at `prisma/schema.prisma`.
- **API style:** Route Handlers in `app/api` for repository CRUD.
- **Dynamic pages:** `/apps/[slug]` renders a dedicated landing page per repository.
- **Auth:** none (public access).

## App & API Routes

- `GET /apps` -> repository directory.
- `GET /apps/new` -> Add Repo form page.
- `GET /apps/[slug]` -> dynamic landing page for a selected app.
- `GET /api/repos` -> list repositories.
- `POST /api/repos` -> create repository.
- `GET /api/repos/[id]` -> get repository by id.
- `PATCH /api/repos/[id]` -> update repository.
- `DELETE /api/repos/[id]` -> delete repository.

## Folder Structure

```text
src/
  app/
    api/
      repos/
        route.ts
        [id]/
          route.ts
    apps/
      page.tsx
      new/
        page.tsx
      [slug]/
        page.tsx
    page.tsx
    layout.tsx
    globals.css
  components/
    apps/
      add-repo-form.tsx
      delete-repo-button.tsx
      repos-grid.tsx
      app-landing.tsx
      mindx-brand.tsx
    ui/
      button.tsx
      card.tsx
      badge.tsx
  lib/
    repo-db.ts
    repo-types.ts
    repo-store.ts
prisma/
  schema.prisma
```

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000` (auto-redirects to `/apps`).

Create `.env.local` and set:

```env
DATABASE_URL=postgresql://...
```

## CRUD Data Flow

1. User submits **Add Repo** form on `/apps/new`.
2. Client component sends `POST /api/repos` with GitHub URL + metadata.
3. Route Handler validates payload and writes into PostgreSQL.
4. UI refreshes and navigates to `/apps/[slug]`.
5. Dynamic page reads the repo entity by slug and displays:
   - Hero/metadata
   - README rendering placeholder
   - Usage guide placeholder

## Prisma Migration Path (Optional)

1. Install Prisma dependencies.
2. Set `DATABASE_URL` in `.env`.
3. Run migrations against Supabase Postgres.
4. Replace `repo-store.ts` functions with Prisma client calls in route handlers.
