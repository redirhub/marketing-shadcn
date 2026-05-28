"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { Search, X, ChevronDown } from "lucide-react";
import { normalizeTag, ucfirst } from "@/lib/utils/tagsHelpers";
import { useTranslations } from "next-intl";

interface BlogBannerProps {
  tags?: string[];
  currentTag?: string;
  searchTerm?: string;
  maxVisibleTags?: number;
}

function localePath(locale: string, path: string) {
  if (locale === "en") return path;
  return `/${locale}${path}`;
}

export default function BlogBanner({ tags = [], currentTag, searchTerm: initialTerm, maxVisibleTags = 4 }: BlogBannerProps) {
  const t = useTranslations("blog");
  const params = useParams();
  const locale = (params?.locale as string) || "en";
  const [searchQuery, setSearchQuery] = useState(initialTerm || "");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setSearchQuery(initialTerm || "");
  }, [initialTerm]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`${localePath(locale, "/blog/search")}/${encodeURIComponent(searchQuery)}/?post_type=post`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  const handleClear = () => {
    setSearchQuery("");
    router.push(localePath(locale, "/blog"));
  };

  const isActiveTag = (tag: string) => currentTag?.toLowerCase() === tag.toLowerCase();
  const visibleTags = tags.slice(0, maxVisibleTags);
  const dropdownTags = tags.slice(maxVisibleTags);

  const bannerTitle = initialTerm
    ? t("banner-search-title", { term: initialTerm })
    : currentTag
    ? ucfirst(currentTag)
    : t("banner-title");

  return (
    <div className="bg-gradient-to-br from-brand-blue to-brand-teal pt-24 md:pt-32 pb-6 md:pb-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] rounded-full bg-white/5" />
        <div className="absolute -bottom-1/2 -left-1/4 w-[600px] h-[600px] rounded-full bg-white/5" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center gap-6">
          {/* Badge */}
          <div className="inline-block px-4 py-1.5 bg-white/15 backdrop-blur-sm rounded-full border border-white/20">
            <span className="text-xs md:text-sm font-semibold uppercase tracking-wider text-white/95">
              {t("banner-subtitle")}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight tracking-tight max-w-4xl">
            {bannerTitle}
          </h1>

          {/* Navigation bar */}
          {tags.length > 0 && (
            <div className="w-full bg-white/0 backdrop-blur-sm rounded-xl border border-white/20 px-4 md:px-6 py-3 md:py-4 shadow-md">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-3 md:gap-4">
                {/* Tags */}
                <div className="flex flex-wrap items-center gap-2 flex-1 w-full lg:w-auto">
                  <Link
                    href={localePath(locale, "/blog")}
                    className={`px-3 md:px-4 py-2 text-sm md:text-base font-semibold text-white rounded-lg border transition-all whitespace-nowrap ${
                      !currentTag
                        ? "bg-white/25 border-white/30"
                        : "bg-white/10 border-white/15 hover:bg-white/30"
                    }`}
                  >
                    {t("latest-articles")}
                  </Link>

                  {visibleTags.map((tag) => (
                    <Link
                      key={tag}
                      href={localePath(locale, `/blog/tag/${normalizeTag(tag)}`)}
                      className={`px-3 md:px-4 py-2 text-sm md:text-base font-semibold text-white rounded-lg border transition-all whitespace-nowrap ${
                        isActiveTag(tag)
                          ? "bg-white/25 border-white/30"
                          : "bg-white/10 border-white/15 hover:bg-white/30"
                      }`}
                    >
                      {ucfirst(tag)}
                    </Link>
                  ))}

                  {dropdownTags.length > 0 && (
                    <div className="relative">
                      <button
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="flex items-center gap-1 px-3 md:px-4 py-2 text-sm md:text-base font-semibold text-white bg-white/10 border border-white/15 rounded-lg hover:bg-white/30 transition-all whitespace-nowrap"
                      >
                        {t("other-topics")}
                        <ChevronDown className={`w-4 h-4 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
                      </button>
                      {dropdownOpen && (
                        <div className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-200 min-w-[180px] py-2 z-50">
                          {dropdownTags.map((tag) => (
                            <Link
                              key={tag}
                              href={localePath(locale, `/blog/tag/${normalizeTag(tag)}`)}
                              onClick={() => setDropdownOpen(false)}
                              className={`block px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                                isActiveTag(tag) ? "font-semibold text-brand-blue" : "text-gray-700"
                              }`}
                            >
                              {ucfirst(tag)}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Search */}
                <div className="relative w-full lg:w-[280px] flex-shrink-0">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/70 pointer-events-none" />
                  <input
                    type="text"
                    placeholder={t("search-placeholder")}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full h-10 pl-10 pr-10 text-sm text-white placeholder-white/60 bg-white/15 backdrop-blur-sm border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/30 focus:bg-white/25"
                  />
                  {searchQuery && (
                    <button
                      onClick={handleClear}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-white/70 hover:text-white transition-colors"
                      aria-label={t("clear-search")}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
