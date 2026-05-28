"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { formatDate } from "@/lib/services/changelog";
import type { ChangelogEntry } from "@/types/sanity";
import { PortableText } from "@portabletext/react";
import { portableTextComponents } from "@/components/blog/PortableTextComponents";

interface InfiniteScrollChangelogProps {
  initialEntries: ChangelogEntry[];
  initialCursor: string | null;
  locale: string;
}

export default function InfiniteScrollChangelog({
  initialEntries,
  initialCursor,
  locale,
}: InfiniteScrollChangelogProps) {
  const [entries, setEntries] = useState<ChangelogEntry[]>(initialEntries);
  const [cursor, setCursor] = useState<string | null>(initialCursor);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(!!initialCursor);
  const observerTarget = useRef<HTMLDivElement>(null);

  const loadMore = useCallback(async () => {
    if (loading || !hasMore || !cursor) return;
    setLoading(true);
    try {
      const response = await fetch(`/api/changelog?locale=${locale}&cursor=${encodeURIComponent(cursor)}`);
      const data = await response.json();
      setEntries((prev) => [...prev, ...data.entries]);
      setCursor(data.nextCursor);
      setHasMore(!!data.nextCursor);
    } catch {
      // silently fail — user can refresh
    } finally {
      setLoading(false);
    }
  }, [cursor, loading, hasMore, locale]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (observed) => {
        if (observed[0].isIntersecting && hasMore && !loading) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );
    const target = observerTarget.current;
    if (target) observer.observe(target);
    return () => { if (target) observer.unobserve(target); };
  }, [loadMore, hasMore, loading]);

  const localePath = (path: string) => locale === "en" ? path : `/${locale}${path}`;

  return (
    <div className="py-16 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        {entries.map((entry, index) => {
          const isLast = index === entries.length - 1;
          return (
            <div key={entry._id} className={`flex gap-4 md:gap-6 relative ${isLast ? "" : "pb-16"}`}>
              {/* Date column — desktop only */}
              <div className="hidden md:block w-28 flex-shrink-0 text-right pt-1">
                <span className="text-sm text-gray-500">{formatDate(entry.publishedAt)}</span>
              </div>

              {/* Timeline */}
              <div className="relative w-5 flex-shrink-0">
                <div className="w-2 h-2 rounded-full bg-brand-blue absolute left-1.5 top-2" />
                {!isLast && (
                  <div className="absolute left-[9px] top-4 bottom-[-64px] w-px bg-gray-300" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 pb-4">
                <span className="text-xs text-gray-500 mb-1 block md:hidden">{formatDate(entry.publishedAt)}</span>
                <Link href={localePath(`/changelog/${entry.slug.current}`)}>
                  <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3 hover:text-brand-blue transition-colors cursor-pointer">
                    {entry.title}
                  </h2>
                </Link>
                {entry.content && (
                  <div className="text-base text-gray-600 leading-relaxed">
                    <PortableText value={entry.content} components={portableTextComponents()} />
                  </div>
                )}
              </div>
            </div>
          );
        })}

        <div ref={observerTarget} className="py-8 text-center">
          {loading && (
            <div className="w-8 h-8 border-2 border-brand-blue border-t-transparent rounded-full animate-spin mx-auto" />
          )}
          {!hasMore && entries.length > 0 && (
            <p className="text-sm text-gray-500">No more updates</p>
          )}
        </div>
      </div>
    </div>
  );
}
