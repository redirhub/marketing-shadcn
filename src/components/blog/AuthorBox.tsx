import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

interface AuthorBoxProps {
  author?: {
    name: string;
    bio?: string;
    image?: any;
    title?: string;
    slug?: { current: string };
  };
  locale?: string;
}

function localePath(locale: string, path: string) {
  if (locale === "en") return path;
  return `/${locale}${path}`;
}

export default function AuthorBox({ author, locale = "en" }: AuthorBoxProps) {
  if (!author) return null;

  const avatarUrl = author.image ? urlFor(author.image).width(200).height(200).url() : undefined;
  const authorLink = author.slug ? localePath(locale, `/blog/author/${author.slug.current}`) : undefined;

  const Avatar = (
    <div className="relative w-20 h-20 rounded-full overflow-hidden bg-gray-200 border-4 border-white shadow flex-shrink-0">
      {avatarUrl ? (
        <Image src={avatarUrl} alt={author.name} fill className="object-cover" />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-gray-500">
          {author.name.charAt(0)}
        </div>
      )}
    </div>
  );

  const Name = (
    <p className="text-xl md:text-2xl font-bold text-gray-900 mb-1 hover:text-brand-blue transition-colors">
      {author.name}
    </p>
  );

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 md:p-8 my-10">
      <div className="flex flex-col sm:flex-row gap-6 items-start">
        {authorLink ? <Link href={authorLink}>{Avatar}</Link> : Avatar}
        <div className="flex-1">
          <div className="mb-2">
            {authorLink ? <Link href={authorLink}>{Name}</Link> : Name}
            {author.title && (
              <p className="text-base md:text-lg text-gray-600 font-medium">{author.title}</p>
            )}
          </div>
          {author.bio && (
            <p className="text-sm md:text-base text-gray-700 leading-relaxed mt-3">{author.bio}</p>
          )}
        </div>
      </div>
    </div>
  );
}
