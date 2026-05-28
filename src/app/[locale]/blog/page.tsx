import type { Metadata } from "next";
import { APP_NAME } from "@/config/constant";
import { buildCanonicalUrl, buildSocialCards } from "@/lib/utils/seo";
import { allLanguages } from "@/sanity/config/i18n";
import BlogBanner from "@/components/blog/BlogBanner";
import BlogList from "@/components/blog/BlogList";
import { fetchAllTags } from "@/lib/services/blog";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const basePath = "/blog";
  const canonicalUrl = buildCanonicalUrl(locale, basePath);

  const languages: Record<string, string> = {};
  allLanguages.forEach((lang) => {
    if (lang === "en") {
      languages["en"] = basePath;
      languages["x-default"] = basePath;
    } else {
      languages[lang] = `/${lang}${basePath}`;
    }
  });

  const title = `Blog - ${APP_NAME}`;
  const description = "Latest guides, tutorials, and insights on URL redirects, SEO best practices, and web performance optimization.";

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl, languages },
    ...buildSocialCards({ title, description }),
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const basePath = locale === "en" ? "/blog" : `/${locale}/blog`;
  const tags = await fetchAllTags(locale);

  return (
    <>
      <BlogBanner tags={tags} />
      <BlogList currentPage={1} locale={locale} basePath={basePath} />
    </>
  );
}
