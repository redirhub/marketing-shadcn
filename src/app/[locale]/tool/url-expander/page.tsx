import { permanentRedirect } from "next/navigation";

export default async function UrlExpanderPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const destination = locale === "en" ? "https://findredirect.com/expander" : `https://findredirect.com/${locale}/expander`;
  permanentRedirect(destination);
}
