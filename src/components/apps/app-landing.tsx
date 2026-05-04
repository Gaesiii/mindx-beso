"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BellRing,
  BookOpen,
  Bot,
  CalendarCheck,
  ChartNoAxesColumnIncreasing,
  CheckCircle2,
  ClipboardCheck,
  Cloud,
  DatabaseZap,
  Gauge,
  GraduationCap,
  Keyboard,
  MessageSquareText,
  MonitorCheck,
  Route,
  ServerCog,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Users,
  Wallet,
  WifiOff,
  type LucideIcon,
} from "lucide-react";
import { MindxBrand } from "@/components/apps/mindx-brand";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { AppRepo } from "@/lib/repo-types";

type AppLandingProps = {
  slug: string;
};

type RepoResponse = { data: AppRepo | null };

type Feature = {
  title: string;
  description: string;
  icon: LucideIcon;
  accent: string;
};

const autoGraderFeatures: Feature[] = [
  {
    title: "Chấm điểm ít thao tác hơn",
    description:
      "Panel nổi tự nhận diện bảng điểm LMS và tick nhanh theo nhóm Giỏi, Khá, Trung bình.",
    icon: ClipboardCheck,
    accent: "from-rose-500 to-red-600",
  },
  {
    title: "Nhận xét AI sát buổi học",
    description:
      "Kết hợp từ khóa từng học sinh, nội dung buổi học và prompt giáo viên để tạo nhận xét tiếng Việt dễ đọc.",
    icon: Bot,
    accent: "from-amber-400 to-orange-600",
  },
  {
    title: "Batch comment nhiều học sinh",
    description:
      "Tạo nhận xét theo lô, mở dialog từng học sinh, điền nội dung và lưu lại theo quy trình có kiểm soát.",
    icon: Users,
    accent: "from-sky-500 to-cyan-600",
  },
  {
    title: "Ngân hàng báo cáo Zalo",
    description:
      "Chọn môn, khóa, buổi học để copy hoặc chèn nhanh mẫu báo cáo từ cloud vào nơi đang soạn.",
    icon: Cloud,
    accent: "from-emerald-500 to-teal-600",
  },
  {
    title: "Quản lý trial task",
    description:
      "Popup riêng để xem học viên trial được giao, lưu draft, đánh dấu vắng và submit kết quả về API.",
    icon: GraduationCap,
    accent: "from-indigo-500 to-blue-700",
  },
  {
    title: "Phím tắt cho vận hành nhanh",
    description:
      "Cấu hình phím dán macro, mở cây báo cáo và bật/tắt extension ngay trên trang đang làm việc.",
    icon: Keyboard,
    accent: "from-slate-700 to-slate-950",
  },
];

const autoGraderSteps = [
  "Cài extension bằng Load unpacked trong Chrome.",
  "Vào Settings để cấu hình user identity, AI provider và prompt nhận xét.",
  "Mở LMS, chọn bài/học sinh cần chấm và dùng panel nổi để tick điểm hoặc tạo nhận xét.",
  "Dùng batch mode khi cần xử lý nhiều học sinh trong cùng buổi học.",
  "Mở popup Trial Task Manager để lưu draft, submit task hoặc thêm học viên phát sinh.",
];

const autoGraderAudiences = [
  "Giáo viên cần chấm bài đều form nhưng vẫn muốn nhận xét cá nhân hóa.",
  "Academic Ops cần giảm thao tác lặp khi xử lý danh sách học viên lớn.",
  "Team vận hành trial class cần gom thông tin học viên, trạng thái và feedback về một flow.",
];

