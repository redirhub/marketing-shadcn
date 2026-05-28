import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { fetchTestimonials } from "@/lib/services/testimonials";

interface TestimonialsSectionProps {
  locale?: string;
}

export default async function TestimonialsSection({ locale = "en" }: TestimonialsSectionProps) {
  const testimonials = await fetchTestimonials(locale);
  if (!testimonials || testimonials.length === 0) return null;

  return (
    <div className="w-full py-16 px-4 md:px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
          What our customers say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => {
            const avatarUrl = t.avatar ? urlFor(t.avatar).width(80).height(80).url() : null;
            return (
              <div key={t._id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col gap-4">
                <p className="text-gray-700 leading-relaxed text-base">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3 mt-auto">
                  {avatarUrl ? (
                    <Image src={avatarUrl} alt={t.author} width={40} height={40} className="rounded-full object-cover" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-brand-blue flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                      {t.author.charAt(0)}
                    </div>
                  )}
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{t.author}</p>
                    {(t.role || t.company) && (
                      <p className="text-xs text-gray-500">{[t.role, t.company].filter(Boolean).join(", ")}</p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
