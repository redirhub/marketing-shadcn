"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Users, RefreshCw } from "lucide-react";
import {
  APP_NAME,
  URL_DASHBOARD_LOGIN,
  URL_DASHBOARD_REGISTER,
} from "@/config/constant";
import MegaMenu from "./MegaMenu";
import MobileMenu from "./MobileMenu";

// Dev resources URL — matches the old URL_API_DEV constant
const URL_API_DEV =
  process.env.NEXT_PUBLIC_API_DEV_URL || "https://docs.redirhub.com";

interface NavProps {
  mode?: "light" | "dark";
}

function localePath(locale: string, path: string) {
  if (locale === "en") return path;
  return `/${locale}${path}`;
}

interface MegaMenuItem {
  label: string;
  description?: string;
  icon: string | React.ElementType;
  href: string;
  target?: string;
}

interface MegaMenuColumn {
  header: string;
  items: MegaMenuItem[];
}

interface MegaMenuFooterItem {
  label: string;
  icon: string | React.ElementType;
  href: string;
  target?: string;
}

interface NavItem {
  label: string;
  href?: string;
  items?: Array<{ href: string; label: string }>;
  megaMenu?: {
    columns: MegaMenuColumn[];
    footer?: MegaMenuFooterItem[];
  };
}

export default function Nav({ mode = "dark" }: NavProps) {
  const t = useTranslations("nav");
  const params = useParams();
  const pathname = usePathname();
  const locale = (params?.locale as string) || "en";
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDark, setIsDark] = useState(mode === "dark");
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setIsScrolled(y > 0);
      setHasScrolled(y > 400);
      setIsDark(mode === "dark" ? y < 400 : false);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mode, pathname, locale]);

  // Build nav items with mega menus and translated labels
  const navItems: NavItem[] = [
    {
      label: t("features", "Features"),
      megaMenu: {
        columns: [
          {
            header: t("features-create", "Create"),
            items: [
              {
                label: t("features-create-redirects", "Create redirects"),
                description: t(
                  "features-create-description",
                  "Create and deploy all your redirects quickly and easily"
                ),
                icon: "/assets/images/dropdown-icons/switch-horizontal.svg",
                href: localePath(locale, "/create-redirects"),
              },
              {
                label: t("features-manage-redirects", "Manage redirects"),
                description: t(
                  "features-manage-description",
                  "Manage all your redirects in one centralized platform"
                ),
                icon: "/assets/images/dropdown-icons/toggle-right.svg",
                href: localePath(locale, "/manage-redirects"),
              },
              {
                label: t("features-analyze-redirects", "Analyse redirects"),
                description: t(
                  "features-analyze-description",
                  "Gain powerful insights from your redirect traffic"
                ),
                icon: "/assets/images/dropdown-icons/line-chart-up.svg",
                href: localePath(locale, "/analyze-redirects"),
              },
            ],
          },
          {
            header: t("features-collaborate", "Collaborate"),
            items: [
              {
                label: t("features-team-management", "Team Management"),
                description: t(
                  "features-team-description",
                  "Collaborate securely across your organization"
                ),
                icon: Users,
                href: localePath(locale, "/team-management"),
              },
              {
                label: t("features-global-scale", "Global Scale"),
                description: t(
                  "features-global-description",
                  "Deliver seamless experiences across websites and domains"
                ),
                icon: "/assets/images/dropdown-icons/globe.svg",
                href: localePath(locale, "/fast-redirect-service"),
              },
              {
                label: t("features-security-privacy", "Security & Privacy"),
                description: t(
                  "features-security-description",
                  "Keep all your audiences and web properties safe"
                ),
                icon: "/assets/images/dropdown-icons/shield-tick.svg",
                href: localePath(locale, "/security"),
              },
            ],
          },
        ],
        footer: [
          {
            label: t("features-dev-resources", "Dev resources"),
            icon: "/assets/images/dropdown-icons/code.svg",
            href: URL_API_DEV,
            target: "blank",
          },
          {
            label: t("mcp", "MCP server"),
            icon: "/assets/images/dropdown-icons/sparkle.svg",
            href: localePath(locale, "/mcp"),
          },
        ],
      },
    },
    {
      label: t("solutions", "Solutions"),
      megaMenu: {
        columns: [
          {
            header: "",
            items: [
              {
                label: t("features-website-migrations", "Website Migration"),
                description: t(
                  "features-migration-description",
                  "Seamless migration while preserving SEO"
                ),
                icon: "/assets/images/dropdown-icons/switch-horizontal.svg",
                href: localePath(locale, "/website-migrations"),
              },
              {
                label: t("features-domain-parking", "Domain Parking"),
                description: t(
                  "features-parking-description",
                  "Centralized redirects and brand defense"
                ),
                icon: "/assets/images/dropdown-icons/server.svg",
                href: localePath(locale, "/domain-parking"),
              },
            ],
          },
          {
            header: "",
            items: [
              {
                label: t(
                  "features-marketing-campaigns",
                  "Marketing Campaigns"
                ),
                description: t(
                  "features-marketing-description",
                  "Streamlined link management and A/B testing"
                ),
                icon: "/assets/images/dropdown-icons/announcement.svg",
                href: localePath(locale, "/marketing-campaigns"),
              },
              {
                label: t(
                  "features-scalable-enterprise-solutions",
                  "Enterprise Solutions"
                ),
                description: t(
                  "features-enterprise-description",
                  "Global edge network with guaranteed uptime"
                ),
                icon: "/assets/images/dropdown-icons/building.svg",
                href: localePath(locale, "/scalable-enterprise-solutions"),
              },
            ],
          },
        ],
        footer: [
          {
            label: t("features-whats-new", "What's new"),
            icon: RefreshCw,
            href: localePath(locale, "/changelog"),
          },
        ],
      },
    },
    {
      href: localePath(locale, "/pricing"),
      label: t("pricing", "Pricing"),
    },
    {
      href: localePath(locale, "/support"),
      label: t("support", "Support"),
    },
    {
      href: localePath(locale, "/enterprise"),
      label: t("enterprise", "Enterprise"),
    },
  ];

  // Check if a nav link is active
  const isActive = (href: string | undefined) => {
    if (!href) return false;
    return pathname === href;
  };

  // Active/hover styles for nav links
  const navLinkBase =
    "text-[18px] leading-6 tracking-[0.2px] font-medium font-sans py-[10px] px-[14px] rounded-xl border border-transparent transition-all duration-200 flex items-center";
  const navLinkIdle = isDark ? "text-white/90" : "text-brand-charcoal";
  const navLinkHover = isDark
    ? "hover:bg-white/10 hover:border-white/20"
    : "hover:bg-gray-100 hover:border-gray-200";
  const navLinkActive = isDark
    ? "bg-white/10 border-white/20"
    : "bg-gray-100 border-gray-200";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md border-b border-gray-100 py-2 lg:py-1"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href={localePath(locale, "/")}>
            <Image
              src={
                isDark
                  ? "/assets/images/logo-dark.png"
                  : "/assets/images/logo.png"
              }
              alt={APP_NAME}
              width={150}
              height={53}
              style={{ height: "auto" }}
              priority
            />
          </Link>

          {/* Mobile menu */}
          <div className="xl:hidden">
            <MobileMenu
              navItems={navItems}
              localePath={(p: string) => localePath(locale, p)}
            />
          </div>

          {/* Desktop nav */}
          <nav className="hidden xl:flex items-center gap-8 justify-center">
            {navItems.map((item) => {
              if (item.items || item.megaMenu) {
                return (
                  <MegaMenu
                    key={item.label}
                    label={item.label}
                    items={item.items}
                    megaMenu={item.megaMenu}
                    isDark={isDark}
                  />
                );
              }
              return (
                <Link key={item.href} href={item.href || "#"}>
                  <span
                    className={`${navLinkBase} ${navLinkIdle} ${navLinkHover} ${
                      isActive(item.href) ? navLinkActive : ""
                    }`}
                  >
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA buttons */}
          <div className="hidden xl:flex items-center gap-4">
            <Link href={URL_DASHBOARD_LOGIN}>
              <span
                className={`inline-flex items-center justify-center px-6 py-[11px] min-w-[106px] rounded-xl border text-[15px] font-bold leading-5 tracking-[0.2px] font-sans cursor-pointer transition-all duration-200 ${
                  isDark
                    ? "border-white/30 text-white hover:bg-white/10"
                    : "border-brand-charcoal text-brand-charcoal hover:bg-gray-50"
                }`}
              >
                {t("login", "Login")}
              </span>
            </Link>
            <Link href={URL_DASHBOARD_REGISTER}>
              <span className="inline-flex items-center justify-center px-6 py-3 min-w-[106px] rounded-xl bg-brand-blue text-white text-[15px] font-bold leading-5 tracking-[0.2px] font-sans cursor-pointer transition-all duration-200 hover:bg-brand-blue/90">
                {t("get-started", "Start for Free")}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
