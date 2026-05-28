import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { fetchAllTags } from "@/lib/services/blog";
import { localeUrl } from "@/lib/utils/seo";
import BlogBanner from "@/components/blog/BlogBanner";
import { BlogCard } from "@/components/blog/BlogCard";
import type { PostPreview } from "@/types/sanity";

interface PageProps {
  params: Promise<{ locale: string; term: string }>;
}

export default async function SearchResultsPage({ params }: PageProps) {
  const { locale, term } = await params;
  const decodedTerm = decodeURIComponent(term);
  const searchTerm = `*${decodedTerm}*`;

  const [allTags, posts] = await Promise.all([
    fetchAllTags(locale),
    client.fetch<PostPreview[]>(
      `*[
        _type == "post" &&
        locale == $locale &&
        (title match $term || excerpt match $term || $decodedTerm in tags[])
      ] | order(publishedAt desc) {
        _id, title, slug, excerpt, image, publishedAt, tags,
        author->{ name, image, slug }
      }`,
      { locale, term: searchTerm, decodedTerm }
    ),
  ]);

  return (
    <>
      <BlogBanner tags={allTags} searchTerm={decodedTerm} />
      <div className="w-full pt-10 md:pt-14 pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          {posts.length === 0 ? (
            <div className="flex flex-col items-center text-center py-12 gap-2">
              <h2 className="text-2xl md:text-4xl font-bold text-gray-900">No results!</h2>
              <p className="text-lg text-gray-600">Sorry we couldn&apos;t find anything.</p>
              <p className="text-lg text-gray-600">Try another search!</p>
            </div>
          ) : (
            <>
              <p className="text-lg text-gray-600 font-medium text-center mb-12">
                {posts.length} {posts.length === 1 ? "Result" : "Results"}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
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
            </>
          )}
        </div>
      </div>
    </>
  );
}
