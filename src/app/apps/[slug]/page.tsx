import { AppLanding } from "@/components/apps/app-landing";

type AppLandingPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function AppLandingPage({ params }: AppLandingPageProps) {
  const { slug } = await params;
  return <AppLanding slug={slug} />;
}
