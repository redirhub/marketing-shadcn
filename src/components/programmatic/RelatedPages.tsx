import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ProgrammaticPage } from "@/types/sanity";
import { interpolateString, parseJsonData } from "@/lib/utils/programmaticPage";
import { localeUrl } from "@/lib/utils/seo";

interface RelatedPagesProps {
  programmaticPage: ProgrammaticPage;
  currentKey: string;
  locale?: string;
  maxItems?: number;
}

export default function RelatedPages({
  programmaticPage,
  currentKey,
  locale = "en",
  maxItems = 20,
}: RelatedPagesProps) {
  const relatedKeys = programmaticPage.keys.filter((key) => key !== currentKey);
  if (!relatedKeys || relatedKeys.length === 0) return null;

  const jsonData = parseJsonData(programmaticPage.json.code);

  const relatedPages = relatedKeys.slice(0, maxItems).map((key) => {
    const title = interpolateString(programmaticPage.title, jsonData, key);
    const resolvedSlug = programmaticPage.slug.current.replace(/\{key\}/g, key);
    const href = localeUrl(locale, `/${programmaticPage.group}/${resolvedSlug}`);
    return { _id: `${programmaticPage._id}-${key}`, title, href };
  });

  return (
    <section className="mt-16 mb-12">
      <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">Related Pages</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        {relatedPages.map((page) => (
          <Link
            key={page._id}
            href={page.href}
            className="flex items-center justify-between p-4 border border-gray-200 bg-white rounded-xl transition-all hover:border-brand-blue hover:-translate-y-0.5"
          >
            <span className="text-base font-semibold text-gray-800 leading-snug">{page.title}</span>
            <ArrowRight className="w-4 h-4 flex-shrink-0 ml-3 text-brand-blue" />
          </Link>
        ))}
      </div>
    </section>
  );
}
