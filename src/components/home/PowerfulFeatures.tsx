"use client";

import { useTranslations } from "next-intl";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface FeatureItem {
  heading: string;
  description: string;
}

interface FeatureTabData {
  value: string;
  tab: string;
  title: string;
  description: string;
  features: FeatureItem[];
  icon: string;
}

function CheckIcon() {
  return (
    <svg className="w-5 h-5 text-brand-teal shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

export default function PowerfulFeatures() {
  const t = useTranslations();

  const tabs: FeatureTabData[] = [
    {
      value: "create",
      tab: t("home.features-create-tab"),
      title: t("home.features-create-title"),
      description: t("home.features-create-desc"),
      icon: "🔀",
      features: [
        { heading: t("home.features-create-types"), description: t("home.features-create-types-desc") },
        { heading: t("home.features-create-wildcard"), description: t("home.features-create-wildcard-desc") },
        { heading: t("home.features-create-csv"), description: t("home.features-create-csv-desc") },
      ],
    },
    {
      value: "manage",
      tab: t("home.features-manage-tab"),
      title: t("home.features-manage-title"),
      description: t("home.features-manage-desc"),
      icon: "🛠",
      features: [
        { heading: t("home.features-manage-search"), description: t("home.features-manage-search-desc") },
        { heading: t("home.features-manage-health"), description: t("home.features-manage-health-desc") },
        { heading: t("home.features-manage-bulk"), description: t("home.features-manage-bulk-desc") },
      ],
    },
    {
      value: "team",
      tab: t("home.features-team-tab"),
      title: t("home.features-team-title"),
      description: t("home.features-team-desc"),
      icon: "👥",
      features: [
        { heading: t("home.features-team-roles"), description: t("home.features-team-roles-desc") },
        { heading: t("home.features-team-domains"), description: t("home.features-team-domains-desc") },
        { heading: t("home.features-team-revoke"), description: t("home.features-team-revoke-desc") },
      ],
    },
    {
      value: "qr",
      tab: t("home.features-qr-tab"),
      title: t("home.features-qr-title"),
      description: t("home.features-qr-desc"),
      icon: "📱",
      features: [
        { heading: t("home.features-qr-dynamic"), description: t("home.features-qr-dynamic-desc") },
        { heading: t("home.features-qr-branding"), description: t("home.features-qr-branding-desc") },
        { heading: t("home.features-qr-track"), description: t("home.features-qr-track-desc") },
      ],
    },
  ];

  return (
    <section className="w-full py-20 md:py-28 px-4 md:px-6 bg-white">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-navy mb-4">
          {t("home.features-title")}
        </h2>
        <p className="text-brand-charcoal/60 text-lg mb-14 max-w-2xl mx-auto">
          {t("home.features-subtitle")}
        </p>

        <Tabs defaultValue="create">
          <div className="flex justify-center mb-8">
            <TabsList variant="line" className="h-auto gap-2 pb-0">
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="px-5 py-2.5 text-sm font-medium text-brand-charcoal/60 data-[data-active]:text-brand-navy"
                >
                  {tab.tab}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {tabs.map((tab) => (
            <TabsContent key={tab.value} value={tab.value}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center bg-[#F5F6F8] rounded-2xl p-8 text-left">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-brand-navy mb-4">
                    {tab.title}
                  </h3>
                  <p className="text-brand-charcoal/70 mb-6 leading-relaxed">
                    {tab.description}
                  </p>
                  <ul className="space-y-4">
                    {tab.features.map((f, i) => (
                      <li key={i} className="flex gap-3">
                        <CheckIcon />
                        <span className="text-brand-charcoal text-sm leading-relaxed">
                          <span className="font-bold">{f.heading}</span>{" "}
                          {f.description}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-col sm:flex-row gap-3 mt-8">
                    <a
                      href="https://app.redirhub.com/register"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center h-11 px-6 rounded-lg bg-brand-blue text-white font-semibold text-sm hover:bg-brand-blue/90 transition-colors"
                    >
                      {t("home.features-get-started")}
                    </a>
                    <a
                      href="/docs"
                      className="inline-flex items-center justify-center h-11 px-6 rounded-lg border border-brand-blue/30 text-brand-blue font-semibold text-sm hover:bg-brand-blue/5 transition-colors"
                    >
                      {t("nav.learn-more")}
                    </a>
                  </div>
                </div>

                <div className="w-full h-80 rounded-2xl bg-gradient-to-br from-brand-blue/10 to-brand-teal/10 flex items-center justify-center">
                  <span className="text-8xl">{tab.icon}</span>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
