import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { fetchChangelogBySlug, fetchChangelogEntries, fetchChangelogTranslations, formatDate } from "@/lib/services/changelog";
import { portableTextComponents } from "@/components/blog/PortableTextComponents";
import { APP_NAME } from "@/config/constant";
import { buildCanonicalUrl, buildHreflangAlternates, buildSocialCards } from "@/lib/utils/seo";
import { allLanguages } from "@/sanity/config/i18n";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  if (process.env.SKIP_BUILD_STATIC_GENERATION) return [];
  const { entries } = await fetchChangelogEntries("en", 100);
  return entries.flatMap((entry: any) =>
    allLanguages.map((locale) => ({ locale, slug: entry.slug.current }))
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const entry = await fetchChangelogBySlug(slug, locale);
  if (!entry) return { title: "Changelog Not Found" };

  const translations = await fetchChangelogTranslations(slug);
  const title = `${entry.title} - Changelog - ${APP_NAME}`;
  const description = entry.description || entry.title;

  return {
    title,
    description,
    alternates: {
      canonical: buildCanonicalUrl(locale, `/changelog/${slug}`),
      ...(translations.length > 0 ? buildHreflangAlternates(translations, "/changelog") : {}),
    },
    ...buildSocialCards({ title, description, type: "article", publishedTime: entry.publishedAt }),
  };
}

export default async function ChangelogDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const entry = await fetchChangelogBySlug(slug, locale);
  if (!entry) notFound();

  const backHref = locale === "en" ? "/changelog" : `/${locale}/changelog`;

  return (
    <div className="bg-white pb-20">
      {/* Banner */}
      <div className="bg-gradient-to-br from-brand-navy to-brand-blue pt-24 md:pt-32 pb-10">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-0 px-0 md:px-10 mb-5 mt-5">
            <Link
              href={backHref}
              className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Changelog
            </Link>
            <span className="inline-block bg-[#fff6ed] text-[#d65334] px-4 py-1 rounded-full text-sm font-medium">
              {formatDate(entry.publishedAt)}
            </span>
          </div>

          <div className="text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-white max-w-4xl mx-auto leading-tight">
              {entry.title}
            </h1>
            {entry.author?.name && (
              <p className="text-sm text-white/70 font-medium mt-3">
                by {entry.author.name}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-6">
        <div className="bg-white p-6 md:p-12 rounded-2xl">
          {entry.content && (
            <div className="text-lg leading-[1.8] text-gray-700">
              <PortableText value={entry.content} components={portableTextComponents()} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
