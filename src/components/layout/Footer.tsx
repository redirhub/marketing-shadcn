"use client";

import Link from "next/link";
import Image from "next/image";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { APP_NAME, SOCIAL_HANDLE, URL_API_DEV, URL_DASHBOARD_LOGIN, URL_DASHBOARD_REGISTER } from "@/config/constant";
import { useTranslations } from "next-intl";
import { decryptEmail, encryptEmail } from "@/lib/utils/email-encryption";
import { Youtube, Twitter, Facebook, Linkedin } from "lucide-react";
import LanguageSelector from "./LanguageSelector";
import { FooterBottomBar, FooterLinkItem } from "./FooterBottomBar";
import { FooterLinkColumn } from "./FooterLinkColumn";
import { FooterCtaHeader } from "./FooterCtaHeader";
import RedirectWidget from "../sections/RedirectWidget";

// Encrypted emails
const BUSINESS_EMAIL = encryptEmail("service@redirhub.com");
const ABUSE_EMAIL = encryptEmail("abuse@redirhub.com");

function localePath(locale: string, path: string) {
  if (locale === "en") return path;
  return `/${locale}${path}`;
}

interface FooterProps {
  locale?: string;
  legalLinks?: FooterLinkItem[];
  landingLinks?: FooterLinkItem[];
}

