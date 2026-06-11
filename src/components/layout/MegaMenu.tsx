"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

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

interface MegaMenuData {
  columns: MegaMenuColumn[];
  footer?: MegaMenuFooterItem[];
}

interface MegaMenuProps {
  label: string;
  items?: Array<{ href: string; label: string }>;
  megaMenu?: MegaMenuData;
  isDark: boolean;
}

export default function MegaMenu({
  label,
  items,
  megaMenu,
  isDark,
}: MegaMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Trigger button styles
  const triggerBase =
    "inline-flex items-center gap-2.5 cursor-pointer text-[18px] leading-6 tracking-[0.2px] font-medium font-sans py-[10px] px-[14px] rounded-xl border border-transparent transition-all duration-200 outline-none";
  const triggerIdle = isDark
    ? "text-white/90"
    : "text-brand-charcoal";
  const triggerHoverActive = isDark
    ? "hover:bg-white/10 hover:border-white/20 active:bg-white/10 active:border-white/20"
    : "hover:bg-gray-100 hover:border-gray-200 active:bg-gray-100 active:border-gray-200";
  const triggerOpen = isDark
    ? "bg-white/10 border-white/20"
    : "bg-gray-100 border-gray-200";

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Trigger button */}
      <button
        className={`${triggerBase} ${triggerIdle} ${triggerHoverActive} ${
          isOpen ? triggerOpen : ""
        }`}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        {label}
        <span
          className={`inline-flex transition-transform duration-200 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        >
          <ChevronDown className="size-3.5" />
        </span>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          className="absolute top-full left-0 mt-2 z-50 max-w-[632px]"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="bg-white shadow-xl rounded-3xl border border-gray-200 overflow-hidden">
            {megaMenu ? (
              <div>
                {/* Columns grid */}
                <div className="grid grid-cols-2 gap-8 p-6">
                  {megaMenu.columns.map((col, colIdx) => (
                    <div key={colIdx}>
                      {col.header && (
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-5">
                          {col.header}
                        </p>
                      )}
                      <div className="flex flex-col gap-4">
                        {col.items.map((item, i) => (
                          <Link
                            key={i}
                            href={item.href}
                            target={
                              item.target === "blank" ? "_blank" : undefined
                            }
                            onClick={() => setIsOpen(false)}
                            className="no-underline outline-none"
                          >
                            <div className="flex items-start gap-3 p-3 rounded-lg transition-all duration-200 hover:bg-gray-50 group cursor-pointer">
                              {/* Icon */}
                              <div className="p-2 min-w-[40px] min-h-[40px] flex items-center justify-center rounded-md bg-gray-100 text-gray-700 group-hover:bg-gray-200 group-hover:text-gray-900 transition-all duration-200">
                                {typeof item.icon === "string" ? (
                                  <Image
                                    src={item.icon}
                                    alt={item.label}
                                    width={24}
                                    height={24}
                                  />
                                ) : (
                                  <item.icon className="size-5" />
                                )}
                              </div>
                              {/* Text */}
                              <div>
                                <p className="text-md font-semibold text-gray-900">
                                  {item.label}
                                </p>
                                {item.description && (
                                  <p className="text-sm text-gray-600 leading-snug mt-0.5">
                                    {item.description}
                                  </p>
                                )}
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                {megaMenu.footer && (
                  <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                    <div className="flex gap-4">
                      {megaMenu.footer.map((item, idx) => (
                        <Link
                          key={idx}
                          href={item.href}
                          target={
                            item.target === "blank" ? "_blank" : undefined
                          }
                          onClick={() => setIsOpen(false)}
                        >
                          <div className="flex items-center gap-2 px-3 py-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200">
                            {typeof item.icon === "string" ? (
                              <Image
                                src={item.icon}
                                alt={item.label}
                                width={20}
                                height={20}
                              />
                            ) : (
                              <item.icon className="size-5 text-gray-500" />
                            )}
                            <span className="text-md font-semibold">
                              {item.label}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : items ? (
              <div className="p-1">
                {items.map((subItem) => (
                  <Link
                    key={subItem.href}
                    href={subItem.href}
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="text-sm font-medium text-gray-900 hover:text-gray-900 hover:bg-gray-50 py-2 px-3 rounded-md cursor-pointer transition-all duration-200">
                      {subItem.label}
                    </div>
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}
