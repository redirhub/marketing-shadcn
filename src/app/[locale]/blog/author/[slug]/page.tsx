import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { fetchAllTags } from "@/lib/services/blog";
import { localeUrl } from "@/lib/utils/seo";
import { APP_NAME } from "@/config/constant";
import BlogBanner from "@/components/blog/BlogBanner";
import { BlogCard } from "@/components/blog/BlogCard";
import type { Post } from "@/types/sanity";

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const author = await client.fetch(
    `*[_type == "author" && slug.current == $slug][0]{ _id, name, bio }`,
    { slug }
  );
  if (!author) return { title: "Author Not Found" };
  return {
    title: `${author.name}'s Posts - ${APP_NAME}`,
    description: author.bio || `Browse all blog posts by ${author.name}`,
  };
}

export default async function AuthorPage({ params }: PageProps) {
  const { locale, slug } = await params;

  const author = await client.fetch(
    `*[_type == "author" && slug.current == $slug][0]{ _id, name, slug, image, bio }`,
    { slug }
  );
  if (!author) notFound();

  const [allTags, posts] = await Promise.all([
    fetchAllTags(locale),
    client.fetch<Post[]>(
      `*[
        _type == "post" &&
        defined(slug.current) &&
        locale == $locale &&
        author._ref == $authorId
      ] | order(publishedAt desc) {
        _id, title, slug, excerpt, image, publishedAt, locale, tags,
        author->{ name, image, slug }
      }`,
      { locale, authorId: author._id }
    ),
  ]);

  const authorAvatarUrl = author.image ? urlFor(author.image).width(200).height(200).url() : null;

  return (
    <>
      <BlogBanner tags={allTags} />
      <div className="w-full py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          {/* Author card */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 md:p-12 mb-12 text-center">
            <div className="flex flex-col items-center gap-4">
              {authorAvatarUrl ? (
                <Image
                  src={authorAvatarUrl}
                  alt={author.name}
                  width={96}
                  height={96}
                  className="rounded-full border-4 border-white shadow-md object-cover"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-brand-blue flex items-center justify-center text-white text-3xl font-bold border-4 border-white shadow-md">
                  {author.name.charAt(0)}
                </div>
              )}
              <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900">{author.name}</h1>
              {author.bio && (
                <p className="text-base md:text-lg text-gray-700 max-w-2xl leading-[1.75]">{author.bio}</p>
              )}
              <p className="text-sm text-gray-600 font-semibold">
                {posts.length} {posts.length === 1 ? "post" : "posts"}
              </p>
            </div>
          </div>

          {/* Posts grid */}
          {posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-2xl text-gray-600">No posts available yet. Check back soon!</p>
            </div>
          ) : (
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
          )}
        </div>
      </div>
    </>
  );
}
