import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface BlogPost {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  slug: string;
  gradient: string;
}

const POSTS: BlogPost[] = [
  {
    title: "How to Migrate 50,000 Redirects Without Breaking SEO",
    excerpt: "A step-by-step guide to planning and executing large-scale redirect migrations while preserving search rankings and avoiding common pitfalls.",
    category: "Migration",
    date: "May 20, 2026",
    readTime: "8 min read",
    slug: "migrate-redirects-seo",
    gradient: "from-brand-blue/20 to-brand-teal/20",
  },
  {
    title: "Wildcard Redirects: When One Rule Covers Everything",
    excerpt: "Understanding when wildcard domain patterns make sense, and how to structure rules that handle an entire subdomain hierarchy without duplicating work.",
    category: "Technical",
    date: "May 12, 2026",
    readTime: "6 min read",
    slug: "wildcard-redirects-guide",
    gradient: "from-brand-teal/20 to-brand-amber/20",
  },
  {
    title: "Why Redirect Latency Matters More Than You Think",
    excerpt: "Every millisecond of redirect delay compounds. We measured what 90ms vs 500ms redirect latency actually does to bounce rates and conversion.",
    category: "Performance",
    date: "May 5, 2026",
    readTime: "5 min read",
    slug: "redirect-latency-impact",
    gradient: "from-brand-amber/20 to-brand-blue/20",
  },
];

export default function BlogSection() {
  const t = useTranslations();

  return (
    <section className="w-full py-20 md:py-28 px-4 md:px-6 bg-[#F5F6F8]">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-navy mb-4">
          {t("home.blog-title")}
        </h2>
        <p className="text-brand-charcoal/60 text-lg mb-16 max-w-2xl mx-auto">
          {t("home.blog-subtitle")}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {POSTS.map((post) => (
            <a key={post.slug} href={`/blog/${post.slug}`} className="group block">
              <Card className="h-full text-left border-0 shadow-sm hover:shadow-md transition-all group-hover:-translate-y-1">
                <div className={`w-full h-44 bg-gradient-to-br ${post.gradient} rounded-t-xl flex items-end p-4`}>
                  <Badge className="bg-brand-blue/90 text-white border-0 text-xs">
                    {post.category}
                  </Badge>
                </div>
                <CardHeader className="pt-4 pb-2">
                  <h3 className="font-bold text-brand-navy text-base leading-snug group-hover:text-brand-blue transition-colors">
                    {post.title}
                  </h3>
                </CardHeader>
                <CardContent>
                  <p className="text-brand-charcoal/60 text-sm leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-brand-charcoal/40">
                    <span>{post.date}</span>
                    <span>{post.readTime}</span>
                  </div>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>

        <a
          href="/blog"
          className="inline-flex items-center justify-center h-11 px-8 rounded-lg border border-brand-blue/30 text-brand-blue font-semibold text-sm hover:bg-brand-blue hover:text-white transition-colors"
        >
          {t("home.blog-view-all")}
        </a>
      </div>
    </section>
  );
}
