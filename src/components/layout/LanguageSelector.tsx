"use client";

import React, { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import { ChevronDownIcon, CheckIcon } from "lucide-react";
import { useRouter, usePathname } from "@/i18n/routing";

const flagUrls: Record<string, string> = {
  de: "https://flagcdn.com/w40/de.png",
  zh: "https://flagcdn.com/w40/cn.png",
  en: "https://flagcdn.com/w40/gb.png",
};

const languages = [
  { code: "en", label: "English", flagUrl: flagUrls.en },
  { code: "de", label: "Deutsch", flagUrl: flagUrls.de },
  { code: "zh", label: "简体中文", flagUrl: flagUrls.zh },
];

interface LanguageSelectorProps {
  openDirection?: "top" | "bottom";
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  openDirection = "bottom",
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const currentLanguage = (params?.locale as string) || "en";

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const selectedLanguage = languages.find(
    (lang) => lang.code === currentLanguage
  );

  // Fallback to English if language not found
  const displayLanguage =
    selectedLanguage || languages.find((lang) => lang.code === "en");

  const handleLanguageChange = (newLocale: string) => {
    // pathname from @/i18n/routing is already without locale prefix
    // e.g., "/about" instead of "/en/about"
    router.push(pathname, { locale: newLocale });
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between bg-white border border-[#e0e0e0] px-2 py-2 min-w-[170px] w-[170px] hover:bg-gray-50 transition-colors"
      >
        <div className="flex gap-2 items-center">
          <img
            src={displayLanguage?.flagUrl}
            alt={displayLanguage?.label}
            className="w-[30px] h-[20px] object-cover"
          />
          <span className="text-[13px] font-normal text-[#333]">
            {displayLanguage?.label}
          </span>
        </div>
        <div>
          <ChevronDownIcon
            className={`size-4 text-gray-500 transition-transform duration-200 ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </div>
      </button>

      {isOpen && (
        <div
          className={`absolute left-0 w-[200px] bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden z-[1000] ${
            openDirection === "top" ? "bottom-[calc(100%+8px)]" : "top-[calc(100%+8px)]"
          }`}
        >
          <div className="max-h-[300px] overflow-y-auto">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageChange(language.code)}
                className={`w-full flex items-center justify-start gap-3 px-4 py-3 transition-colors duration-200 ${
                  currentLanguage === language.code
                    ? "bg-blue-50"
                    : "bg-white hover:bg-gray-50"
                }`}
              >
                <img
                  src={language.flagUrl}
                  alt={language.label}
                  className="w-[30px] h-[20px] object-cover"
                />
                <span
                  className={`text-sm ${
                    currentLanguage === language.code
                      ? "text-blue-600 font-medium"
                      : "text-gray-700 font-normal"
                  }`}
                >
                  {language.label}
                </span>
                {currentLanguage === language.code && (
                  <CheckIcon className="ml-auto text-blue-600 size-3" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
