import { useTranslations } from "next-intl";

export default function WhyStandsOut() {
  const t = useTranslations();

  const stats = [
    { value: "90ms", label: t("home.why-rapid-redirect"), desc: t("home.why-rapid-desc") },
    { value: "100M+", label: t("home.why-rapid-requests"), desc: t("home.why-rapid-requests-desc") },
    { value: "99.99%", label: t("home.why-uptime"), desc: t("home.why-uptime-desc") },
  ];

  const features = [
    { value: "500K+", label: t("home.why-hostnames"), desc: t("home.why-hostnames-desc") },
    { value: "900K+", label: "SSL", desc: t("home.why-ssl-desc") },
    { value: "10+", label: t("home.why-locations"), desc: t("home.why-locations-desc") },
    { value: "99.99%", label: t("home.why-uptime"), desc: t("home.why-uptime-desc") },
    { value: "100M+", label: t("home.why-rapid-requests"), desc: t("home.why-rapid-requests-desc") },
  ];

  return (
    <section className="w-full py-20 md:py-28 bg-brand-navy">
      <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
          {t("home.why-stands-out-title")}
        </h2>
        <p className="text-white/60 text-lg mb-16 max-w-2xl mx-auto">
          {t("home.why-stands-out-subtitle")}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat) => (
            <div key={stat.value} className="glass p-8 text-center">
              <div className="text-5xl md:text-6xl font-bold text-brand-teal mb-2">
                {stat.value}
              </div>
              <div className="text-white font-semibold text-lg mb-3">{stat.label}</div>
              <p className="text-white/60 text-sm leading-relaxed">{stat.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <div key={i} className="glass p-5 flex items-start gap-4 text-left">
              <div className="text-2xl font-bold text-brand-amber shrink-0 w-16">{f.value}</div>
              <div>
                <div className="text-white font-semibold text-sm mb-1">{f.label}</div>
                <p className="text-white/60 text-xs leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
