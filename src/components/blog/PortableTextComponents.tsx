import type { PortableTextComponents } from "@portabletext/react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

export const portableTextComponents = (): PortableTextComponents => {
  let headingIndex = -1;

  return {
    block: {
      h1: ({ children }) => (
        <h1 className="text-2xl md:text-3xl font-bold mt-10 mb-4 text-gray-900 scroll-mt-24">{children}</h1>
      ),
      h2: ({ children }) => {
        headingIndex++;
        return (
          <h2
            id={`heading-${headingIndex}`}
            className="text-2xl md:text-3xl font-bold mt-10 mb-4 text-gray-900 scroll-mt-24"
          >
            {children}
          </h2>
        );
      },
      h3: ({ children }) => {
        headingIndex++;
        return (
          <h3
            id={`heading-${headingIndex}`}
            className="text-xl md:text-2xl font-bold mt-6 mb-3 text-gray-900 scroll-mt-24"
          >
            {children}
          </h3>
        );
      },
      h4: ({ children }) => (
        <h4 className="text-lg md:text-xl font-bold mt-6 mb-3 text-gray-900">{children}</h4>
      ),
      normal: ({ children }) => (
        <p className="text-base md:text-lg leading-[1.8] text-gray-700 mb-4">{children}</p>
      ),
      blockquote: ({ children }) => (
        <blockquote className="border-l-4 border-blue-500 pl-4 py-2 my-4 italic bg-transparent text-gray-700">
          {children}
        </blockquote>
      ),
    },
    list: {
      bullet: ({ children }) => <ul className="list-disc pl-6 mb-4 space-y-2">{children}</ul>,
      number: ({ children }) => <ol className="list-decimal pl-6 mb-4 space-y-2">{children}</ol>,
    },
    listItem: {
      bullet: ({ children }) => <li className="text-base md:text-lg text-gray-700 leading-relaxed">{children}</li>,
      number: ({ children }) => <li className="text-base md:text-lg text-gray-700 leading-relaxed">{children}</li>,
    },
    marks: {
      strong: ({ children }) => <strong className="font-bold text-gray-900">{children}</strong>,
      em: ({ children }) => <em className="italic">{children}</em>,
      code: ({ children }) => (
        <code className="bg-gray-100 text-red-600 rounded px-1.5 py-0.5 text-sm font-mono">{children}</code>
      ),
      link: ({ children, value }) => (
        <a
          href={value?.href}
          target={value?.blank ? "_blank" : undefined}
          rel={value?.blank ? "noopener noreferrer" : undefined}
          className="text-brand-blue underline hover:text-brand-blue/80 transition-colors"
        >
          {children}
        </a>
      ),
    },
    types: {
      image: ({ value }) => {
        if (!value?.asset) return null;
        const url = urlFor(value).width(800).url();
        return (
          <div className="my-8 rounded-xl overflow-hidden">
            <div className="relative w-full aspect-[16/9]">
              <Image
                src={url}
                alt={value.alt || ""}
                fill
                className="object-cover"
              />
            </div>
            {value.caption && (
              <p className="text-sm text-gray-500 text-center mt-2 italic">{value.caption}</p>
            )}
          </div>
        );
      },
    },
  };
};
