import Image from "next/image";
import Link from "next/link";
import type { HeroSection } from "@/types/sanity";
import { safeUrlFor } from "@/sanity/lib/safeImage";
import { URL_DASHBOARD_REGISTER } from "@/config/constant";

const bannerGradients: Record<string, string> = {
  default: "linear-gradient(163deg, #1c6db6 0%, #20a795 86%)",
  purple: "linear-gradient(163deg, #3d2b9e 0%, #7c4dbb 86%)",
  teal: "linear-gradient(163deg, #0a6b61 0%, #0d9a8a 86%)",
  dark: "linear-gradient(163deg, #0f1923 0%, #1b3a5c 86%)",
};

interface LandingPageBannerProps {
  hero: HeroSection;
}

export default function LandingPageBanner({ hero }: LandingPageBannerProps) {
  const gradient = bannerGradients[hero?.bannerStyle ?? "default"] ?? bannerGradients.default;
  const ctaUrl = hero?.ctaPrimary?.url || URL_DASHBOARD_REGISTER;
  const heroImageUrl = safeUrlFor(hero?.heroImage, { width: 3000, height: 1500, fallback: "" }) || null;
  const aspectRatio = (hero?.heroImage as any)?.dimensions?.aspectRatio;
  const imageHeight = aspectRatio ? Math.round(1920 / aspectRatio) : 600;
  const showCTA = !!hero?.ctaPrimary?.label;

  return (
    <div
      className="pt-28"
      style={{ backgroundImage: gradient }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center gap-2">
          {hero?.badge && (
            <span className="inline-block px-3.5 py-1.5 rounded-full text-sm text-white font-medium mb-2 bg-white/10">
              {hero.badge}
            </span>
          )}
          <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold leading-tight text-white mb-2 md:mb-4 tracking-tight max-w-4xl">
            {hero?.headline}
          </h1>
          {hero?.subheadline && (
            <p className="text-base md:text-xl text-white/90 w-full md:w-4/5 tracking-wide mb-3 leading-relaxed">
              {hero.subheadline}
            </p>
          )}
          {showCTA && (
            <div className="flex flex-col items-center gap-2 my-2.5">
              <Link
                href={ctaUrl}
                target={ctaUrl.startsWith("http") ? "_blank" : "_self"}
                className="px-6 py-3 bg-brand-teal hover:bg-brand-teal/90 text-white font-semibold rounded-xl transition-colors"
              >
                {hero.ctaPrimary!.label}
              </Link>
              {hero?.ctaNote && (
                <p className="text-sm md:text-base font-semibold text-white/60 tracking-wide">
                  {hero.ctaNote}
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {heroImageUrl && (
        <div className="w-full mt-8">
          <Image
            src={heroImageUrl}
            alt={hero?.headline}
            width={1920}
            height={imageHeight}
            unoptimized
            priority
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
          />
        </div>
      )}
    </div>
  );
}
