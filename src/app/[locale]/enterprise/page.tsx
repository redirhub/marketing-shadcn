import type { Metadata } from "next";
import { APP_NAME, URL_DASHBOARD_REGISTER } from "@/config/constant";
import { buildCanonicalUrl, buildStaticHreflangAlternates, buildSocialCards, generateFAQSchema } from "@/lib/utils/seo";
import { allLanguages } from "@/sanity/config/i18n";
import { fetchFAQSetByPage } from "@/lib/services/faq";
import FAQSection from "@/components/shared/FAQSection";
import Link from "next/link";
import { Zap, ShieldCheck, Globe, Lock, Server, Users, Clock } from "lucide-react";

const TYPEFORM_URL =
  "https://form.typeform.com/to/b8G7n6nh?typeform-embed-id=061521929204578885&typeform-embed=embed-widget&typeform-medium=snippet&typeform-medium-version=next&embed-opacity=100&typeform-embed-handles-redirect=1&typeform-embed-no-heading=true";

const stats = [
  {
    icon: Zap,
    statValue: "90ms",
    title: "Rapid redirect",
    description: "Average redirect latency, ensuring quick, seamless user experiences",
    linkHref: "https://findredirect.com/uptime",
    linkLabel: "View real-time speed report",
    featured: true,
  },
  {
    icon: ShieldCheck,
    statValue: "100%",
    title: "SLA",
    description: "Guaranteed performance 24/7 with our infrastructure",
  },
  {
    icon: Globe,
    statValue: "10+",
    title: "Locations",
    description: "Points of Presence worldwide for reliable, global coverage",
  },
  {
    icon: Lock,
    statValue: "Two-factor",
    title: "Authentication",
    description: "An extra guard on your account that ensures only authorized users access your dashboard.",
  },
  {
    icon: Server,
    statValue: "Dedicated",
    title: "Network",
    description: "Average redirect latency, ensuring quick, seamless user experiences",
  },
  {
    icon: Clock,
    statValue: "99.99%",
    title: "Uptime",
    description: "Uptime guarantee, ensuring consistent access, dependable performance for all users",
  },
  {
    icon: ShieldCheck,
    statValue: "SSO",
    title: "SAML",
    description: "Strengthen your sign-on process by unifying with your existing authentication solution.",
  },
  {
    icon: Users,
    statValue: "Team",
    title: "Members",
    description: "Decide who manages, views, or edits each redirect in your network for total peace of mind.",
  },
];

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const title = `Enterprise Solutions - ${APP_NAME}`;
  const description = `Enterprise redirect management with dedicated support, custom SLAs, and advanced security. Scale your business with ${APP_NAME}.`;
  return {
    title,
    description,
    alternates: {
      canonical: buildCanonicalUrl(locale, "/enterprise"),
      ...buildStaticHreflangAlternates(allLanguages, "/enterprise"),
    },
    ...buildSocialCards({ title, description }),
  };
}

export default async function EnterprisePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const faqSet = await fetchFAQSetByPage("enterprise", locale);
  const faqSchema = generateFAQSchema(faqSet?.faqs);

  return (
    <div className="bg-white">
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}

      {/* Banner */}
      <div className="pt-28 pb-12 bg-gradient-to-br from-[#0f1923] to-[#1b3a5c]">
        <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Reach Out to {APP_NAME}
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
            Organize a demo or get help purchasing the product
          </p>
          <Link
            href={URL_DASHBOARD_REGISTER}
            className="inline-block px-8 py-3 bg-brand-teal hover:bg-brand-teal/90 text-white font-semibold rounded-xl transition-colors"
          >
            Get Started
          </Link>
        </div>
      </div>

      {/* Book a Demo */}
      <div className="w-full py-10 md:py-16 bg-[#f2f4ef]">
        <div className="max-w-5xl mx-auto px-4 md:px-6">
          <h2 className="text-center text-[#344054] font-medium text-3xl md:text-5xl tracking-wide mb-6 md:mb-12 leading-tight">
            Book a demo with {APP_NAME}
          </h2>
          <div className="w-full h-[450px] md:h-[500px] rounded-3xl overflow-hidden bg-white shadow-sm border border-gray-100">
            <iframe
              src={TYPEFORM_URL}
              width="100%"
              height="100%"
              title="RedirHub Demo Booking"
              style={{ border: "none" }}
            />
          </div>
        </div>
      </div>

      {/* Stands Out */}
      <div className="w-full py-20 md:py-24 bg-white">
        <h2 className="text-center text-[#344054] font-medium text-2xl md:text-5xl tracking-wide mb-6 md:mb-12">
          Why{" "}
          <span className="font-extrabold bg-gradient-to-r from-brand-teal to-brand-blue bg-clip-text text-transparent">
            {APP_NAME}
          </span>{" "}
          Stands Out
        </h2>
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          {/* Row 1: featured (60%) + 2 cards (40%) */}
          <div className="flex flex-col lg:flex-row gap-5 mb-6 md:mb-10">
            <div className="flex-[1.5]">
              <StatCard {...stats[0]} />
            </div>
            <div className="flex-[1.5] flex flex-col md:flex-row gap-6">
              <div className="flex-1"><StatCard {...stats[1]} /></div>
              <div className="flex-1"><StatCard {...stats[2]} /></div>
            </div>
          </div>
          {/* Row 2: 2 equal cards */}
          <div className="flex flex-col lg:flex-row gap-6 mb-6 md:mb-10">
            {stats.slice(3, 5).map((item, i) => (
              <div key={i} className="flex-1"><StatCard {...item} /></div>
            ))}
          </div>
          {/* Row 3: 3 equal cards */}
          <div className="flex flex-col lg:flex-row gap-6">
            {stats.slice(5, 8).map((item, i) => (
              <div key={i} className="flex-1"><StatCard {...item} /></div>
            ))}
          </div>
        </div>
      </div>

      <FAQSection faqs={faqSet?.faqs} />
    </div>
  );
}

function StatCard({
  icon: Icon,
  statValue,
  title,
  description,
  linkHref,
  linkLabel,
}: {
  icon: React.ComponentType<{ className?: string }>;
  statValue: string;
  title: string;
  description: string;
  linkHref?: string;
  linkLabel?: string;
  featured?: boolean;
}) {
  return (
    <div className="bg-[#F2F4EF] rounded-[32px] p-4 pb-7 flex flex-col justify-center h-full">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-5">
          <div className="flex items-center justify-center w-14 h-14 flex-shrink-0 bg-white rounded-2xl">
            <Icon className="w-7 h-7 text-brand-blue" />
          </div>
          <div>
            <p className="font-bold text-xl md:text-2xl text-[#101828] leading-none">{statValue}</p>
            <p className="text-[#667085] text-base mt-1">{title}</p>
          </div>
        </div>
        <div>
          <p className="text-[#667085] text-base leading-relaxed tracking-wide">{description}</p>
          {linkHref && linkLabel && (
            <a
              href={linkHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-brand-blue font-semibold text-sm mt-3 hover:text-gray-500 transition-colors"
            >
              {linkLabel} →
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
