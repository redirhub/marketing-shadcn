import Image from "next/image";
import Link from "next/link";
import { safeUrlFor } from "@/sanity/lib/safeImage";
import { normalizeTag, ucfirst } from "@/lib/utils/tagsHelpers";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import type { SanityImageAsset } from "@/types/sanity";

interface PostHeaderProps {
  title: string;
  author?: { name: string };
  publishedAt: string;
  readTimeMinutes: number;
  tags?: string[];
  image?: SanityImageAsset;
  locale?: string;
}

function localePath(locale: string, path: string) {
  if (locale === "en") return path;
  return `/${locale}${path}`;
}

export default function PostHeader({ title, publishedAt, readTimeMinutes, tags, image, locale = "en" }: PostHeaderProps) {
  const imageUrl = safeUrlFor(image, { width: 1600, height: 900, fallback: "" }) || null;

  return (
    <header className="pb-2 pt-20 w-full" style={{ background: "linear-gradient(163deg, #1c6db6 0%, #20a795 86%)" }}>
      <div className="max-w-[1220px] mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-6 md:gap-8 lg:gap-12 items-start">
          {/* Left: Text */}
          <div className="flex-1 lg:flex-[0_1_55%] text-left">
            {/* Tags / Back link */}
            <div className="flex flex-wrap items-center gap-3 my-6">
              {tags && tags.length > 0 ? (
                tags.map((tag, i) => (
                  <Link
                    key={i}
                    href={localePath(locale, `/blog/tag/${normalizeTag(tag)}`)}
                    className="px-4 py-2 bg-white/20 rounded-full text-sm font-semibold text-white hover:bg-white/30 transition-all"
                  >
                    {ucfirst(tag)}
                  </Link>
                ))
              ) : (
                <Link
                  href={localePath(locale, "/blog")}
                  className="inline-flex items-center gap-2 text-lg font-semibold text-white hover:opacity-80 transition-opacity"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Blog
                </Link>
              )}
            </div>

            {/* Title */}
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight tracking-tight mb-6">
              {title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-white/80">
              {publishedAt && (
                <>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    {new Date(publishedAt).toLocaleDateString(locale, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                  {readTimeMinutes && (
                    <span className="flex items-center gap-1">
                      <Clock className="w-5 h-5" />
                      {readTimeMinutes} mins read
                    </span>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Right: Image */}
          {imageUrl && (
            <div className="flex-1 lg:flex-[0_1_60%] relative">
              <div className="relative w-full h-[330px] rounded-3xl overflow-hidden shadow-lg">
                <Image
                  src={imageUrl}
                  alt={title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
