interface PricingBannerProps {
  title: string;
  mainTitle: string;
  subtitle: string;
}

export default function PricingBanner({ title, mainTitle, subtitle }: PricingBannerProps) {
  return (
    <div
      className="pt-28 pb-40 md:pb-[400px] relative"
      style={{ background: "linear-gradient(135deg, #1c6db6 0%, #18304b 100%)" }}
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-white/5" />
        <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-white/5" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center gap-2">
          <h1
            className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight max-w-4xl mb-2 md:mb-4"
            style={{ letterSpacing: "-1.8px" }}
          >
            {title}
          </h1>

          <h2 className="text-2xl md:text-5xl font-semibold text-white/88 leading-snug max-w-5xl"
            style={{ fontSize: "clamp(1.5rem, 4vw, 44px)" }}
          >
            {mainTitle}
          </h2>

          <p className="text-sm md:text-xl font-medium text-white max-w-3xl mt-1 md:mt-2.5 leading-relaxed">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
}