const smoothBridgeFeatures: Feature[] = [
  {
    title: "Mobile dashboard cho lớp đang chạy",
    description:
      "Flutter app gom lớp học, lịch gần tới và trạng thái vận hành vào một giao diện nhẹ hơn LMS web.",
    icon: Smartphone,
    accent: "from-[#E31F26] to-[#ff7043]",
  },
  {
    title: "Backend bridge cho LMS GraphQL",
    description:
      "Node.js + Express đứng giữa mobile và LMS, reshape payload nặng thành JSON gọn, ổn định hơn cho app.",
    icon: ServerCog,
    accent: "from-slate-900 to-[#E31F26]",
  },
  {
    title: "Điểm danh và comment học viên",
    description:
      "API hỗ trợ đọc/sửa comment theo slot, lưu attendance và giữ luồng review trước khi submit.",
    icon: MessageSquareText,
    accent: "from-amber-500 to-orange-600",
  },
  {
    title: "Nhắc việc vận hành",
    description:
      "Push notifier theo thiết bị cho slot sắp mở, lớp còn thiếu comment và các tác vụ cần xử lý đúng giờ.",
    icon: BellRing,
    accent: "from-rose-500 to-red-700",
  },
  {
    title: "Payroll theo tháng",
    description:
      "Mobile đọc bảng lương tháng qua backend, có cache để thao tác mượt hơn trong bối cảnh mạng không ổn định.",
    icon: Wallet,
    accent: "from-emerald-500 to-teal-700",
  },
  {
    title: "Cache và prewarm hằng ngày",
    description:
      "Dashboard overview có cache MongoDB và cron prewarm lúc nửa đêm Việt Nam để giảm thời gian chờ đầu ngày.",
    icon: DatabaseZap,
    accent: "from-sky-500 to-blue-700",
  },
];

const smoothBridgeApiGroups = [
  {
    title: "Mobile auth",
    description: "Firebase REST verifyPassword, Bearer token, secure storage và session refresh.",
    icon: ShieldCheck,
  },
  {
    title: "Class operations",
    description: "Classes, dashboard overview, reminders, attendance slot và comment context.",
    icon: CalendarCheck,
  },
  {
    title: "Ops backend",
    description: "Device registration, notifier tick, public config, payroll và admin endpoints.",
    icon: Route,
  },
];

const smoothBridgeStack = ["Flutter", "Node.js 20", "Express", "MongoDB", "Firebase", "Vercel"];

function isAutoGraderRepo(repo: AppRepo): boolean {
  const source = `${repo.slug} ${repo.githubUrl} ${repo.name}`.toLowerCase();
  return source.includes("mindx-auto-grader-extension") || source.includes("auto-grader");
}

function isSmoothBridgeRepo(repo: AppRepo): boolean {
  const source = `${repo.slug} ${repo.githubUrl} ${repo.name}`.toLowerCase();
  return source.includes("lms-smooth-bridge") || source.includes("lms-mobile-app");
}

export function AppLanding({ slug }: AppLandingProps) {
  const [appRepo, setAppRepo] = useState<AppRepo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadRepo() {
      try {
        const response = await fetch(`/api/repos?slug=${encodeURIComponent(slug)}`, {
          cache: "no-store",
        });

        if (!response.ok) {
          if (mounted) {
            setAppRepo(null);
            setLoading(false);
          }
          return;
        }

        const payload = (await response.json()) as RepoResponse;
        if (mounted) {
          setAppRepo(payload.data);
          setLoading(false);
        }
      } catch {
        if (mounted) {
          setAppRepo(null);
          setLoading(false);
        }
      }
    }

    loadRepo();

    return () => {
      mounted = false;
    };
  }, [slug]);

  if (loading) {
    return <LandingShell message="Đang tải landing page..." />;
  }

  if (!appRepo) {
    return <NotFoundLanding />;
  }

  if (isAutoGraderRepo(appRepo)) {
    return <AutoGraderLanding repo={appRepo} />;
  }

  if (isSmoothBridgeRepo(appRepo)) {
    return <SmoothBridgeLanding repo={appRepo} />;
  }

  return <GenericLanding repo={appRepo} />;
}

function LandingShell({ message }: { message: string }) {
  return (
    <main className="min-h-svh bg-[radial-gradient(circle_at_top_left,#fee2e2,transparent_34%),linear-gradient(135deg,#fff7ed_0%,#ffffff_48%,#f8fafc_100%)]">
      <div className="mx-auto flex min-h-svh w-full max-w-6xl items-center px-4 py-10">
        <div className="w-full rounded-[2rem] border border-red-100 bg-white/80 p-8 text-lg font-semibold text-slate-700 shadow-2xl shadow-red-100/60 backdrop-blur">
          {message}
        </div>
      </div>
    </main>
  );
}

