import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQ {
  question: string;
  answer: string;
}

interface BlogFAQProps {
  faqs: FAQ[];
}

export default function BlogFAQ({ faqs }: BlogFAQProps) {
  return (
    <section className="mt-10">
      <hr className="border-gray-200 mb-6" />
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 my-8">
        Frequently asked questions
      </h2>
      <Accordion defaultValue={["faq-0"]} className="space-y-4">
        {faqs.map((faq, index) => (
          <AccordionItem
            key={index}
            value={`faq-${index}`}
            className="border border-gray-200 rounded-2xl overflow-hidden hover:shadow-sm hover:border-brand-blue transition-all"
          >
            <AccordionTrigger className="px-6 py-4 text-lg font-semibold text-left hover:no-underline">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6 pt-4 bg-gray-50 border-t border-gray-200 text-gray-700 text-base md:text-lg leading-relaxed">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
