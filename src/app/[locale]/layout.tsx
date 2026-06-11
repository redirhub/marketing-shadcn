import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Suspense } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import NProgressBar from "@/components/shared/NProgressBar";
import { fetchFooterLegalPages } from "@/lib/services/legal";
import { fetchFooterLandingPages } from "@/lib/services/landingPages";
import { localeUrl } from "@/lib/utils/seo";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as any)) notFound();

  const messages = await getMessages();

  // Fetch footer links from Sanity
  const legalPages = await fetchFooterLegalPages(locale);
  const legalLinks = legalPages.map((page: any) => ({
    label: page.title,
    href: localeUrl(locale, `/legal/${page.slug.current}`),
  }));

  const landingPages = await fetchFooterLandingPages(locale);
  const landingLinks = landingPages.map((page: any) => ({
    label: page.title,
    href: localeUrl(locale, `/${page.slug.current}`),
  }));

  return (
    <NextIntlClientProvider messages={messages}>
      <Suspense fallback={null}>
        <NProgressBar />
      </Suspense>
      <Nav />
      <main className="flex-1 flex flex-col">{children}</main>
      <Footer locale={locale} legalLinks={legalLinks} landingLinks={landingLinks} />
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!} />
    </NextIntlClientProvider>
  );
}
