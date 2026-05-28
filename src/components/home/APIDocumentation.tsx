import { useTranslations } from "next-intl";

const CODE_EXAMPLE = `# Create a redirect
curl -X POST https://api.redirhub.com/v1/redirects \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "source": "old-domain.com",
    "destination": "https://new-domain.com",
    "type": 301,
    "active": true
  }'

# Response
{
  "id": "rdr_01HXYZ9ABC",
  "source": "old-domain.com",
  "destination": "https://new-domain.com",
  "type": 301,
  "active": true,
  "created_at": "2026-05-28T09:00:00Z"
}`;

function CheckIcon() {
  return (
    <svg className="w-5 h-5 text-brand-amber shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

export default function APIDocumentation() {
  const t = useTranslations();

  const features = [
    { heading: t("home.api-auth"), desc: t("home.api-auth-desc") },
    { heading: t("home.api-crud"), desc: t("home.api-crud-desc") },
    { heading: t("home.api-errors"), desc: t("home.api-errors-desc") },
    { heading: t("home.api-pagination"), desc: t("home.api-pagination-desc") },
    { heading: t("home.api-examples"), desc: t("home.api-examples-desc") },
  ];

  return (
    <section className="w-full py-20 md:py-28 px-4 md:px-6 bg-[#F5F6F8]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-navy mb-4">
            {t("home.api-titleline")}
          </h2>
          <p className="text-brand-charcoal/60 text-lg max-w-2xl mx-auto">
            {t("home.api-subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-left">
            <p className="text-brand-charcoal/80 mb-8 leading-relaxed">
              {t("home.api-subline")}
            </p>

            <ul className="space-y-5">
              {features.map((f, i) => (
                <li key={i} className="flex gap-3">
                  <CheckIcon />
                  <span className="text-brand-charcoal text-sm leading-relaxed">
                    <span className="font-bold text-brand-navy">{f.heading}</span>{" "}
                    {f.desc}
                  </span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-3 mt-10">
              <a
                href="https://app.redirhub.com/register"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center h-11 px-6 rounded-lg bg-brand-blue text-white font-semibold text-sm hover:bg-brand-blue/90 transition-colors"
              >
                {t("home.features-get-started")}
              </a>
              <a
                href="https://docs.redirhub.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center h-11 px-6 rounded-lg border border-brand-blue/30 text-brand-blue font-semibold text-sm hover:bg-brand-blue/5 transition-colors"
              >
                {t("home.api-docs-link")}
              </a>
            </div>
          </div>

          <div className="bg-brand-navy rounded-2xl overflow-hidden shadow-2xl">
            <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/10">
              <div className="w-3 h-3 rounded-full bg-red-400/70" />
              <div className="w-3 h-3 rounded-full bg-yellow-400/70" />
              <div className="w-3 h-3 rounded-full bg-green-400/70" />
              <span className="text-white/40 text-xs ml-2 font-mono">api-example.sh</span>
            </div>
            <pre className="p-6 text-sm font-mono leading-relaxed overflow-x-auto">
              {CODE_EXAMPLE.split("\n").map((line, i) => {
                if (line.startsWith("#")) {
                  return <div key={i} className="text-white/40">{line}</div>;
                }
                if (line.includes("Authorization") || line.includes("Content-Type")) {
                  return <div key={i} className="text-brand-teal">{line}</div>;
                }
                if (line.startsWith("  \"id\"") || line.startsWith("  \"source\"") || line.startsWith("  \"destination\"") || line.startsWith("  \"type\"") || line.startsWith("  \"active\"") || line.startsWith("  \"created_at\"")) {
                  return <div key={i} className="text-brand-amber">{line}</div>;
                }
                return <div key={i} className="text-white/80">{line}</div>;
              })}
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
