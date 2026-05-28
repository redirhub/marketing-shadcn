import { permanentRedirect } from "next/navigation";

export default async function RedirectCheckPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const destination = locale === "en" ? "https://findredirect.com/" : `https://findredirect.com/${locale}`;
  permanentRedirect(destination);
}
