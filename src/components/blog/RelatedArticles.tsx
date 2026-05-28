import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BlogCard } from "./BlogCard";
import type { PostPreview } from "@/types/sanity";
import { urlFor } from "@/sanity/lib/image";
import { localeUrl } from "@/lib/utils/seo";

interface RelatedArticlesProps {
  posts: PostPreview[];
  locale?: string;
}

function localePath(locale: string, path: string) {
  if (locale === "en") return path;
  return `/${locale}${path}`;
}

export default function RelatedArticles({ posts, locale = "en" }: RelatedArticlesProps) {
  if (!posts || posts.length === 0) return null;

  return (
    <section className="mt-16 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">Related Articles</h2>
        <Link
          href={localePath(locale, "/blog")}
          className="inline-flex items-center gap-2 text-base font-semibold text-brand-blue hover:text-brand-blue/80 transition-colors"
        >
          View All Articles
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.slice(0, 3).map((post) => (
          <BlogCard
            key={post._id}
            imageSrc={post.image ? urlFor(post.image).width(800).height(450).url() : "/assets/images/default.png"}
            tags={post.tags}
            date={new Date(post.publishedAt).toLocaleDateString(locale, {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
            title={post.title}
            link={localeUrl(locale, `/blog/${post.slug.current}`)}
          />
        ))}
      </div>
    </section>
  );
}
