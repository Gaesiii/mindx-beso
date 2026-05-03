import Image from "next/image";
import Link from "next/link";

export function MindxBrand() {
  return (
    <Link href="/apps" className="inline-flex items-center gap-3">
      <Image src="/mindx-logo.svg" alt="MindX logo" width={40} height={40} className="rounded-xl" />
      <div>
        <p className="text-base font-extrabold tracking-wide text-red-700 uppercase">MindX</p>
        <p className="text-sm font-semibold text-slate-700">Internal Tool Hub</p>
      </div>
    </Link>
  );
}
