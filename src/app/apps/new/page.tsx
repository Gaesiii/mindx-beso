import Link from "next/link";
import { AddRepoForm } from "@/components/apps/add-repo-form";
import { MindxBrand } from "@/components/apps/mindx-brand";
import { buttonVariants } from "@/components/ui/button";

export default function AddRepoPage() {
  return (
    <main className="min-h-svh bg-gradient-to-b from-red-50 via-white to-slate-100">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 py-8">
        <header className="rounded-2xl border border-red-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
            <MindxBrand />
            <Link href="/apps" className={buttonVariants({ variant: "outline", size: "sm" })}>
              Back To Repositories
            </Link>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
            Add New Repository
          </h1>
          <p className="mt-3 text-lg text-slate-600">
            Enter GitHub repository URL and metadata to generate a dedicated app landing page.
          </p>
        </header>

        <AddRepoForm />
      </div>
    </main>
  );
}
