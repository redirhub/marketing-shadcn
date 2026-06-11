import Link from "next/link";
import React from "react";

export interface FooterLinkItem {
  label: string;
  href: string;
}

export interface FooterLinks {
  legal: FooterLinkItem[];
}

interface FooterBottomBarProps {
  footerLinks: FooterLinks;
}

export const FooterBottomBar: React.FC<FooterBottomBarProps> = ({
  footerLinks,
}) => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="flex flex-col md:flex-row justify-center md:justify-between items-center pt-8 gap-4">
      <div className="flex flex-wrap gap-4 justify-center md:justify-start">
        {footerLinks.legal?.map((link, index) => (
          <React.Fragment key={link.href}>
            <Link href={link.href} passHref>
              <span className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200">
                {link.label}
              </span>
            </Link>

            {index < footerLinks.legal.length - 1 && (
              <span className="text-sm text-gray-400">-</span>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Copyright Text */}
      <span className="text-sm text-gray-600">
        &copy; Copyright - RedirHub
      </span>
    </div>
  );
};
