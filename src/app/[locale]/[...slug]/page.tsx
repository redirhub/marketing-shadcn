import type { Metadata } from "next";
import { notFound, redirect, permanentRedirect } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { fetchBlogPosts, fetchPostBySlug } from "@/lib/services/blog";
import { fetchLandingPageBySlug, fetchLandingPageTranslations, fetchLandingPages } from "@/lib/services/landingPages";
import { matchProgrammaticPage, fetchProgrammaticPages, fetchProgrammaticPageTranslations, fetchProgrammaticPagesByGroup } from "@/lib/services/programmaticPages";
import { interpolateProgrammaticPage } from "@/lib/utils/programmaticPage";
import { portableTextComponents } from "@/components/blog/PortableTextComponents";
import LandingPageBanner from "@/components/shared/LandingPageBanner";
import TableOfContents from "@/components/blog/TableOfContents";
import RelatedPages from "@/components/programmatic/RelatedPages";
import ProgrammaticGroupIndex from "@/components/programmatic/ProgrammaticGroupIndex";
import BlogSection from "@/components/sections/BlogSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import FAQSection from "@/components/shared/FAQSection";
import { buildCanonicalUrl, buildHreflangAlternates, buildSocialCards, generateFAQSchema, localeUrl, parseRedirect } from "@/lib/utils/seo";
import { APP_NAME } from "@/config/constant";
import { urlFor } from "@/sanity/lib/image";
import { allLanguages } from "@/sanity/config/i18n";

interface PageProps {
  params: Promise<{ locale: string; slug: string[] }>;
}

export async function generateStaticParams() {
  if (process.env.SKIP_BUILD_STATIC_GENERATION) return [];

  const landingPages = await fetchLandingPages("en");
  const landingPageParams = landingPages.flatMap((page: any) =>
    allLanguages.map((locale) => ({ locale, slug: page.slug.current.split("/") }))
  );

  const programmaticPages = await fetchProgrammaticPages("en");
  const programmaticPageParams = programmaticPages.flatMap((page: any) =>
    page.keys.flatMap((key: string) => {
      const resolvedSlug = page.slug.current.replace(/\{key\}/g, key);
      const fullPath = `${page.group}/${resolvedSlug}`;
      return allLanguages.map((locale) => ({ locale, slug: fullPath.split("/") }));
    })
  );

  return [...landingPageParams, ...programmaticPageParams];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const slugPath = slug.join("/");

  const lastSegment = slug[slug.length - 1];
  if (lastSegment && /\.[a-zA-Z0-9]+$/.test(lastSegment)) return { title: "Not Found" };

  let page = await fetchLandingPageBySlug(slugPath, locale);
  let isProgrammatic = false;
  let programmaticGroup: string | undefined;
  let programmaticSlugTemplate: string | undefined;

  if (!page) {
    const match = await matchProgrammaticPage(slugPath, locale);
    if (match) {
      page = interpolateProgrammaticPage(match.page, match.key);
      isProgrammatic = true;
      programmaticGroup = match.page.group;
      programmaticSlugTemplate = match.page.slug.current;
    }
  }

  if (!page) return { title: "Not Found" };

  const translations =
    isProgrammatic && programmaticGroup && programmaticSlugTemplate
      ? await fetchProgrammaticPageTranslations(programmaticGroup, programmaticSlugTemplate)
      : await fetchLandingPageTranslations(slugPath);

  const hreflangAlternates = translations.length > 0 ? buildHreflangAlternates(translations, "") : {};

  const title = `${page.meta?.metaTitle || page.title} - ${APP_NAME}`;
  const description = page.meta?.metaDescription || page.hero.subheadline || page.title;
  const image = page.meta?.ogImage ? urlFor(page.meta.ogImage).width(1200).height(630).url() : undefined;

  return {
    title,
    description,
    alternates: {
      canonical: buildCanonicalUrl(locale, `/${slugPath}`),
      ...hreflangAlternates,
    },
    ...buildSocialCards({ title, description, image, type: "article" }),
  };
}

export default async function LandingPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const slugPath = slug.join("/");

  const lastSegment = slug[slug.length - 1];
  if (lastSegment && /\.[a-zA-Z0-9]+$/.test(lastSegment)) notFound();

  let page = await fetchLandingPageBySlug(slugPath, locale);
  let programmaticPageData: { page: any; key: string } | null = null;

  if (!page) {
    const match = await matchProgrammaticPage(slugPath, locale);
    if (match) {
      page = interpolateProgrammaticPage(match.page, match.key);
      programmaticPageData = match;
    }
  }

  if (!page) {
    const blogPost = await fetchPostBySlug(slugPath, locale);
    if (blogPost) permanentRedirect(localeUrl(locale, `/blog/${slugPath}`));
  }

  if (!page) notFound();

  const redirectInfo = parseRedirect(page.directive);
  if (redirectInfo) {
    const localizedPath = localeUrl(locale, redirectInfo.targetPath);
    if (redirectInfo.statusCode === "301") permanentRedirect(localizedPath);
    else redirect(localizedPath);
  }

  const programmaticGroup = page.directive?.startsWith("programmatic group ")
    ? page.directive.split(" ")[2]
    : null;

  const [groupPages, blogPosts] = await Promise.all([
    programmaticGroup ? fetchProgrammaticPagesByGroup(programmaticGroup, locale) : Promise.resolve([]),
    page.sections?.includes("blogInsight") ? fetchBlogPosts(locale, 3) : Promise.resolve([]),
  ]);

  const faqSchema = generateFAQSchema(page.faqs);
  const showTableOfContents = page.sections?.includes("contentTable");
  const showTestimonials = page.sections?.includes("testimonials");
  const showBlogInsight = page.sections?.includes("blogInsight");

  return (
    <div className="bg-white">
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}

      <LandingPageBanner hero={page.hero} />

      <div className="max-w-7xl mx-auto px-3 md:px-4 lg:px-6 my-12">
        <div className={`${showTableOfContents ? "grid xl:grid-cols-[1fr_280px] gap-8" : ""}`}>
          <div className="min-w-0">
            <div className="bg-white pr-0 lg:pr-2 rounded-2xl">
              {page.content && (
                <div className="text-lg leading-[1.8] text-[#344054]">
                  <PortableText value={page.content} components={portableTextComponents()} />
                </div>
              )}
            </div>
          </div>

          {showTableOfContents && (
            <div className="hidden xl:block">
              <TableOfContents content={page.content || []} />
            </div>
          )}
        </div>
      </div>

      {programmaticGroup && groupPages.length > 0 && (
        <ProgrammaticGroupIndex pages={groupPages} group={programmaticGroup} locale={locale} />
      )}

      {showTestimonials && <TestimonialsSection locale={locale} />}

      {programmaticPageData && (
        <div className="max-w-7xl mx-auto px-3 md:px-4 lg:px-6">
          <RelatedPages
            programmaticPage={programmaticPageData.page}
            currentKey={programmaticPageData.key}
            locale={locale}
          />
        </div>
      )}

      <FAQSection faqs={page.faqs} />

      {showBlogInsight && <BlogSection locale={locale} posts={blogPosts} />}
    </div>
  );
}
