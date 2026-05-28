import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { fetchLegalDocumentBySlug, fetchLegalDocuments, fetchLegalDocumentTranslations } from "@/lib/services/legal";
import { portableTextComponents } from "@/components/blog/PortableTextComponents";
import { APP_NAME } from "@/config/constant";
import { buildCanonicalUrl, buildHreflangAlternates, buildSocialCards } from "@/lib/utils/seo";
import { allLanguages } from "@/sanity/config/i18n";

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  if (process.env.SKIP_BUILD_STATIC_GENERATION) return [];
  const docs = await fetchLegalDocuments("en");
  return docs.flatMap((doc: any) =>
    allLanguages.map((locale) => ({ locale, slug: doc.slug.current }))
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const document = await fetchLegalDocumentBySlug(slug, locale);
  if (!document) return { title: "Document Not Found" };

  const translations = await fetchLegalDocumentTranslations(slug);
  const title = `${document.title} | ${APP_NAME}`;
  const description = document.title;

  return {
    title,
    description,
    alternates: {
      canonical: buildCanonicalUrl(locale, `/legal/${slug}`),
      ...(translations.length > 0 ? buildHreflangAlternates(translations, "/legal") : {}),
    },
    ...buildSocialCards({ title, description, type: "article" }),
  };
}

export default async function LegalDocumentPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const document = await fetchLegalDocumentBySlug(slug, locale);
  if (!document) notFound();

  return (
    <div className="bg-white pb-20 pt-24 md:pt-32">
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-10 text-center">
          {document.title}
        </h1>

        {document.content && (
          <div className="text-lg leading-[1.8] text-gray-700">
            <PortableText value={document.content} components={portableTextComponents()} />
          </div>
        )}
      </div>
    </div>
  );
}
