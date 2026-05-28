import { useTranslations } from "next-intl";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export default function ChooseUs() {
  const t = useTranslations();

  const boxes = [
    {
      title: t("home.choose-us-https-title"),
      subtitle: t("home.choose-us-https-subtitle"),
      accent: "bg-brand-teal/10",
      iconColor: "text-brand-teal",
      icon: "🔒",
    },
    {
      title: t("home.choose-us-easy-title"),
      subtitle: t("home.choose-us-easy-subtitle"),
      accent: "bg-brand-blue/10",
      iconColor: "text-brand-blue",
      icon: "⚡",
    },
    {
      title: t("home.choose-us-analytics-title"),
      subtitle: t("home.choose-us-analytics-subtitle"),
      accent: "bg-brand-amber/10",
      iconColor: "text-brand-amber",
      icon: "📊",
    },
  ];

  return (
    <section className="w-full py-20 md:py-24 px-4 md:px-6 bg-[#F5F6F8]">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-navy mb-4">
          {t("home.choose-us-title")}
        </h2>
        <p className="text-brand-charcoal/60 text-lg mb-16 max-w-2xl mx-auto">
          {t("home.choose-us-subtitle")}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {boxes.map((box) => (
            <Card key={box.title} className="text-left border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${box.accent} ${box.iconColor} text-2xl mb-2`}>
                  {box.icon}
                </div>
                <CardTitle className="text-brand-navy text-lg font-bold">
                  {box.title}
                </CardTitle>
                <CardDescription className="text-brand-charcoal/70 text-sm leading-relaxed">
                  {box.subtitle}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="w-full h-40 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                  <span className="text-4xl opacity-30">{box.icon}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="border-0 shadow-sm text-left">
          <CardHeader>
            <CardTitle className="text-brand-navy text-xl font-bold">
              {t("home.choose-us-analytics-title")}
            </CardTitle>
            <CardDescription className="text-brand-charcoal/70">
              {t("home.choose-us-analytics-subtitle")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full h-48 rounded-xl bg-gradient-to-r from-brand-blue/10 via-brand-teal/10 to-brand-blue/5 flex items-center justify-center gap-8">
              {["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((month, i) => (
                <div key={month} className="flex flex-col items-center gap-2">
                  <div
                    className="w-8 bg-brand-teal rounded-t-sm"
                    style={{ height: `${40 + i * 15}px` }}
                  />
                  <span className="text-xs text-brand-charcoal/50">{month}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
