import type { Metadata } from "next";
import { fetchSupportArticlesByTag, fetchAllSupportTags } from "@/lib/services/support";
import { denormalizeTag, formatTagForDisplay, normalizeTag, ucfirst } from "@/lib/utils/tagsHelpers";
import { allLanguages } from "@/sanity/config/i18n";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface TagPageProps {
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

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const { tag } = await params;
  const displayTag = formatTagForDisplay(denormalizeTag(tag));
  return {
    title: `Support Articles tagged with "${displayTag}"`,
    description: `Browse all support articles tagged with "${displayTag}"`,
  };
}

export default async function SupportTagPage({ params }: TagPageProps) {
  const { locale, tag: tagSlug } = await params;
  const tag = denormalizeTag(tagSlug);
  const displayTag = formatTagForDisplay(tag);
  const articles = await fetchSupportArticlesByTag(tag, locale);

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-br from-brand-navy to-brand-blue pt-24 md:pt-32 pb-12">
        <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Support Articles tagged with <span className="text-brand-teal">#{displayTag}</span>
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-14">
        {articles.length === 0 ? (
          <p className="text-gray-500 py-10 text-center text-xl">No support articles found with this tag.</p>
        ) : (
          <div className="divide-y divide-gray-100 max-w-3xl mx-auto">
            {articles.map((article: any) => (
              <Link key={article._id} href={localePath(locale, `/support/${article.slug.current}`)}
                className="flex items-center justify-between py-4 group hover:text-brand-blue transition-colors"
              >
                <div>
                  <p className="font-medium text-gray-900 group-hover:text-brand-blue transition-colors">{article.title}</p>
                  {article.tags?.[0] && (
                    <p className="text-xs text-gray-400 mt-1">{ucfirst(article.tags[0])}</p>
                  )}
                </div>
                <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-brand-blue transition-colors flex-shrink-0" />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
