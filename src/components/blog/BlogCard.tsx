import Link from "next/link";
import Image from "next/image";
import { ucfirst } from "@/lib/utils/tagsHelpers";

interface BlogCardProps {
  imageSrc: string;
  imageAlt?: string;
  tags?: string[];
  date?: string;
  title: string;
  excerpt?: string;
  link?: string;
}

export function BlogCard({
  imageSrc,
  imageAlt = "Blog post image",
  tags,
  date,
  title,
  excerpt,
  link = "#",
}: BlogCardProps) {
  return (
    <Link href={link} className="group block no-underline">
      <article className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
        {/* Image */}
        <div className="relative w-full aspect-[16/9] overflow-hidden bg-gray-100">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-1">
          {/* Tag */}
          <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">
            {tags && tags.length > 0 ? ucfirst(tags[0]) : "Blog"}
          </p>

          {/* Title */}
          <h3 className="text-lg md:text-xl font-bold text-gray-900 leading-snug mb-2 line-clamp-3 flex-1">
            {title}
          </h3>

          {/* Excerpt */}
          {excerpt && (
            <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 mb-3">
              {excerpt}
            </p>
          )}

          {/* Date */}
          {date && <p className="text-sm text-gray-400 mt-auto">{date}</p>}
        </div>
      </article>
    </Link>
  );
}
