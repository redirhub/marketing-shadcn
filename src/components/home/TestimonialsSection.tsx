import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  initials: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote: "We migrated 12,000 redirects during an acquisition. RedirHub had everything live before the domain even propagated. Zero downtime.",
    name: "Sarah Chen",
    role: "Head of Engineering, FinStack",
    initials: "SC",
  },
  {
    quote: "Our SEO team can now update redirect rules without touching engineering. That alone saves us a sprint per quarter.",
    name: "Marcus Webb",
    role: "SEO Director, MediaVault",
    initials: "MW",
  },
  {
    quote: "The API is exactly what you'd expect from a modern infrastructure tool. Clean, documented, and it does what it says.",
    name: "Priya Nair",
    role: "Platform Engineer, Cloudburst",
    initials: "PN",
  },
  {
    quote: "99.99% uptime isn't marketing copy — we've been running on RedirHub for 18 months and haven't had a single incident.",
    name: "James Kowalski",
    role: "CTO, DomainFirst",
    initials: "JK",
  },
  {
    quote: "Wildcard redirects alone saved our migration timeline by two weeks. One rule covered the entire subdomain structure.",
    name: "Aisha Okonkwo",
    role: "DevOps Lead, TechCorp",
    initials: "AO",
  },
  {
    quote: "The dashboard is genuinely easy to use. Non-technical team members can manage redirects without any training.",
    name: "Tom Reyes",
    role: "Marketing Ops, BrandBuilder",
    initials: "TR",
  },
];

function Stars() {
  return (
    <div className="flex gap-0.5 mb-4">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className="w-4 h-4 text-brand-amber fill-brand-amber" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const t = useTranslations();

  return (
    <section className="w-full py-20 md:py-28 px-4 md:px-6 bg-white">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-navy mb-4">
          {t("home.testimonials-title")}
        </h2>
        <p className="text-brand-charcoal/60 text-lg mb-16 max-w-2xl mx-auto">
          {t("home.testimonials-subtitle")}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((testimonial) => (
            <Card key={testimonial.name} className="text-left border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <Stars />
                <blockquote className="text-brand-charcoal text-sm leading-relaxed mb-6">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-blue to-brand-teal flex items-center justify-center text-white text-sm font-bold shrink-0">
                    {testimonial.initials}
                  </div>
                  <div>
                    <div className="font-semibold text-brand-navy text-sm">{testimonial.name}</div>
                    <div className="text-brand-charcoal/50 text-xs">{testimonial.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
