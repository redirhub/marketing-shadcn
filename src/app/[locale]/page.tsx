import { useTranslations } from "next-intl";
import Hero from "@/components/home/Hero";
import WhyStandsOut from "@/components/home/WhyStandsOut";
import ChooseUs from "@/components/home/ChooseUs";
import PowerfulFeatures from "@/components/home/PowerfulFeatures";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import APIDocumentation from "@/components/home/APIDocumentation";
import BlogSection from "@/components/home/BlogSection";
import FAQSection from "@/components/home/FAQSection";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <WhyStandsOut />
      <ChooseUs />
      <PowerfulFeatures />
      <TestimonialsSection />
      <APIDocumentation />
      <BlogSection />
      <FAQSection />
    </main>
  );
}
