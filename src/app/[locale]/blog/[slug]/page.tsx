import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { PortableText } from "@portabletext/react";
import {
  fetchPostBySlug,
  fetchRelatedPosts,
  calculateReadTime,
  fetchBlogPosts,
  findSimilarSlug,
} from "@/lib/services/blog";
import { urlFor } from "@/sanity/lib/image";
import { portableTextComponents } from "@/components/blog/PortableTextComponents";
import PostHeader from "@/components/blog/PostHeader";
import TableOfContents from "@/components/blog/TableOfContents";
import AuthorBox from "@/components/blog/AuthorBox";
import RelatedArticles from "@/components/blog/RelatedArticles";
import BlogFAQ from "@/components/blog/BlogFAQ";
import { buildCanonicalUrl, buildStaticHreflangAlternates, buildSocialCards, generateFAQSchema, localeUrl } from "@/lib/utils/seo";
import { APP_NAME, APP_URL } from "@/config/constant";
import { allLanguages } from "@/sanity/config/i18n";

interface BlogPostPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  if (process.env.SKIP_BUILD_STATIC_GENERATION) return [];
  const posts = await fetchBlogPosts("en");
  return posts.flatMap((post: any) =>
    allLanguages.map((locale) => ({ locale, slug: post.slug.current }))
  );
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await fetchPostBySlug(slug, locale);

  if (!post) return { title: "Post Not Found" };

  const imageUrl = post.image ? urlFor(post.image).width(1200).height(630).url() : undefined;

  return {
    title: `${post.title} - ${APP_NAME}`,
    description: post.excerpt || undefined,
    alternates: {
      canonical: buildCanonicalUrl(locale, `/blog/${slug}`),
      ...buildStaticHreflangAlternates(allLanguages, `/blog/${slug}`),
    },
    ...buildSocialCards({
      title: post.title,
      description: post.excerpt || undefined,
      image: imageUrl,
      type: "article",
      publishedTime: post.publishedAt,
      authors: post.author?.name ? [post.author.name] : undefined,
    }),
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { locale, slug } = await params;
  const post = await fetchPostBySlug(slug, locale);

  if (!post) {
    const similarSlug = await findSimilarSlug(slug, locale);
    if (similarSlug) {
      permanentRedirect(localeUrl(locale, `/blog/${similarSlug}`));
    }
    notFound();
  }

  const readTime = post.content ? calculateReadTime(post.content) : 1;
  const relatedPosts = post.tags ? await fetchRelatedPosts(post._id, post.tags, locale, 3) : [];

  const imageUrl = post.image ? urlFor(post.image).width(1200).height(630).url() : undefined;
  const canonicalUrl = buildCanonicalUrl(locale, `/blog/${slug}`);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt || post.title,
    image: imageUrl,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: post.author
      ? {
          "@type": "Person",
          name: post.author.name,
          ...(post.author.image && {
            image: urlFor(post.author.image).width(200).height(200).url(),
          }),
        }
      : undefined,
    publisher: {
      "@type": "Organization",
      name: "RedirHub",
      logo: { "@type": "ImageObject", url: `${APP_URL}/logo.png` },
    },
    timeRequired: readTime ? `PT${readTime}M` : undefined,
    mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl },
    keywords: post.tags?.join(", "),
  };

  const faqSchema = generateFAQSchema(post.faqs);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}

      <article>
        <PostHeader
          title={post.title}
          author={post.author}
          publishedAt={post.publishedAt}
          readTimeMinutes={readTime}
          tags={post.tags}
          image={post.image}
          locale={locale}
        />

        <div className="max-w-[1100px] mx-auto px-4 md:px-6 py-10">
          <div className="grid grid-cols-1 xl:grid-cols-[1fr_280px] gap-8">
            {/* Main content */}
            <div className="min-w-0">
              <div className="max-w-[800px]">
                {post.content && (
                  <div className="mb-4">
                    <PortableText value={post.content} components={portableTextComponents()} />
                  </div>
                )}

                {post.faqs && post.faqs.length > 0 && <BlogFAQ faqs={post.faqs} />}

                <AuthorBox author={post.author} locale={locale} />
              </div>
            </div>

            {/* Table of Contents - desktop only */}
            <div className="hidden xl:block">
              <TableOfContents content={post.content || []} />
            </div>
          </div>

          {relatedPosts.length > 0 && (
            <div className="mt-12">
              <RelatedArticles posts={relatedPosts} locale={locale} />
            </div>
          )}
        </div>
      </article>
    </>
  );
}