export default function Footer({
  locale: localeProp,
  legalLinks,
  landingLinks,
}: FooterProps) {
  const t = useTranslations("nav");
  const params = useParams();
  const pathname = usePathname();
  const locale = localeProp || (params?.locale as string) || "en";
  const [businessEmail, setBusinessEmail] = useState<string>("");
  const [abuseEmail, setAbuseEmail] = useState<string>("");

  useEffect(() => {
    setBusinessEmail(decryptEmail(BUSINESS_EMAIL));
    setAbuseEmail(decryptEmail(ABUSE_EMAIL));
  }, []);

  const tabRoutes = [
    "/create-redirects",
    "/manage-redirects",
    "/analyze-redirects",
    "/team-management",
    "/global-scale",
    "/security",
    "/scalable-enterprise-solutions",
    "/domain-parking",
    "/marketing-campaigns",
    "/website-migrations",
  ];

  // Remove locale prefix from pathname: /en/support/... → /support/...
  const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}(\/|$)/, "/") || "/";
  const showTabs =
    tabRoutes.includes(pathWithoutLocale) ||
    pathWithoutLocale.startsWith("/support/");

  const footerLinks = {
    company: [
      {
        label: t("support", "Support"),
        href: localePath(locale, "/support"),
      },
      {
        label: t("pricing", "Pricing"),
        href: localePath(locale, "/pricing"),
      },
      {
        label: t("request-demo", "Request a demo"),
        href: localePath(locale, "/enterprise"),
      },
      { label: t("blog", "Blog"), href: localePath(locale, "/blog") },
      {
        label: t("affiliate-program", "Affiliate Program"),
        href: localePath(locale, "/affiliate"),
      },
    ],
    resources: [
      {
        label: t("system-status", "System Status"),
        href: "https://redirhub.statuspage.io/",
        target: "blank",
      },
      {
        label: t("changelog", "Changelog"),
        href: localePath(locale, "/changelog"),
      },
      {
        label: t("compare", "Compare"),
        href: localePath(locale, "/compare"),
      },
      {
        label: t("api-documentation", "API Documentation"),
        href: URL_API_DEV,
        target: "blank",
      },
      {
        label: t("mcp", "MCP server"),
        href: localePath(locale, "/mcp"),
      },
    ],
    products: [
      ...(landingLinks || []),
    ],
    contact: [
      {
        label: t("login", "Login"),
        href: `${URL_DASHBOARD_LOGIN}?redirect=/`,
      },
      {
        label: t("start-free", "Start for Free"),
        href: URL_DASHBOARD_REGISTER,
      },
      ...(businessEmail
        ? [
            {
              label:
                t("contact-business-email", "Business Email") +
                ` / ${businessEmail}`,
              href: `mailto:${businessEmail}`,
            },
          ]
        : []),
      ...(abuseEmail
        ? [
            {
              label:
                t("contact-abuse-report", "Report Abuse") +
                ` / ${abuseEmail}`,
              href: `mailto:${abuseEmail}`,
            },
          ]
        : []),
    ],
    legal: legalLinks || [],
  };

  const socialLinks = [
    {
      icon: Youtube,
      href: "https://youtube.com/@" + SOCIAL_HANDLE,
      label: "YouTube",
    },
    {
      icon: Twitter,
      href: "https://twitter.com/" + SOCIAL_HANDLE,
      label: "X (Twitter)",
    },
    {
      icon: Facebook,
      href: "https://facebook.com/" + SOCIAL_HANDLE,
      label: "Facebook",
    },
    {
      icon: Linkedin,
      href: "https://linkedin.com/company/" + SOCIAL_HANDLE,
      label: "LinkedIn",
    },
  ];

  return (
    <footer
      className="relative text-gray-700 overflow-hidden pt-12 md:pt-[80px] pb-[120px]"
      style={{
        background: "transparent",
        backgroundImage:
          "linear-gradient(360deg, #1c6db6 0%, #20a795 100%)",
      }}
    >
      {/* Banner background lines overlay */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none opacity-[0.62]"
        style={{
          backgroundImage: "url('/assets/images/banner-bg-lines.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* CTA or Product Widget */}
        {!showTabs && <FooterCtaHeader />}
        {showTabs && (
          <div className="w-full max-w-6xl mx-auto mb-14">
            <p className="text-[1.5rem] md:text-[3rem] lg:text-[3rem] font-semibold text-white leading-8 md:leading-[3rem] lg:leading-[3rem] tracking-[-0.5px] md:tracking-[-1.5px] text-center mb-8 md:mb-12 lg:mb-12">
              {t("widget-title", "Fast, Secure, Effortless Link Management")}
            </p>
            <RedirectWidget />
          </div>
        )}

        {/* Inner card */}
        <div
          className="max-w-7xl mx-auto rounded-[24px] p-10"
          style={{
            background: "linear-gradient(140deg, #FFFFFFC9 0%, #FFFFFFA3 100%)",
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-8">
            {/* Column 1: Logo + Socials + Language */}
            <div className="flex flex-col items-center md:items-start lg:items-start gap-4">
              <div className="flex items-center gap-2 mb-2">
                <Link href={localePath(locale, "/")}>
                  <Image
                    src="/assets/images/logo.png"
                    alt={APP_NAME}
                    width={150}
                    height={53}
                    style={{ height: "auto" }}
                    priority
                  />
                </Link>
              </div>

              {/* Social links */}
              <div className="flex gap-6 my-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <Link
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Icon
                        className="size-6 text-[#475467] cursor-pointer transition-all duration-200 hover:text-[#E49426] hover:-translate-y-0.5"
                      />
                    </Link>
                  );
                })}
              </div>

              <div>
                <LanguageSelector openDirection="top" />
              </div>
            </div>

            {/* Company */}
            <FooterLinkColumn
              title={t("company", "Company")}
              links={footerLinks.company}
            />

            {/* Resources */}
            <FooterLinkColumn
              title={t("resources", "Resources")}
              links={footerLinks.resources}
            />

            {/* Products */}
            <FooterLinkColumn
              title={t("products", "Products")}
              links={footerLinks.products}
            />

            {/* Contact */}
            <FooterLinkColumn
              title={t("contact", "Contact")}
              links={footerLinks.contact}
            />
          </div>

          {/* Bottom Bar */}
          <FooterBottomBar footerLinks={footerLinks} />
        </div>
      </div>
    </footer>
  );
}
