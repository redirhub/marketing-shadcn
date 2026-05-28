import type { Metadata } from "next";
import { buildCanonicalUrl, buildStaticHreflangAlternates, buildSocialCards, localeUrl } from "@/lib/utils/seo";
import { allLanguages } from "@/sanity/config/i18n";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { denormalizeTag, formatTagForDisplay } from "@/lib/utils/tagsHelpers";
import BlogBanner from "@/components/blog/BlogBanner";
import { BlogCard } from "@/components/blog/BlogCard";
import { fetchAllTags } from "@/lib/services/blog";
import type { PostPreview } from "@/types/sanity";

interface TagPageProps {
  params: Promise<{ locale: string; tag: string }>;
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const { locale, tag: tagSlug } = await params;
  const tag = denormalizeTag(tagSlug);
  const displayTag = formatTagForDisplay(tag);

  const title = `Posts tagged with "${displayTag}"`;
  const description = `Browse all blog posts tagged with "${displayTag}"`;

  return {
    title,
    description,
    alternates: {
      canonical: buildCanonicalUrl(locale, `/blog/tag/${tagSlug}`),
      ...buildStaticHreflangAlternates(allLanguages, `/blog/tag/${tagSlug}`),
    },
    ...buildSocialCards({ title, description }),
  };
}

export default async function TagPage({ params }: TagPageProps) {
  const { locale, tag: tagSlug } = await params;
  const tag = denormalizeTag(tagSlug);

  const [allTags, posts] = await Promise.all([
    fetchAllTags(locale),
    client.fetch(
      `*[_type == "post" && defined(slug.current) && locale == $locale && count(tags[lower(@) == lower($tag)]) > 0] | order(publishedAt desc) {
        _id, title, slug, excerpt, image, publishedAt, locale, tags,
        author->{ name, image, slug }
      }`,
      { locale, tag } as Record<string, any>
    ),
  ]);

  return (
    <>
      <BlogBanner tags={allTags} currentTag={tag} />
      <section className="w-full py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          {posts.length === 0 ? (
            <div className="text-center py-20 text-gray-500 text-2xl">
              No posts available yet. Check back soon!
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {posts.map((post: PostPreview) => (
                <BlogCard
                  key={post._id}
                  imageSrc={post.image ? urlFor(post.image).width(800).height(450).url() : "/assets/images/default.png"}
                  imageAlt={post.title}
                  tags={post.tags}
                  date={new Date(post.publishedAt).toLocaleDateString(locale, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                  title={post.title}
                  excerpt={post.excerpt}
                  link={localeUrl(locale, `/blog/${post.slug.current}`)}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
