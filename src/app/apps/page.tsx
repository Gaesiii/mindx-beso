import Link from "next/link";
import { ArrowRight, Rocket, Sparkles } from "lucide-react";
import { MindxBrand } from "@/components/apps/mindx-brand";
import { ReposGrid } from "@/components/apps/repos-grid";
import { buttonVariants } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default function AppsDirectoryPage() {
  return (
    <main className="min-h-svh overflow-hidden bg-[#fff8f2] text-[#2C2B2B]">
      <section className="relative">
        <div className="absolute left-[-12rem] top-[-10rem] size-[32rem] rounded-full bg-[#E31F26]/15 blur-3xl" />
        <div className="absolute right-[-10rem] top-24 size-[28rem] rounded-full bg-[#ffb288]/25 blur-3xl" />
        <div className="absolute bottom-[-12rem] left-1/2 size-[30rem] -translate-x-1/2 rounded-full bg-white blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-36 bg-white" />

        <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 py-6 sm:px-6 lg:px-8">
          <header className="flex flex-wrap items-center justify-between gap-4 rounded-[28px] border border-white/80 bg-white/90 px-4 py-3 shadow-[0_18px_60px_rgba(44,43,43,0.08)] backdrop-blur md:px-5">
            <MindxBrand />
            <div className="flex items-center gap-3">
              <a
                href="#catalog"
                className="hidden rounded-full px-4 py-2 text-sm font-extrabold text-[#58595B] transition hover:bg-[#fff0e8] hover:text-[#E31F26] sm:inline-flex"
              >
                Xem danh sách
              </a>
              <Link
                href="/apps/new"
                className={buttonVariants({
                  size: "lg",
                  className:
                    "h-11 rounded-full bg-[#E31F26] px-5 text-sm font-extrabold text-white shadow-[0_14px_34px_rgba(227,31,38,0.32)] hover:bg-[#c8181f]",
                })}
              >
                Thêm app mới
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </header>

          <div className="relative overflow-hidden rounded-[46px] border border-white/80 bg-white/70 px-5 py-12 shadow-[0_30px_110px_rgba(44,43,43,0.1)] backdrop-blur sm:px-8 lg:px-12 lg:py-16">
            <div className="absolute right-[-5rem] top-[-5rem] size-56 rounded-full bg-[#E31F26]/10" />
            <div className="absolute bottom-[-7rem] left-[-5rem] size-64 rounded-full bg-[#ffb288]/20" />
            <div className="absolute right-10 top-16 hidden h-24 w-24 rotate-12 rounded-[28px] border border-[#E31F26]/15 bg-[#fff0e8] lg:block" />

            <div className="relative mx-auto max-w-5xl text-center">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#E31F26]/15 bg-white px-4 py-2 text-sm font-extrabold uppercase tracking-[0.18em] text-[#E31F26] shadow-[0_12px_34px_rgba(227,31,38,0.12)]">
                <Rocket className="size-4" />
                MindX Internal Apps
              </div>
              <h1 className="text-5xl font-black leading-[0.95] tracking-tight text-[#2C2B2B] sm:text-6xl lg:text-7xl">
                Danh sách app nội bộ của MindX
              </h1>
              <p className="mx-auto mt-6 max-w-3xl text-lg font-medium leading-8 text-[#58595B]">
                Hub quản lý repository và landing page cho các công cụ nội bộ. Giao diện giữ đúng
                tinh thần MindX: rõ ràng, năng động, nhiều khoảng thở và điều hướng trực tiếp tới
                từng app.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <a
                  href="#catalog"
                  className="inline-flex h-12 items-center justify-center rounded-full bg-[#E31F26] px-6 text-sm font-extrabold text-white shadow-[0_16px_40px_rgba(227,31,38,0.32)] transition hover:-translate-y-0.5 hover:bg-[#c8181f]"
                >
                  Khám phá app
                  <ArrowRight className="ml-2 size-4" />
                </a>
                <Link
                  href="/apps/new"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-[#E31F26]/20 bg-white px-6 text-sm font-extrabold text-[#E31F26] transition hover:-translate-y-0.5 hover:bg-[#fff0e8]"
                >
                  Tạo landing page
                </Link>
              </div>
            </div>

            <div className="relative mx-auto mt-10 grid max-w-4xl gap-3 sm:grid-cols-3">
              {["Repository", "Landing page", "Preview safe"].map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-center gap-2 rounded-2xl border border-[#E31F26]/10 bg-white/80 px-4 py-3 text-sm font-extrabold text-[#2C2B2B] shadow-[0_12px_34px_rgba(44,43,43,0.06)]"
                >
                  <Sparkles className="size-4 text-[#E31F26]" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="catalog" className="relative mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-[#E31F26]">
              App Catalog
            </p>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-[#2C2B2B] sm:text-4xl">
              Landing page đang quản lý
            </h2>
          </div>
          <p className="max-w-lg text-base font-medium leading-7 text-[#58595B]">
            Bấm trực tiếp vào card để mở landing page của từng app. Link GitHub vẫn mở repository
            riêng ở tab mới.
          </p>
        </div>

        <ReposGrid />
      </section>
    </main>
  );
}
