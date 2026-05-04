import Link from "next/link";
import { ArrowRight, BookOpenCheck, Layers3, Rocket, ShieldCheck } from "lucide-react";
import { MindxBrand } from "@/components/apps/mindx-brand";
import { ReposGrid } from "@/components/apps/repos-grid";
import { buttonVariants } from "@/components/ui/button";

export const dynamic = "force-dynamic";

const principles = [
  {
    icon: Layers3,
    title: "Một nơi cho mọi app",
    description: "Tập trung repository, landing page, tài liệu README và hướng dẫn sử dụng.",
  },
  {
    icon: ShieldCheck,
    title: "Preview trước khi lên production",
    description: "Mọi thay đổi UI và content được kiểm thử trên nhánh test trước khi promote.",
  },
  {
    icon: BookOpenCheck,
    title: "Dễ hiểu cho team vận hành",
    description: "Mô tả ngắn gọn, tag rõ ràng và CTA trực tiếp tới từng landing page.",
  },
];

export default function AppsDirectoryPage() {
  return (
    <main className="min-h-svh overflow-hidden bg-[#fff8f2] text-[#2C2B2B]">
      <section className="relative">
        <div className="absolute left-[-12rem] top-[-10rem] size-[32rem] rounded-full bg-[#E31F26]/15 blur-3xl" />
        <div className="absolute right-[-10rem] top-28 size-[28rem] rounded-full bg-[#ffb288]/25 blur-3xl" />
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

          <div className="grid items-center gap-8 py-4 lg:grid-cols-[1.05fr_0.95fr] lg:py-10">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#E31F26]/15 bg-white px-4 py-2 text-sm font-extrabold uppercase tracking-[0.18em] text-[#E31F26] shadow-[0_12px_34px_rgba(227,31,38,0.12)]">
                <Rocket className="size-4" />
                MindX Internal Apps
              </div>
              <h1 className="max-w-4xl text-5xl font-black leading-[0.95] tracking-tight text-[#2C2B2B] sm:text-6xl lg:text-7xl">
                Danh sách app nội bộ của MindX
              </h1>
              <p className="mt-6 max-w-2xl text-lg font-medium leading-8 text-[#58595B]">
                Hub quản lý repository và landing page cho các công cụ nội bộ. Giao diện được làm
                theo tinh thần MindX: rõ ràng, năng động, nhiều khoảng thở và CTA nổi bật.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
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

            <div className="relative">
              <div className="absolute inset-0 rotate-3 rounded-[42px] bg-[#E31F26]" />
              <div className="relative overflow-hidden rounded-[42px] border border-white/70 bg-white p-6 shadow-[0_30px_100px_rgba(44,43,43,0.16)]">
                <div className="absolute right-[-4rem] top-[-4rem] size-40 rounded-full bg-[#E31F26]/10" />
                <div className="mb-6 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-[#E31F26]">
                      Workflow
                    </p>
                    <h2 className="mt-2 text-3xl font-black text-[#2C2B2B]">
                      Quản lý app gọn hơn
                    </h2>
                  </div>
                  <span className="rounded-full bg-[#fff0e8] px-4 py-2 text-sm font-extrabold text-[#E31F26]">
                    Preview safe
                  </span>
                </div>

                <div className="space-y-3">
                  {principles.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={item.title}
                        className="flex gap-4 rounded-[26px] border border-[#2C2B2B]/10 bg-[#fffaf7] p-4"
                      >
                        <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[#E31F26] text-white shadow-[0_12px_28px_rgba(227,31,38,0.24)]">
                          <Icon className="size-5" />
                        </span>
                        <div>
                          <p className="text-lg font-extrabold text-[#2C2B2B]">{item.title}</p>
                          <p className="mt-1 text-sm font-medium leading-6 text-[#58595B]">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
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
            Mỗi card đại diện cho một repository đã kết nối Supabase và có trang landing riêng để
            team đọc nhanh trước khi sử dụng.
          </p>
        </div>

        <ReposGrid />
      </section>
    </main>
  );
}
