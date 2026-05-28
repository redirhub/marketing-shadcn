import { permanentRedirect } from "next/navigation";

interface PageProps {
  params: Promise<{ locale: string; tag: string }>;
}

export default async function ToolRedirect({ params }: PageProps) {
  const { locale, tag } = await params;
  const destination = locale === "en"
    ? `https://findredirect.com/${tag}`
    : `https://findredirect.com/${locale}/${tag}`;
  permanentRedirect(destination);
}
