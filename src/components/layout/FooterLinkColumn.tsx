import Link from "next/link";
import React from "react";

interface LinkItem {
  label: string;
  href?: string;
  target?: string;
}

interface FooterLinkColumnProps {
  title: string;
  links: LinkItem[];
}

export const FooterLinkColumn: React.FC<FooterLinkColumnProps> = ({
  title,
  links,
}) => {
  return (
    <div className="flex flex-col items-center md:items-start lg:items-start gap-3">
      <h4 className="text-[1.1rem] font-bold leading-8 tracking-[0.4px] text-[#667085] pb-2">
        {title}
      </h4>

      {links.map((link) => (
        <Link
          key={link?.label}
          href={link?.href || "javascript:void(0)"}
          target={link?.target === "blank" ? "_blank" : undefined}
          rel={
            link?.target === "blank" ? "noopener noreferrer" : undefined
          }
        >
          <span className="text-[15px] font-normal tracking-[0.2px] text-[#101828] transition-colors duration-200 ease-out hover:text-[#1C6DB6]">
            {link.label}
          </span>
        </Link>
      ))}
    </div>
  );
};
