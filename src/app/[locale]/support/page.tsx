import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { APP_NAME } from "@/config/constant";
import { buildCanonicalUrl, buildStaticHreflangAlternates, buildSocialCards } from "@/lib/utils/seo";
import { allLanguages } from "@/sanity/config/i18n";
import { fetchSupportArticles, fetchAllSupportTags } from "@/lib/services/support";
import Link from "next/link";
import { normalizeTag, ucfirst } from "@/lib/utils/tagsHelpers";
import { ArrowRight } from "lucide-react";

function localePath(locale: string, path: string) {
  if (locale === "en") return path;
  return `/${locale}${path}`;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;

  const title = `Support - ${APP_NAME}`;
  const description = `Find answers, guides, and tutorials for ${APP_NAME}. Get help with redirects, analytics, and troubleshooting.`;

  return {
    title,
    description,
    alternates: {
      canonical: buildCanonicalUrl(locale, "/support"),
      ...buildStaticHreflangAlternates(allLanguages, "/support"),
    },
    ...buildSocialCards({ title, description }),
  };
}

export default async function SupportPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const [articles, tags] = await Promise.all([
    fetchSupportArticles(locale),
    fetchAllSupportTags(locale),
  ]);

  return (
    <div className="min-h-screen bg-white">
      {/* Banner */}
      <div className="bg-gradient-to-br from-brand-navy to-brand-blue pt-24 md:pt-32 pb-12">
        <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Support Center</h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Find answers, guides, and tutorials for {APP_NAME}.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 my-14">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Sidebar */}
          <aside className="w-full md:w-1/4 lg:w-1/5">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Categories</p>
            <nav className="flex flex-col gap-1">
              <Link
                href={localePath(locale, "/support")}
                className="px-3 py-2 text-sm font-medium text-brand-blue bg-blue-50 rounded-lg"
              >
                All Articles
              </Link>
              {tags.map((tag: string) => (
                <Link
                  key={tag}
                  href={localePath(locale, `/support/category/${normalizeTag(tag)}`)}
                  className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-brand-blue hover:bg-gray-50 rounded-lg transition-colors"
                >
                  {ucfirst(tag)}
                </Link>
              ))}
            </nav>
          </aside>

          {/* Articles */}
          <section className="flex-1">
            {articles.length === 0 ? (
              <p className="text-gray-500 py-10 text-center">No support articles found.</p>
            ) : (
              <div className="divide-y divide-gray-100">
                {articles.map((article: any) => (
                  <Link
                    key={article._id}
                    href={localePath(locale, `/support/${article.slug.current}`)}
                    className="flex items-center justify-between py-4 group hover:text-brand-blue transition-colors"
                  >
                    <div>
                      <p className="font-medium text-gray-900 group-hover:text-brand-blue transition-colors">
                        {article.title}
                      </p>
                      {article.tags?.[0] && (
                        <p className="text-xs text-gray-400 mt-1">{ucfirst(article.tags[0])}</p>
                      )}
                    </div>
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
