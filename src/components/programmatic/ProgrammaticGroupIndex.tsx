import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ProgrammaticPage } from "@/types/sanity";
import { interpolateString, parseJsonData } from "@/lib/utils/programmaticPage";
import { localeUrl } from "@/lib/utils/seo";

interface ProgrammaticGroupIndexProps {
  pages: ProgrammaticPage[];
  group: string;
  locale: string;
}

export default function ProgrammaticGroupIndex({ pages, locale }: ProgrammaticGroupIndexProps) {
  const cards = pages.flatMap((page) => {
    const jsonData = parseJsonData(page.json.code);
    return page.keys.map((key) => {
      const title = interpolateString(page.title, jsonData, key);
      const resolvedSlug = page.slug.current.replace(/\{key\}/g, key);
      const href = localeUrl(locale, `/${page.group}/${resolvedSlug}`);
      return { _id: `${page._id}-${key}`, title, href };
    });
  });

  if (cards.length === 0) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 my-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        {cards.map((card) => (
          <Link
            key={card._id}
            href={card.href}
            className="flex items-center justify-between p-4 border border-gray-200 bg-white rounded-xl transition-all hover:border-brand-blue hover:-translate-y-0.5"
          >
            <span className="text-base font-semibold text-gray-800 leading-snug">{card.title}</span>
            <ArrowRight className="w-4 h-4 flex-shrink-0 ml-3 text-brand-blue" />
          </Link>
        ))}
      </div>
    </div>
  );
}
