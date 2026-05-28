import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { APP_NAME } from "@/config/constant";
import { buildCanonicalUrl, buildSocialCards } from "@/lib/utils/seo";
import BlogBanner from "@/components/blog/BlogBanner";
import BlogList from "@/components/blog/BlogList";

interface BlogPageProps {
  params: Promise<{ locale: string; page: string }>;
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { locale, page } = await params;
  const currentPage = Number(page);
  if (isNaN(currentPage) || currentPage < 1) return { title: "Not Found" };

  const basePath = "/blog";
  const pagePath = currentPage > 1 ? `/page/${currentPage}` : "";
  const canonicalUrl = buildCanonicalUrl(locale, `${basePath}${pagePath}`);

  const title = `Blog - ${APP_NAME}`;
  const description = "Latest guides, tutorials, and insights on URL redirects, SEO best practices, and web performance optimization.";

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    ...buildSocialCards({ title, description }),
  };
}

export default async function BlogPaginatedPage({ params }: BlogPageProps) {
  const { locale, page } = await params;
  const currentPage = Number(page);

  if (isNaN(currentPage) || currentPage < 1) notFound();

  const basePath = locale === "en" ? "/blog" : `/${locale}/blog`;

  return (
    <>
      <BlogBanner />
      <BlogList currentPage={currentPage} locale={locale} basePath={basePath} />
    </>
  );
}
