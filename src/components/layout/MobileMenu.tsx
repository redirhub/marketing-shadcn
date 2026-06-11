"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  APP_NAME,
  URL_DASHBOARD_LOGIN,
  URL_DASHBOARD_REGISTER,
} from "@/config/constant";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

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

interface MobileMenuProps {
  navItems: NavItem[];
  localePath: (path: string) => string;
}

export default function MobileMenu({ navItems, localePath }: MobileMenuProps) {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Hamburger trigger */}
      <button
        className="xl:hidden p-1.5 bg-brand-blue text-white rounded-md cursor-pointer"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
      >
        <Menu className="size-[22px]" />
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-[1001] bg-black/50 transition-opacity"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 z-[1002] h-full w-full max-w-[320px] transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div
          className="flex flex-col h-full"
          style={{
            background:
              "linear-gradient(180deg, #1E293B 0%, #0F172A 100%)",
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/20">
            <Link href={localePath("/")} onClick={() => setOpen(false)}>
              <Image
                src="/assets/images/logo-dark.png"
                alt={APP_NAME}
                width={100}
                height={32}
                style={{ height: "auto" }}
              />
            </Link>
            <button
              className="p-1.5 text-white rounded-md hover:bg-white/10 cursor-pointer"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
            >
              <X className="size-5" />
            </button>
          </div>

          {/* Body */}
          <div
            className="flex-1 overflow-y-auto"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            <Accordion>
              {navItems.map((item, index) => {
                const hasSubItems = item.items || item.megaMenu;

                if (hasSubItems) {
                  return (
                    <AccordionItem
                      key={index}
                      value={item.label}
                      className="border-b border-white/20 not-last:border-b"
                    >
                      <AccordionTrigger className="py-4 px-5 hover:bg-white/10 text-white font-medium text-base w-full justify-between [&>[data-slot=accordion-trigger-icon]]:text-white data-[slot=accordion-trigger]:no-underline">
                        {item.label}
                      </AccordionTrigger>
                      <AccordionContent className="bg-transparent">
                        <div className="flex flex-col gap-0">
                          {item.megaMenu ? (
                            <>
                              {item.megaMenu.columns.map(
                                (col, colIdx) => (
                                  <div key={colIdx}>
                                    {col.header && (
                                      <p className="px-5 pt-4 pb-2 text-xs font-bold text-white/70 uppercase">
                                        {col.header}
                                      </p>
                                    )}
                                    {col.items.map((subItem, subIdx) => (
                                      <Link
                                        key={subIdx}
                                        href={subItem.href || "#"}
                                        onClick={() => setOpen(false)}
                                      >
                                        <div className="flex items-center gap-3 py-3 px-5 hover:bg-white/10">
                                          {subItem.icon &&
                                            (typeof subItem.icon ===
                                            "string" ? (
                                              <Image
                                                src={subItem.icon}
                                                alt={subItem.label}
                                                width={20}
                                                height={20}
                                                style={{
                                                  filter:
                                                    "brightness(0) invert(1)",
                                                }}
                                              />
                                            ) : (
                                              <subItem.icon className="size-5 text-white" />
                                            ))}
                                          <span className="text-[15px] text-white font-medium">
                                            {subItem.label}
                                          </span>
                                        </div>
                                      </Link>
                                    ))}
                                  </div>
                                )
                              )}
                              {item.megaMenu.footer && (
                                <div className="border-t border-white/20 mt-2">
                                  {item.megaMenu.footer.map(
                                    (footerItem, fIdx) => (
                                      <Link
                                        key={fIdx}
                                        href={footerItem.href || "#"}
                                        onClick={() => setOpen(false)}
                                        target={
                                          footerItem?.target === "blank"
                                            ? "_blank"
                                            : undefined
                                        }
                                      >
                                        <div className="flex items-center gap-3 py-3 px-5 hover:bg-white/10">
                                          {footerItem.icon &&
                                            (typeof footerItem.icon ===
                                            "string" ? (
                                              <Image
                                                src={footerItem.icon}
                                                alt={footerItem.label}
                                                width={16}
                                                height={16}
                                                style={{
                                                  filter:
                                                    "brightness(0) invert(1)",
                                                }}
                                              />
                                            ) : (
                                              <footerItem.icon className="size-4 text-white" />
                                            ))}
                                          <span className="text-sm text-white font-medium">
                                            {footerItem.label}
                                          </span>
                                        </div>
                                      </Link>
                                    )
                                  )}
                                </div>
                              )}
                            </>
                          ) : (
                            item.items?.map((subItem, subIdx) => (
                              <Link
                                key={subIdx}
                                href={subItem.href || "#"}
                                onClick={() => setOpen(false)}
                              >
                                <div className="py-3 px-5 hover:bg-white/10">
                                  <span className="text-[15px] text-white font-medium">
                                    {subItem.label}
                                  </span>
                                </div>
                              </Link>
                            ))
                          )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  );
                }

                // Regular link item
                return (
                  <Link
                    key={index}
                    href={item.href || "#"}
                    onClick={() => setOpen(false)}
                    className="block"
                  >
                    <div className="py-4 px-5 border-b border-white/20 hover:bg-white/10">
                      <span className="font-medium text-base text-white">
                        {item.label}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </Accordion>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-white/20">
            <div className="flex flex-col gap-3 w-full">
              <Link
                href={URL_DASHBOARD_LOGIN}
                className="w-full"
                onClick={() => setOpen(false)}
              >
                <button className="w-full py-3 px-6 rounded-xl border border-white text-white font-bold text-[15px] hover:bg-white/20 transition-colors cursor-pointer">
                  {t("login", "Login")}
                </button>
              </Link>
              <Link
                href={URL_DASHBOARD_REGISTER}
                className="w-full"
                onClick={() => setOpen(false)}
              >
                <button className="w-full py-3 px-6 rounded-xl bg-brand-blue text-white font-bold text-[15px] hover:bg-brand-blue/90 transition-colors cursor-pointer">
                  {t("get-started", "Sign Up")}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
