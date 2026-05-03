import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex min-h-svh items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md rounded-2xl border bg-white p-8 text-center shadow-sm">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Resource Not Found</h1>
        <p className="mt-2 text-sm text-slate-600">
          The requested tool or document does not exist in this hub.
        </p>
        <Link href="/" className={`${buttonVariants({ size: "sm" })} mt-5 inline-flex`}>
          Return To Hub
        </Link>
      </div>
    </main>
  );
}
