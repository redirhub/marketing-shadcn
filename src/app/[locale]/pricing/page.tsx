import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { APP_NAME } from "@/config/constant";
import { buildCanonicalUrl, buildStaticHreflangAlternates, buildSocialCards, generateFAQSchema } from "@/lib/utils/seo";
import { allLanguages } from "@/sanity/config/i18n";
import PricingBanner from "@/components/pricing/PricingBanner";
import InteractivePricing from "@/components/pricing/InteractivePricing";
import FAQSection from "@/components/shared/FAQSection";
import { fetchFAQSetByPage } from "@/lib/services/faq";
import { fetchPricingPlans, fetchPricingAddons } from "@/lib/services/pricing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pricing" });

  const title = `${t("title")} - ${APP_NAME}`;
  const description = `Transparent pricing plans for ${APP_NAME}. From startups to enterprise. No hidden fees, cancel anytime.`;

  return {
    title,
    description,
    alternates: {
      canonical: buildCanonicalUrl(locale, "/pricing"),
      ...buildStaticHreflangAlternates(allLanguages, "/pricing"),
    },
    ...buildSocialCards({ title, description }),
  };
}

export default async function PricingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pricing" });

  const [faqSet, redirectData, monitorData, addons] = await Promise.all([
    fetchFAQSetByPage("pricing", locale),
    fetchPricingPlans("redirect", locale),
    fetchPricingPlans("monitor", locale),
    fetchPricingAddons(locale),
  ]);

  const faqSchema = generateFAQSchema(faqSet?.faqs);

  return (
    <>
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <PricingBanner
        title={t("title")}
        mainTitle={t("main-title")}
        subtitle={t("subtitle")}
      />
      <InteractivePricing
        redirectData={redirectData}
        monitorData={monitorData}
        addons={addons}
      />
      <FAQSection faqs={faqSet?.faqs} title={t("faq-title")} />
    </>
  );
}
