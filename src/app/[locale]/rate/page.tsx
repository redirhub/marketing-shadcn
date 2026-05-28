"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { APP_NAME } from "@/config/constant";

const SENJA_URL = "https://senja.io/p/redirhub/r/aCUxmb";
const G2_URL = "https://www.g2.com/products/redirhub/reviews#reviews";
const TRUSTPILOT_URL = "https://www.trustpilot.com/evaluate/redirhub.com";

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={filled ? 0 : 1.5}
      className="w-10 h-10 md:w-12 md:h-12"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
      />
    </svg>
  );
}

function RatePageContent() {
  const searchParams = useSearchParams();
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);

  useEffect(() => {
    const ratingParam = searchParams.get("rating");
    if (ratingParam) {
      const rating = parseInt(ratingParam, 10);
      if (rating >= 1 && rating <= 5) {
        setSelectedRating(rating);
      }
    }
  }, [searchParams]);

  const activeRating = hoveredRating ?? selectedRating ?? 0;

  const renderContent = () => {
    if (selectedRating === null) {
      return (
        <div className="flex flex-col items-center gap-6 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">How do you rate our product?</h1>
          <p className="text-lg text-gray-600">Your feedback helps us improve {APP_NAME}</p>
          <div className="flex gap-2 mt-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setSelectedRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(null)}
                className={`transition-transform hover:scale-110 ${
                  star <= activeRating ? "text-orange-400" : "text-gray-300"
                }`}
              >
                <StarIcon filled={star <= activeRating} />
              </button>
            ))}
          </div>
        </div>
      );
    }

    if (selectedRating >= 1 && selectedRating <= 4) {
      return (
        <div className="flex flex-col items-center gap-6 text-center">
          <span className="text-5xl">😔</span>
          <h2 className="text-2xl font-bold text-gray-800">We&apos;re sorry to hear that</h2>
          <p className="text-lg text-gray-600 max-w-md">
            We&apos;d love to hear your feedback so we can improve. Please share your thoughts with us.
          </p>
          <button
            onClick={() => window.open(SENJA_URL, "_blank", "noopener,noreferrer")}
            className="mt-4 w-full px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition-colors"
          >
            Share Your Feedback
          </button>
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center gap-6 text-center">
        <span className="text-5xl">🎉</span>
        <h2 className="text-2xl font-bold text-gray-800">
          Thank you! We&apos;re thrilled you love {APP_NAME}
        </h2>
        <p className="text-lg text-gray-600 max-w-md">
          Would you mind sharing your experience with others? Your review helps us grow!
        </p>
        <div className="flex flex-col gap-3 w-full max-w-sm mt-4">
          <button
            onClick={() => window.open(G2_URL, "_blank", "noopener,noreferrer")}
            className="w-full px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl transition-colors"
          >
            Review on G2
          </button>
          <button
            onClick={() => window.open(TRUSTPILOT_URL, "_blank", "noopener,noreferrer")}
            className="w-full px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-xl transition-colors"
          >
            Review on Trustpilot
          </button>
        </div>
        <button
          onClick={() => setSelectedRating(null)}
          className="text-gray-600 hover:text-gray-800 hover:underline mt-2 text-sm"
        >
          Change Rating
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-700 px-4 py-8 md:py-12">
      <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 max-w-2xl w-full">
        {renderContent()}
      </div>
    </div>
  );
}

export default function RatePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-700" />}>
      <RatePageContent />
    </Suspense>
  );
}
