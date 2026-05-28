import type { Metadata } from "next";
import { APP_NAME } from "@/config/constant";
import { buildCanonicalUrl, buildStaticHreflangAlternates, buildSocialCards } from "@/lib/utils/seo";
import { allLanguages } from "@/sanity/config/i18n";
import { fetchLegalDocuments } from "@/lib/services/legal";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

function localePath(locale: string, path: string) {
  if (locale === "en") return path;
  return `/${locale}${path}`;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const title = `Legal - ${APP_NAME}`;
  const description = "Terms of service, privacy policy, and legal documentation.";
  return {
    title,
    description,
    alternates: {
      canonical: buildCanonicalUrl(locale, "/legal"),
      ...buildStaticHreflangAlternates(allLanguages, "/legal"),
    },
    ...buildSocialCards({ title, description }),
  };
}

export default async function LegalPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const legalDocs = await fetchLegalDocuments(locale);

  return (
    <div className="min-h-screen bg-white pt-24 md:pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-10">Legal</h1>

        {legalDocs.length === 0 ? (
          <p className="text-gray-500 text-lg">No legal documents available.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {legalDocs.map((doc: any) => (
              <Link
                key={doc._id}
                href={localePath(locale, `/legal/${doc.slug.current}`)}
                className="flex items-center justify-between p-6 border border-gray-200 rounded-xl hover:border-brand-blue hover:bg-gray-50 transition-all group"
              >
                <span className="text-lg font-semibold text-gray-900 group-hover:text-brand-blue transition-colors">
                  {doc.title}
                </span>
                <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-brand-blue transition-colors flex-shrink-0" />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
