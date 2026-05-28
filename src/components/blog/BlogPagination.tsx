import Link from "next/link";

interface BlogPaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

export default function BlogPagination({ currentPage, totalPages, basePath }: BlogPaginationProps) {
  if (totalPages <= 1) return null;

  const getPageUrl = (page: number) => {
    if (page === 1) return basePath;
    return `${basePath}/page/${page}`;
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center items-center gap-2 mt-12">
      {currentPage > 1 && (
        <Link
          href={getPageUrl(currentPage - 1)}
          className="px-4 py-2 text-sm font-medium text-brand-blue border border-brand-blue rounded-lg hover:bg-brand-blue hover:text-white transition-colors"
        >
          Previous
        </Link>
      )}

      {pages.map((page) => (
        <Link
          key={page}
          href={getPageUrl(page)}
          className={`w-10 h-10 flex items-center justify-center text-sm font-medium rounded-lg transition-colors ${
            page === currentPage
              ? "bg-brand-blue text-white"
              : "text-gray-600 border border-gray-200 hover:border-brand-blue hover:text-brand-blue"
          }`}
        >
          {page}
        </Link>
      ))}

      {currentPage < totalPages && (
        <Link
          href={getPageUrl(currentPage + 1)}
          className="px-4 py-2 text-sm font-medium text-brand-blue border border-brand-blue rounded-lg hover:bg-brand-blue hover:text-white transition-colors"
        >
          Next
        </Link>
      )}
    </div>
  );
}
