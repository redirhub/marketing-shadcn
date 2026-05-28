import { BlogCard } from "@/components/blog/BlogCard";
import { safeUrlFor } from "@/sanity/lib/safeImage";
import { localeUrl } from "@/lib/utils/seo";
import type { PostPreview } from "@/types/sanity";

interface BlogSectionProps {
  locale: string;
  posts: PostPreview[];
}

export default function BlogSection({ locale, posts }: BlogSectionProps) {
  if (!posts || posts.length === 0) return null;

  return (
    <div className="w-full py-10 md:py-16 px-4 md:px-6 text-center bg-[#F2F4EF]">
      <div className="w-full max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-8">From the Blog</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <BlogCard
              key={post._id}
              imageSrc={safeUrlFor(post.image, { width: 800, height: 450 })}
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
      </div>
    </div>
  );
}
