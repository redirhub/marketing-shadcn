import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import {
  fetchSupportArticleBySlug,
  fetchSupportArticleTranslations,
  fetchSupportArticles,
} from "@/lib/services/support";
import { portableTextComponents } from "@/components/blog/PortableTextComponents";
import { APP_NAME } from "@/config/constant";
import { buildCanonicalUrl, buildHreflangAlternates, buildSocialCards } from "@/lib/utils/seo";
import { allLanguages } from "@/sanity/config/i18n";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ucfirst } from "@/lib/utils/tagsHelpers";

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

function localePath(locale: string, path: string) {
  if (locale === "en") return path;
  return `/${locale}${path}`;
}

export async function generateStaticParams() {
  if (process.env.SKIP_BUILD_STATIC_GENERATION) return [];
  const articles = await fetchSupportArticles("en");
  return articles.flatMap((article: any) =>
    allLanguages.map((locale) => ({ locale, slug: article.slug.current }))
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = await fetchSupportArticleBySlug(slug, locale);
  if (!article) return { title: "Article Not Found" };

  const translations = await fetchSupportArticleTranslations(slug);
  const title = `${article.title} | Support`;
  const description = `Learn about ${article.title} with ${APP_NAME}.`;

  return {
    title,
    description,
    alternates: {
      canonical: buildCanonicalUrl(locale, `/support/${slug}`),
      ...(translations.length > 0 ? buildHreflangAlternates(translations, "/support") : {}),
    },
    ...buildSocialCards({ title, description, type: "article" }),
  };
}

export default async function SupportSinglePage({ params }: PageProps) {
  const { locale, slug } = await params;
  const article = await fetchSupportArticleBySlug(slug, locale);
  if (!article) notFound();

  return (
    <div className="bg-white pb-20">
      {/* Banner */}
      <div className="bg-gradient-to-br from-brand-navy to-brand-blue pt-24 md:pt-32 pb-12">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <Link
            href={localePath(locale, "/support")}
            className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Support
          </Link>
          {article.tags?.[0] && (
            <p className="text-brand-teal text-sm font-semibold uppercase tracking-wider mb-2">
              {ucfirst(article.tags[0])}
            </p>
          )}
          <h1 className="text-3xl md:text-4xl font-bold text-white">{article.title}</h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-6">
        <div className="bg-white p-6 md:p-12 rounded-2xl">
          {article.content && (
            <div className="text-lg leading-[1.8] text-gray-700">
              <PortableText value={article.content} components={portableTextComponents()} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
