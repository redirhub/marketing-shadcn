"use client";

import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { APP_NAME, URL_DASHBOARD_LOGIN, URL_DASHBOARD_REGISTER } from "@/config/constant";
import { useTranslations } from "next-intl";

function localePath(locale: string, path: string) {
  if (locale === "en") return path;
  return `/${locale}${path}`;
}

export default function Nav() {
  const t = useTranslations("nav");
  const params = useParams();
  const pathname = usePathname();
  const locale = (params?.locale as string) || "en";
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setIsScrolled(window.scrollY > 20);
    handler();
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navLinks = [
    { label: t("pricing"), href: localePath(locale, "/pricing") },
    { label: t("blog"), href: localePath(locale, "/blog") },
    { label: t("support"), href: localePath(locale, "/support") },
    { label: t("docs"), href: "https://docs.redirhub.com", external: true },
  ];

  const isDark = !isScrolled && !pathname.includes("/blog") && !pathname.includes("/pricing") && !pathname.includes("/support");

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href={localePath(locale, "/")} className="flex items-center gap-2">
          <span className={`text-xl font-bold ${isDark && !isScrolled ? "text-white" : "text-brand-navy"}`}>
            {APP_NAME}
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) =>
            link.external ? (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-sm font-medium transition-colors hover:text-brand-blue ${
                  isDark && !isScrolled ? "text-white/90" : "text-brand-charcoal"
                }`}
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-brand-blue ${
                  isDark && !isScrolled ? "text-white/90" : "text-brand-charcoal"
                }`}
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href={URL_DASHBOARD_LOGIN}
            className={`text-sm font-medium transition-colors hover:text-brand-blue ${
              isDark && !isScrolled ? "text-white/90" : "text-brand-charcoal"
            }`}
          >
            {t("login")}
          </a>
          <a
            href={URL_DASHBOARD_REGISTER}
            className="inline-flex items-center justify-center px-3 py-1.5 text-sm font-medium rounded-lg bg-brand-blue hover:bg-brand-blue/90 text-white transition-colors"
          >
            {t("get-started")}
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className={`md:hidden p-2 rounded-md ${isDark && !isScrolled ? "text-white" : "text-brand-charcoal"}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <nav className="px-4 py-4 flex flex-col gap-3">
            {navLinks.map((link) =>
              link.external ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-brand-charcoal hover:text-brand-blue py-2"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium text-brand-charcoal hover:text-brand-blue py-2"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              )
            )}
            <div className="flex flex-col gap-2 pt-2 border-t border-gray-100">
              <a href={URL_DASHBOARD_LOGIN} className="text-sm font-medium text-brand-charcoal py-2">
                {t("login")}
              </a>
              <a
                href={URL_DASHBOARD_REGISTER}
                className="inline-flex w-full items-center justify-center px-3 py-2 text-sm font-medium rounded-lg bg-brand-blue hover:bg-brand-blue/90 text-white transition-colors"
              >
                {t("get-started")}
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
