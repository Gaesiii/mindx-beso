import Image from "next/image";
import Link from "next/link";

export function MindxBrand() {
  return (
    <Link href="/apps" className="inline-flex items-center gap-3">
      <span className="flex h-12 items-center rounded-2xl bg-white px-3 shadow-[0_10px_30px_rgba(227,31,38,0.12)] ring-1 ring-[#E31F26]/10">
        <Image
          src="/mindx-logo.svg"
          alt="MindX Technology School"
          width={92}
          height={40}
          priority
          className="h-8 w-auto"
        />
      </span>
      <span className="hidden sm:block">
        <span className="block text-sm font-extrabold uppercase tracking-[0.24em] text-[#E31F26]">
          Apps Hub
        </span>
        <span className="block text-sm font-semibold text-[#58595B]">Công cụ nội bộ</span>
      </span>
    </Link>
  );
}
