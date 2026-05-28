"use client";

import { useState, useEffect, useRef } from "react";

interface Heading {
  text: string;
  id: string;
  level: number;
}

interface TableOfContentsProps {
  content: any[];
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState("");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (!Array.isArray(content)) return;
    const extracted = content
      .filter((block) => block._type === "block" && block.style?.match(/^h[2-3]$/))
      .map((block, index) => ({
        text: block.children?.map((c: any) => c.text).join("") || "",
        id: `heading-${index}`,
        level: parseInt(block.style.replace("h", "")),
      }));
    setHeadings(extracted);
  }, [content]);

  useEffect(() => {
    if (headings.length === 0) return;
    observerRef.current?.disconnect();
    observerRef.current = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActiveId(e.target.id)),
      { rootMargin: "-20% 0px -35% 0px", threshold: 0.5 }
    );
    const timeout = setTimeout(() => {
      headings.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (el && observerRef.current) observerRef.current.observe(el);
      });
    }, 0);
    return () => {
      clearTimeout(timeout);
      observerRef.current?.disconnect();
    };
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <aside className="sticky top-20">
      <div className="max-h-[calc(100vh-80px)] overflow-y-auto p-6 bg-amber-50 rounded-xl">
        <p className="text-lg font-semibold text-gray-800 capitalize mb-4">Table of Contents</p>
        <div className="flex flex-col gap-2">
          {headings.map(({ text, id, level }) => (
            <a
              key={id}
              href={`#${id}`}
              className={`text-sm py-1 leading-relaxed transition-colors hover:no-underline ${
                level === 3 ? "pl-4" : ""
              } ${
                activeId === id
                  ? "text-brand-blue font-semibold"
                  : "text-gray-600 hover:text-brand-blue"
              }`}
            >
              {text}
            </a>
          ))}
        </div>
      </div>
    </aside>
  );
}
