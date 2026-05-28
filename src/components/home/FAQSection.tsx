"use client";

import { useTranslations } from "next-intl";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export default function FAQSection() {
  const t = useTranslations();

  const faqs = [
    { q: t("home.faq-q1"), a: t("home.faq-a1") },
    { q: t("home.faq-q2"), a: t("home.faq-a2") },
    { q: t("home.faq-q3"), a: t("home.faq-a3") },
    { q: t("home.faq-q4"), a: t("home.faq-a4") },
    { q: t("home.faq-q5"), a: t("home.faq-a5") },
    { q: t("home.faq-q6"), a: t("home.faq-a6") },
    { q: t("home.faq-q7"), a: t("home.faq-a7") },
  ];

  return (
    <section className="w-full py-20 md:py-28 px-4 md:px-6 bg-white">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-navy mb-4">
            {t("home.faq-title")}
          </h2>
          <p className="text-brand-charcoal/60 text-lg">
            {t("home.faq-subtitle")}
          </p>
        </div>

        <Accordion multiple className="border rounded-2xl overflow-hidden divide-y divide-border">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="border-0">
              <AccordionTrigger className="px-6 py-4 text-base font-semibold text-brand-navy hover:no-underline hover:text-brand-blue transition-colors">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-brand-charcoal/70 leading-relaxed text-sm">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="text-center mt-10">
          <p className="text-brand-charcoal/50 text-sm">
            {t("home.faq-more")}{" "}
            <a href="/docs" className="text-brand-blue hover:underline font-medium">
              {t("home.faq-docs-link")}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
