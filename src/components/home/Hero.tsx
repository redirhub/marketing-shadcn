"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Hero() {
  const t = useTranslations();

  return (
    <section className="relative min-h-[85vh] brand-gradient flex items-center">
      <div className="absolute inset-0 bg-black/30" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-6 py-20 md:py-28 flex flex-col items-center text-center">
        <span className="glass inline-block px-4 py-2 text-sm text-white font-medium mb-6 rounded-full">
          {t("home.hero-badge")}
        </span>

        <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-3">
          {t("home.hero-title")}
        </h2>

        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-tight tracking-tight mb-6">
          {t("home.hero-h1-before")}{" "}
          <span className="text-brand-teal">{t("home.hero-h1-highlight")}</span>{" "}
          {t("home.hero-h1-after")}
        </h1>

        <p className="text-base md:text-xl text-white/90 max-w-2xl mb-10 leading-relaxed">
          {t("home.hero-subtitle")}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 w-full max-w-lg">
          <Input
            type="text"
            placeholder={t("home.hero-cta-placeholder")}
            className="bg-white/95 text-brand-charcoal placeholder:text-brand-gray border-0 h-12 text-base flex-1 rounded-lg"
          />
          <Button
            className="bg-brand-amber hover:bg-brand-amber/90 text-white border-0 h-12 px-7 text-base font-semibold whitespace-nowrap rounded-lg"
          >
            {t("home.hero-cta-button")}
          </Button>
        </div>

        <div className="mt-14 flex flex-col items-center gap-5">
          <p className="text-white/60 text-sm font-medium uppercase tracking-widest">
            {t("home.hero-trusted")}
          </p>
          <div className="flex items-center gap-4 flex-wrap justify-center">
            {["Acme Corp", "GlobalTech", "Startup.io", "MediaGroup", "DevCo"].map((name) => (
              <div
                key={name}
                className="glass px-5 py-2 rounded-lg text-white/70 text-sm font-medium"
              >
                {name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
