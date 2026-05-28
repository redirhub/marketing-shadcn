import { BlogCard } from "./BlogCard";
import { fetchPaginatedPosts } from "@/lib/services/blog";
import { safeUrlFor } from "@/sanity/lib/safeImage";
import type { PostPreview } from "@/types/sanity";
import { localeUrl } from "@/lib/utils/seo";
import BlogPagination from "./BlogPagination";

interface BlogListProps {
  currentPage: number;
  locale?: string;
  basePath: string;
}

export default async function BlogList({ currentPage, locale = "en", basePath }: BlogListProps) {
  const { posts, totalPages } = await fetchPaginatedPosts(locale, currentPage, 12);

  return (
    <section className="w-full py-8 my-4 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {posts?.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {posts.map((post: PostPreview) => {
                const imageSrc = safeUrlFor(post.image, { width: 800, height: 450 });
                return (
                <BlogCard
                  key={post._id}
                  imageSrc={imageSrc}
                  imageAlt={post.title || "Blog post image"}
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
                );
              })}
            </div>
            <BlogPagination currentPage={currentPage} totalPages={totalPages} basePath={basePath} />
          </>
        ) : (
          <div className="text-center py-20 text-gray-500 text-lg">
            No posts available yet. Check back soon!
          </div>
        )}
      </div>
    </section>
  );
}
