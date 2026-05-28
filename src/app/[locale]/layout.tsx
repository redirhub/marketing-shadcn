import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import { Suspense } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import NProgressBar from "@/components/shared/NProgressBar";
import "../globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "RedirHub — Fast & Secure URL Redirect Management",
  description:
    "Forward your domains instantly and manage all redirects from a real-time dashboard. Enhance your SEO with 301/302 redirects and secure every link with HTTPS.",
  icons: {
    icon: "/assets/images/favicon.png",
  },
};

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
    <html lang={locale} className={`${plusJakarta.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-white text-brand-charcoal antialiased">
        <NextIntlClientProvider messages={messages}>
          <Suspense fallback={null}>
            <NProgressBar />
          </Suspense>
          <Nav />
          {children}
          <Footer locale={locale} />
        </NextIntlClientProvider>
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!} />
      </body>
    </html>
  );
}
