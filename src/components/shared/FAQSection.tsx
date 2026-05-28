import type { FAQItem } from "@/types/sanity";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQSectionProps {
  faqs?: FAQItem[] | null;
  title?: string;
}

export default function FAQSection({ faqs, title = "Frequently asked questions" }: FAQSectionProps) {
  if (!faqs || faqs.length === 0) return null;

  return (
    <section className="w-full py-16 px-4 md:px-6 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-semibold text-center text-brand-charcoal mb-12">
          {title}
        </h2>
        <Accordion className="space-y-3">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={faq._key || index}
              value={`faq-${index}`}
              className="bg-white rounded-xl border border-gray-200 px-6"
            >
              <AccordionTrigger className="text-left font-medium text-brand-charcoal hover:no-underline py-5">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 leading-relaxed pb-5">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
