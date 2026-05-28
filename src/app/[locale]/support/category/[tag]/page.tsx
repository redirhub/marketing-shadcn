import type { Metadata } from "next";
import { buildCanonicalUrl, buildStaticHreflangAlternates } from "@/lib/utils/seo";
import { allLanguages } from "@/sanity/config/i18n";
import { fetchSupportArticlesByTag, fetchAllSupportTags } from "@/lib/services/support";
import { denormalizeTag, formatTagForDisplay, normalizeTag, ucfirst } from "@/lib/utils/tagsHelpers";
import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { APP_NAME } from "@/config/constant";

interface CategoryPageProps {
  params: Promise<{ locale: string; tag: string }>;
}

function localePath(locale: string, path: string) {
  if (locale === "en") return path;
  return `/${locale}${path}`;
}

export async function generateStaticParams() {
  if (process.env.SKIP_BUILD_STATIC_GENERATION) return [];
  const tags = await fetchAllSupportTags("en");
  return tags.flatMap((tag: string) =>
    allLanguages.map((locale) => ({ locale, tag: normalizeTag(tag) }))
  );
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { locale, tag } = await params;
  const categoryName = formatTagForDisplay(denormalizeTag(tag));
  return {
    title: `${categoryName} - Support - ${APP_NAME}`,
    description: `Browse ${categoryName.toLowerCase()} articles and guides for ${APP_NAME}.`,
    alternates: {
      canonical: buildCanonicalUrl(locale, `/support/category/${tag}`),
      ...buildStaticHreflangAlternates(allLanguages, `/support/category/${tag}`),
    },
  };
}

export default async function SupportCategoryPage({ params }: CategoryPageProps) {
  const { locale, tag } = await params;
  const decodedTag = denormalizeTag(tag);
  const [articles, allTags] = await Promise.all([
    fetchSupportArticlesByTag(decodedTag, locale),
    fetchAllSupportTags(locale),
  ]);

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-br from-brand-navy to-brand-blue pt-24 md:pt-32 pb-12">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <Link href={localePath(locale, "/support")} className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            All Categories
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{formatTagForDisplay(decodedTag)}</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 my-14">
        <div className="flex flex-col md:flex-row gap-12">
          <aside className="w-full md:w-1/4 lg:w-1/5">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Categories</p>
            <nav className="flex flex-col gap-1">
              <Link href={localePath(locale, "/support")} className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-brand-blue hover:bg-gray-50 rounded-lg transition-colors">
                All Articles
              </Link>
              {allTags.map((t: string) => (
                <Link key={t} href={localePath(locale, `/support/category/${normalizeTag(t)}`)}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    t.toLowerCase() === decodedTag.toLowerCase()
                      ? "text-brand-blue bg-blue-50"
                      : "text-gray-600 hover:text-brand-blue hover:bg-gray-50"
                  }`}
                >
                  {ucfirst(t)}
                </Link>
              ))}
            </nav>
          </aside>

          <section className="flex-1">
            {articles.length === 0 ? (
              <p className="text-gray-500 py-10 text-center">No support articles found in this category.</p>
            ) : (
              <div className="divide-y divide-gray-100">
                {articles.map((article: any) => (
                  <Link key={article._id} href={localePath(locale, `/support/${article.slug.current}`)}
                    className="flex items-center justify-between py-4 group hover:text-brand-blue transition-colors"
                  >
                    <p className="font-medium text-gray-900 group-hover:text-brand-blue transition-colors">{article.title}</p>
                    <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-brand-blue transition-colors flex-shrink-0" />
                  </Link>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
