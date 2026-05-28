import { useTranslations } from "next-intl";

export default function HomePage() {
  const t = useTranslations();

  return (
    <main className="min-h-screen">
      {/* Placeholder — content to be built by AI agents */}
      <h1 className="text-4xl font-bold text-center pt-40">
        {t("nav.home-title", { n: "RedirHub" })}
      </h1>
    </main>
  );
}
