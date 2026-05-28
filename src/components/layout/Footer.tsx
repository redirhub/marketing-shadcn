import Link from "next/link";
import { APP_NAME } from "@/config/constant";

function localePath(locale: string, path: string) {
  if (locale === "en") return path;
  return `/${locale}${path}`;
}

interface FooterProps {
  locale?: string;
}

export default function Footer({ locale = "en" }: FooterProps) {
  const links = {
    product: [
      { label: "Pricing", href: localePath(locale, "/pricing") },
      { label: "Blog", href: localePath(locale, "/blog") },
      { label: "Changelog", href: localePath(locale, "/changelog") },
      { label: "Support", href: localePath(locale, "/support") },
    ],
    resources: [
      { label: "API Docs", href: "https://docs.redirhub.com", external: true },
      { label: "System Status", href: "https://redirhub.statuspage.io/", external: true },
    ],
    legal: [
      { label: "Privacy Policy", href: localePath(locale, "/legal/privacy-policy") },
      { label: "Terms of Service", href: localePath(locale, "/legal/terms-of-service") },
    ],
  };

  return (
    <footer className="bg-brand-navy text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href={localePath(locale, "/")} className="text-xl font-bold text-white">
              {APP_NAME}
            </Link>
            <p className="mt-3 text-sm text-white/60 max-w-xs">
              Fast & secure URL redirect management for teams and enterprises.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-sm font-semibold text-white/80 uppercase tracking-wider mb-4">Product</h4>
            <ul className="space-y-2">
              {links.product.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-white/60 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold text-white/80 uppercase tracking-wider mb-4">Resources</h4>
            <ul className="space-y-2">
              {links.resources.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold text-white/80 uppercase tracking-wider mb-4">Legal</h4>
            <ul className="space-y-2">
              {links.legal.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-white/60 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-white/40">
            © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://twitter.com/redirhub"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-white transition-colors text-sm"
            >
              Twitter
            </a>
            <a
              href="https://linkedin.com/company/redirhub"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-white transition-colors text-sm"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
