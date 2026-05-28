import type { Metadata } from "next";
import { APP_NAME } from "@/config/constant";
import { buildCanonicalUrl, buildStaticHreflangAlternates, buildSocialCards } from "@/lib/utils/seo";
import { allLanguages } from "@/sanity/config/i18n";
import { fetchChangelogEntries } from "@/lib/services/changelog";
import InfiniteScrollChangelog from "@/components/changelog/InfiniteScrollChangelog";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const title = `Changelog - ${APP_NAME}`;
  const description = `Stay updated with the latest features, improvements, and fixes to ${APP_NAME}`;
  return {
    title,
    description,
    alternates: {
      canonical: buildCanonicalUrl(locale, "/changelog"),
      ...buildStaticHreflangAlternates(allLanguages, "/changelog"),
    },
    ...buildSocialCards({ title, description }),
  };
}

export default async function ChangelogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const { entries, nextCursor } = await fetchChangelogEntries(locale, 10);

  return (
    <div className="min-h-screen">
      {/* Banner */}
      <div className="bg-gradient-to-br from-brand-navy to-brand-blue pt-24 md:pt-32 pb-10 md:pb-10">
        <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Changelog</h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Latest updates and improvements to {APP_NAME}
          </p>
        </div>
      </div>

      <InfiniteScrollChangelog
        initialEntries={entries}
        initialCursor={nextCursor}
        locale={locale}
      />
    </div>
  );
}