function NotFoundLanding() {
  return (
    <main className="min-h-svh bg-[radial-gradient(circle_at_top_left,#fee2e2,transparent_34%),linear-gradient(135deg,#fff7ed_0%,#ffffff_48%,#f8fafc_100%)]">
      <div className="mx-auto flex min-h-svh w-full max-w-4xl items-center px-4 py-10">
        <Card className="w-full border-red-100 bg-white/90 p-4 shadow-2xl shadow-red-100/60">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-black text-slate-950">Không tìm thấy app</CardTitle>
            <CardDescription className="text-base">
              Slug này chưa có metadata trong Supabase hoặc API đang không trả về dữ liệu.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Link href="/apps" className={buttonVariants({ size: "lg" })}>
              Quay lại danh sách app
            </Link>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

function AutoGraderLanding({ repo }: { repo: AppRepo }) {
  const updatedAt = new Date(repo.updatedAt).toLocaleDateString("vi-VN", { dateStyle: "medium" });

  return (
    <main className="min-h-svh overflow-hidden bg-[#150909] text-slate-950">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(248,113,113,0.42),transparent_28%),radial-gradient(circle_at_78%_8%,rgba(251,191,36,0.25),transparent_24%),linear-gradient(135deg,#1f0b0b_0%,#3b0d0d_36%,#fff7ed_36%,#ffffff_100%)]" />
      <div className="pointer-events-none fixed inset-0 opacity-[0.18] [background-image:linear-gradient(rgba(255,255,255,.45)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.45)_1px,transparent_1px)] [background-size:42px_42px]" />

      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-6 sm:px-6 lg:px-8">
        <nav className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-white/30 bg-white/80 px-4 py-3 shadow-xl shadow-red-950/10 backdrop-blur-xl">
          <MindxBrand />
          <div className="flex flex-wrap items-center gap-2">
            <Link href="/apps" className={buttonVariants({ variant: "outline", size: "sm" })}>
              Danh sách app
            </Link>
            <a href={repo.githubUrl} target="_blank" rel="noreferrer" className={buttonVariants({ size: "sm" })}>
              Mở GitHub
            </a>
          </div>
        </nav>

        <section className="grid min-h-[620px] items-center gap-8 py-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-7 text-[#7f1d1d]">
            <div className="flex flex-wrap gap-2">
              <Badge className="h-7 border-white/80 bg-white/90 px-3 text-[#b91c1c] shadow-lg shadow-red-950/10 backdrop-blur">
                Chrome Extension
              </Badge>
              <Badge className="h-7 border-amber-100 bg-amber-50/95 px-3 text-amber-800 shadow-lg shadow-red-950/10 backdrop-blur">
                AI Grading Assistant
              </Badge>
              <Badge className="h-7 border-red-100 bg-red-50/95 px-3 text-[#b91c1c] shadow-lg shadow-red-950/10 backdrop-blur">
                MindX Internal Tool
              </Badge>
            </div>

            <div className="space-y-5">
              <p className="inline-flex rounded-full border border-white/80 bg-white/85 px-4 py-2 text-sm font-black uppercase tracking-[0.42em] text-[#b91c1c] shadow-xl shadow-red-950/10 backdrop-blur">
                MindX Auto Grader Extension
              </p>
              <h1
                className="max-w-4xl text-5xl font-black leading-[0.96] tracking-tight text-[#b91c1c] sm:text-6xl lg:text-7xl"
                style={{
                  WebkitTextStroke: "1.35px rgba(255, 255, 255, 0.96)",
                  textShadow:
                    "0 3px 0 rgba(255,255,255,0.96), 0 18px 42px rgba(127,29,29,0.26)",
                }}
              >
                Chấm bài nhanh hơn, nhận xét rõ hơn, vận hành gọn hơn.
              </h1>
              <p className="max-w-2xl rounded-[2rem] border border-white/80 bg-white/85 p-5 text-lg font-semibold leading-8 text-[#7f1d1d] shadow-xl shadow-red-950/10 backdrop-blur sm:text-xl">
                Một extension Chrome dành cho giáo viên và team vận hành MindX: tự động tick điểm,
                tạo nhận xét bằng AI, chèn báo cáo Zalo và quản lý trial task trong cùng một workflow.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href={repo.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-12 items-center gap-2 rounded-2xl bg-white px-5 text-sm font-black text-red-700 shadow-2xl shadow-red-950/30 transition hover:-translate-y-0.5 hover:bg-red-50"
              >
                Xem source trên GitHub
                <ArrowRight className="size-4" />
              </a>
              <a
                href="#setup"
                className="inline-flex h-12 items-center gap-2 rounded-2xl border border-white/80 bg-white/85 px-5 text-sm font-black text-[#b91c1c] shadow-xl shadow-red-950/10 backdrop-blur transition hover:-translate-y-0.5 hover:bg-red-50"
              >
                Xem cách cài đặt
              </a>
            </div>

            <div className="grid max-w-2xl gap-3 sm:grid-cols-3">
              {[
                ["6", "nhóm tính năng"],
                ["14", "buổi mỗi khóa"],
                ["1", "flow từ chấm đến submit"],
              ].map(([value, label]) => (
                <div
                  key={label}
                  className="rounded-3xl border border-white/80 bg-white/85 p-4 shadow-xl shadow-red-950/10 backdrop-blur"
                >
                  <div className="text-3xl font-black text-[#b91c1c]">{value}</div>
                  <div className="mt-1 text-sm font-bold text-[#7f1d1d]/80">{label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-red-400/30 via-amber-300/20 to-white/30 blur-2xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/60 bg-white/[0.92] p-5 shadow-2xl shadow-red-950/25 backdrop-blur-xl">
              <div className="rounded-[1.5rem] bg-slate-950 p-4 text-white shadow-inner">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="size-3 rounded-full bg-red-400" />
                    <span className="size-3 rounded-full bg-amber-300" />
                    <span className="size-3 rounded-full bg-emerald-400" />
                  </div>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-slate-200">
                    Live grading panel
                  </span>
                </div>

                <div className="grid gap-3">
                  <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.25em] text-red-200">Score preset</p>
                        <p className="mt-1 text-2xl font-black">Giỏi / Khá / TB</p>
                      </div>
                      <ClipboardCheck className="size-10 text-red-200" />
                    </div>
                    <div className="mt-4 grid grid-cols-7 gap-1">
                      {[5, 5, 4, 5, 4, 5, 5].map((score, index) => (
                        <div key={`${score}-${index}`} className="rounded-xl bg-red-400/90 py-2 text-center text-sm font-black">
                          {score}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white p-4 text-slate-950">
                    <div className="mb-3 flex items-center gap-2 text-sm font-black text-red-700">
                      <Sparkles className="size-4" />
                      AI nhận xét
                    </div>
                    <p className="text-sm leading-6 text-slate-600">
                      Hôm nay con nắm tốt phần logic chính, cần luyện thêm cách giải thích từng bước.
                      Giáo viên nên khuyến khích con tự trình bày lại hướng giải sau buổi học.
                    </p>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <PreviewTile icon={Cloud} label="Báo cáo Zalo" value="Scratch - SB - Buổi 6" />
                    <PreviewTile icon={ShieldCheck} label="Trial task" value="Draft saved" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {autoGraderFeatures.map((feature) => (
            <Card
              key={feature.title}
              className="group border-white/70 bg-white/90 p-2 shadow-xl shadow-red-950/5 backdrop-blur transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-red-950/10"
            >
              <CardHeader>
                <div className={`mb-3 flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.accent} text-white shadow-lg`}>
                  <feature.icon className="size-6" />
                </div>
                <CardTitle className="text-xl font-black text-slate-950">{feature.title}</CardTitle>
                <CardDescription className="text-base leading-7 text-slate-600">
                  {feature.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]" id="setup">
          <Card className="border-red-100 bg-white/95 p-3 shadow-xl shadow-red-950/5">
            <CardHeader>
              <div className="mb-2 flex size-12 items-center justify-center rounded-2xl bg-red-600 text-white">
                <MonitorCheck className="size-6" />
              </div>
              <CardTitle className="text-3xl font-black text-slate-950">Cài đặt nhanh</CardTitle>
              <CardDescription className="text-base leading-7">
                Extension không cần build. Clone repo, load unpacked trong Chrome và cấu hình trong Settings.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {autoGraderSteps.map((step, index) => (
                <div key={step} className="flex gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-3">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-red-600 text-sm font-black text-white">
                    {index + 1}
                  </div>
                  <p className="text-base leading-7 text-slate-700">{step}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="grid gap-6">
            <Card className="border-amber-100 bg-gradient-to-br from-amber-50 via-white to-red-50 p-3 shadow-xl shadow-red-950/5">
              <CardHeader>
                <div className="mb-2 flex size-12 items-center justify-center rounded-2xl bg-amber-500 text-white">
                  <BookOpen className="size-6" />
                </div>
                <CardTitle className="text-3xl font-black text-slate-950">Dành cho ai?</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3">
                {autoGraderAudiences.map((item) => (
                  <div key={item} className="flex gap-3 rounded-2xl bg-white/80 p-3 ring-1 ring-amber-100">
                    <CheckCircle2 className="mt-1 size-5 shrink-0 text-red-600" />
                    <p className="text-base leading-7 text-slate-700">{item}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-slate-200 bg-slate-950 p-3 text-white shadow-xl shadow-slate-950/20">
              <CardHeader>
                <CardTitle className="text-2xl font-black text-white">Thông tin project</CardTitle>
                <CardDescription className="text-slate-300">
                  Metadata đang được đọc từ Supabase app registry.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-3 text-sm">
                <MetaRow label="Tên" value={repo.name} />
                <MetaRow label="Slug" value={repo.slug} />
                <MetaRow label="Nhóm" value={repo.category} />
                <MetaRow label="Cập nhật" value={updatedAt} />
                <div className="flex flex-wrap gap-2 pt-2">
                  {repo.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-red-100">
                      #{tag}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </main>
  );
}

function SmoothBridgeLanding({ repo }: { repo: AppRepo }) {
  const updatedAt = new Date(repo.updatedAt).toLocaleDateString("vi-VN", { dateStyle: "medium" });

  return (
    <main className="min-h-svh overflow-hidden bg-[#fff8f2] text-[#2C2B2B]">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_14%_12%,rgba(227,31,38,0.18),transparent_26%),radial-gradient(circle_at_82%_14%,rgba(255,178,136,0.32),transparent_24%),linear-gradient(135deg,#fff8f2_0%,#ffffff_52%,#fff0e8_100%)]" />
      <div className="pointer-events-none fixed inset-0 opacity-[0.18] [background-image:linear-gradient(rgba(227,31,38,.18)_1px,transparent_1px),linear-gradient(90deg,rgba(227,31,38,.14)_1px,transparent_1px)] [background-size:46px_46px]" />

      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-6 sm:px-6 lg:px-8">
        <nav className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-white/80 bg-white/90 px-4 py-3 shadow-xl shadow-red-950/10 backdrop-blur-xl">
          <MindxBrand />
          <div className="flex flex-wrap items-center gap-2">
            <Link href="/apps" className={buttonVariants({ variant: "outline", size: "sm" })}>
              Danh sách app
            </Link>
            <a href={repo.githubUrl} target="_blank" rel="noreferrer" className={buttonVariants({ size: "sm" })}>
              Mở GitHub
            </a>
          </div>
        </nav>

        <section className="grid min-h-[640px] items-center gap-8 py-6 lg:grid-cols-[1fr_0.95fr]">
          <div className="space-y-7">
            <div className="flex flex-wrap gap-2">
              <Badge className="h-7 rounded-full bg-[#E31F26] px-3 text-white hover:bg-[#c8181f]">
                Flutter Mobile
              </Badge>
              <Badge className="h-7 rounded-full border-[#E31F26]/20 bg-white px-3 text-[#E31F26]">
                Backend Bridge
              </Badge>
              <Badge className="h-7 rounded-full border-amber-200 bg-amber-50 px-3 text-amber-800">
                LMS Operations
              </Badge>
            </div>

            <div className="space-y-5">
              <p className="inline-flex rounded-full border border-[#E31F26]/15 bg-white px-4 py-2 text-sm font-black uppercase tracking-[0.34em] text-[#E31F26] shadow-xl shadow-red-950/10">
                LMS Smooth Bridge
              </p>
              <h1 className="max-w-4xl text-5xl font-black leading-[0.94] tracking-tight text-[#2C2B2B] sm:text-6xl lg:text-7xl">
                Mobile app cho dữ liệu LMS nhanh, gọn và dễ vận hành hơn.
              </h1>
              <p className="max-w-2xl text-lg font-medium leading-8 text-[#58595B] sm:text-xl">
                Flutter client kết nối với backend Node.js để lấy dữ liệu LMS, chuẩn hóa payload,
                cache dashboard và gom các thao tác lớp học vào một flow mobile mượt hơn.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href={repo.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-12 items-center gap-2 rounded-full bg-[#E31F26] px-6 text-sm font-black text-white shadow-[0_16px_40px_rgba(227,31,38,0.32)] transition hover:-translate-y-0.5 hover:bg-[#c8181f]"
              >
                Xem repository
                <ArrowRight className="size-4" />
              </a>
              <a
                href="#architecture"
                className="inline-flex h-12 items-center gap-2 rounded-full border border-[#E31F26]/20 bg-white px-6 text-sm font-black text-[#E31F26] transition hover:-translate-y-0.5 hover:bg-[#fff0e8]"
              >
                Kiến trúc hệ thống
              </a>
            </div>

            <div className="grid max-w-2xl gap-3 sm:grid-cols-3">
              {[
                ["Flutter", "mobile client"],
                ["Express", "API bridge"],
                ["MongoDB", "cache & devices"],
              ].map(([value, label]) => (
                <div
                  key={label}
                  className="rounded-3xl border border-[#E31F26]/10 bg-white/90 p-4 shadow-xl shadow-red-950/5 backdrop-blur"
                >
                  <div className="text-2xl font-black text-[#E31F26]">{value}</div>
                  <div className="mt-1 text-sm font-bold text-[#58595B]">{label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 rounded-[3rem] bg-gradient-to-br from-[#E31F26]/25 via-[#ffb288]/30 to-white blur-2xl" />
            <div className="relative mx-auto max-w-[410px] rounded-[3rem] border border-[#2C2B2B]/10 bg-[#2C2B2B] p-3 shadow-[0_34px_110px_rgba(44,43,43,0.28)]">
              <div className="overflow-hidden rounded-[2.45rem] bg-[#fffaf7]">
                <div className="flex items-center justify-between bg-[#E31F26] px-5 py-4 text-white">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.28em] text-white/70">
                      LMS Mobile
                    </p>
                    <p className="mt-1 text-xl font-black">Dashboard hôm nay</p>
                  </div>
                  <Gauge className="size-7" />
                </div>

                <div className="space-y-4 p-5">
                  <div className="rounded-3xl bg-white p-4 shadow-lg shadow-red-950/5 ring-1 ring-[#E31F26]/10">
                    <div className="mb-3 flex items-center justify-between">
                      <p className="text-sm font-black text-[#2C2B2B]">Lớp sắp bắt đầu</p>
                      <span className="rounded-full bg-[#fff0e8] px-3 py-1 text-xs font-black text-[#E31F26]">
                        12 phút
                      </span>
                    </div>
                    <div className="grid gap-2">
                      {["Scratch SB - Buổi 6", "Python PTA - Buổi 11"].map((item, index) => (
                        <div
                          key={item}
                          className="flex items-center justify-between rounded-2xl border border-[#E31F26]/10 bg-[#fffaf7] px-3 py-3"
                        >
                          <div className="flex items-center gap-3">
                            <span className="flex size-8 items-center justify-center rounded-full bg-[#E31F26] text-sm font-black text-white">
                              {index + 1}
                            </span>
                            <span className="text-sm font-bold text-[#2C2B2B]">{item}</span>
                          </div>
                          <CalendarCheck className="size-4 text-[#E31F26]" />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <SmoothMetric label="Reminders" value="08" icon={BellRing} />
                    <SmoothMetric label="Payroll" value="4.8M" icon={Wallet} />
                  </div>

                  <div className="rounded-3xl border border-[#E31F26]/10 bg-white p-4 shadow-lg shadow-red-950/5">
                    <div className="mb-3 flex items-center gap-2 text-sm font-black text-[#E31F26]">
                      <MessageSquareText className="size-4" />
                      Comment context
                    </div>
                    <p className="text-sm font-medium leading-6 text-[#58595B]">
                      Lấy comment tuần trước, tạo draft mới và lưu về LMS sau khi review.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {smoothBridgeFeatures.map((feature) => (
            <Card
              key={feature.title}
              className="group border-white/80 bg-white/90 p-2 shadow-xl shadow-red-950/5 backdrop-blur transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-red-950/10"
            >
              <CardHeader>
                <div className={`mb-3 flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.accent} text-white shadow-lg`}>
                  <feature.icon className="size-6" />
                </div>
                <CardTitle className="text-xl font-black text-[#2C2B2B]">{feature.title}</CardTitle>
                <CardDescription className="text-base leading-7 text-[#58595B]">
                  {feature.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </section>

        <section id="architecture" className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
          <Card className="overflow-hidden border-white/80 bg-white/95 p-3 shadow-xl shadow-red-950/5">
            <CardHeader>
              <div className="mb-2 flex size-12 items-center justify-center rounded-2xl bg-[#E31F26] text-white">
                <Route className="size-6" />
              </div>
              <CardTitle className="text-3xl font-black text-[#2C2B2B]">Luồng dữ liệu</CardTitle>
              <CardDescription className="text-base leading-7">
                Mobile không gọi LMS trực tiếp. Backend xác thực token, gọi LMS GraphQL, reshape dữ liệu
                và trả JSON nhẹ hơn cho app.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {[
                  ["Firebase login", "Mobile lấy id_token và lưu session cục bộ."],
                  ["Backend API", "Express validate token, rate limit và xử lý CORS allowlist."],
                  ["LMS GraphQL", "Dữ liệu lớp, attendance, payroll và comment được chuẩn hóa trước khi trả về app."],
                  ["MongoDB", "Cache dashboard, device token, notification history và prewarm jobs."],
                ].map(([title, description], index) => (
                  <div
                    key={title}
                    className="grid gap-3 rounded-3xl border border-[#E31F26]/10 bg-[#fffaf7] p-4 sm:grid-cols-[auto_1fr]"
                  >
                    <div className="flex size-10 items-center justify-center rounded-2xl bg-[#E31F26] text-sm font-black text-white">
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-lg font-black text-[#2C2B2B]">{title}</p>
                      <p className="mt-1 text-base leading-7 text-[#58595B]">{description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6">
            <Card className="border-[#E31F26]/10 bg-[#2C2B2B] p-3 text-white shadow-xl shadow-slate-950/20">
              <CardHeader>
                <div className="mb-2 flex size-12 items-center justify-center rounded-2xl bg-white text-[#E31F26]">
                  <ChartNoAxesColumnIncreasing className="size-6" />
                </div>
                <CardTitle className="text-3xl font-black text-white">API surface</CardTitle>
                <CardDescription className="text-slate-300">
                  Các nhóm endpoint chính đang phục vụ mobile và tác vụ vận hành.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-3">
                {smoothBridgeApiGroups.map((group) => (
                  <div key={group.title} className="flex gap-3 rounded-2xl bg-white/[0.08] p-3 ring-1 ring-white/10">
                    <group.icon className="mt-1 size-5 shrink-0 text-red-200" />
                    <div>
                      <p className="font-black text-white">{group.title}</p>
                      <p className="mt-1 text-sm leading-6 text-slate-300">{group.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-red-100 bg-gradient-to-br from-red-50 via-white to-amber-50 p-3 shadow-xl shadow-red-950/5">
              <CardHeader>
                <div className="mb-2 flex size-12 items-center justify-center rounded-2xl bg-white text-[#E31F26] ring-1 ring-[#E31F26]/10">
                  <WifiOff className="size-6" />
                </div>
                <CardTitle className="text-2xl font-black text-[#2C2B2B]">Stack</CardTitle>
                <CardDescription className="text-base leading-7">
                  Cấu trúc repo tách rõ `backend/` và `mobile/`, phù hợp triển khai backend trước rồi trỏ mobile về API.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {smoothBridgeStack.map((item) => (
                  <span key={item} className="rounded-full bg-white px-3 py-1 text-sm font-black text-[#E31F26] ring-1 ring-[#E31F26]/10">
                    {item}
                  </span>
                ))}
              </CardContent>
            </Card>
          </div>
        </section>

        <Card className="border-white/80 bg-white/95 p-3 shadow-xl shadow-red-950/5">
          <CardHeader>
            <CardTitle className="text-2xl font-black text-[#2C2B2B]">Thông tin project</CardTitle>
            <CardDescription className="text-base">
              Metadata đọc từ Supabase app registry, nội dung landing tham chiếu README và cấu trúc repo.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 md:grid-cols-4">
            <SmoothInfo label="Tên" value={repo.name} />
            <SmoothInfo label="Slug" value={repo.slug} />
            <SmoothInfo label="Nhóm" value={repo.category} />
            <SmoothInfo label="Cập nhật" value={updatedAt} />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

function SmoothMetric({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <div className="rounded-3xl bg-white p-4 shadow-lg shadow-red-950/5 ring-1 ring-[#E31F26]/10">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-xs font-black uppercase tracking-[0.2em] text-[#58595B]">{label}</span>
        <Icon className="size-4 text-[#E31F26]" />
      </div>
      <div className="text-3xl font-black text-[#E31F26]">{value}</div>
    </div>
  );
}

function SmoothInfo({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-3xl border border-[#E31F26]/10 bg-[#fffaf7] p-4">
      <p className="text-xs font-black uppercase tracking-[0.2em] text-[#E31F26]/70">{label}</p>
      <p className="mt-2 break-words text-base font-black text-[#2C2B2B]">{value}</p>
    </div>
  );
}

function PreviewTile({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/10 p-3">
      <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-red-100">
        <Icon className="size-4" />
        {label}
      </div>
      <div className="text-sm font-bold text-white">{value}</div>
    </div>
  );
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-white/[0.08] px-4 py-3 ring-1 ring-white/10">
      <span className="text-slate-400">{label}</span>
      <span className="font-bold text-white">{value}</span>
    </div>
  );
}

function GenericLanding({ repo }: { repo: AppRepo }) {
  return (
    <main className="min-h-svh bg-[radial-gradient(circle_at_top_left,#fee2e2,transparent_34%),linear-gradient(135deg,#fff7ed_0%,#ffffff_48%,#f8fafc_100%)]">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8">
        <header className="rounded-[2rem] border border-red-100 bg-white/90 p-6 shadow-2xl shadow-red-100/50 backdrop-blur">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <MindxBrand />
            <Link href="/apps" className={buttonVariants({ variant: "outline", size: "sm" })}>
              Quay lại danh sách
            </Link>
          </div>
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <Badge className="bg-red-600 text-white hover:bg-red-500">{repo.category}</Badge>
            <Badge variant="outline">{repo.slug}</Badge>
          </div>
          <h1 className="max-w-4xl text-5xl font-black tracking-tight text-slate-950">{repo.name}</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">{repo.shortDescription}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={repo.githubUrl} target="_blank" rel="noreferrer" className={buttonVariants({ size: "lg" })}>
              Mở GitHub Repository
            </a>
          </div>
        </header>

        <Card className="border-red-100 bg-white/90 p-3 shadow-xl shadow-red-100/40">
          <CardHeader>
            <CardTitle className="text-2xl font-black">README & hướng dẫn sử dụng</CardTitle>
            <CardDescription className="text-base">
              Khu vực này có thể được mở rộng để render README và usage guide chi tiết từ GitHub.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-2xl border border-dashed border-red-200 bg-red-50/70 p-5 text-base leading-7 text-slate-700">
              <p className="font-bold text-red-700">Repository source</p>
              <p className="mt-1 break-all">{repo.githubUrl}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
