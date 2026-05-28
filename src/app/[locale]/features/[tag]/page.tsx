import { permanentRedirect } from "next/navigation";

interface PageProps {
  params: Promise<{ locale: string; tag: string }>;
}

export default async function FeatureTagRedirect({ params }: PageProps) {
  const { locale, tag } = await params;
  const redirectUrl = locale === "en" ? `/${tag}` : `/${locale}/${tag}`;
  permanentRedirect(redirectUrl);
}
