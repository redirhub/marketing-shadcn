"use client";

import Link from "next/link";
import React from "react";
import { APP_NAME } from "@/config/constant";
import { useTranslations } from "next-intl";

export const FooterCtaHeader: React.FC = () => {
  const t = useTranslations("nav");
  const ctaUrl = "/enterprise";

  return (
    <div className="flex flex-col items-center gap-6 text-center mb-[60px]">
      <p className="text-[1.5rem] md:text-[2rem] lg:text-[3rem] font-bold text-white leading-8 md:leading-8 lg:leading-[3rem] max-w-[1000px] tracking-[0.8px]">
        {t("footer-cta-title", "Redirect 5x Faster with Built-in Security")}
      </p>

      <div className="flex flex-col gap-0 max-w-[700px]">
        <p className="text-center text-white text-base md:text-[20px] font-medium tracking-[0.2px] [text-shadow:0px_0px_10px_rgba(0,0,0,0.3)]">
          {t(
            "footer-cta-text",
            "Experience the power of rapid, secure redirects and effortless management. {n} speeds up your workflow while keeping your domain safe.",
            { n: APP_NAME }
          )}
        </p>
      </div>

      <Link href={ctaUrl}>
        <button className="inline-flex items-center justify-center px-6 py-3.5 min-h-[48px] text-base font-medium rounded-lg bg-white text-brand-blue hover:bg-white/90 transition-colors">
          {t("footer-cta-button", "Get Started For Free")}
        </button>
      </Link>
    </div>
  );
};
