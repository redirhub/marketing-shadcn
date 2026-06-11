import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Suspense } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import NProgressBar from "@/components/shared/NProgressBar";

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

  return (
    <NextIntlClientProvider messages={messages}>
      <Suspense fallback={null}>
        <NProgressBar />
      </Suspense>
      <Nav />
      {children}
      <Footer locale={locale} />
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!} />
    </NextIntlClientProvider>
  );
}
