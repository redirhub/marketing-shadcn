import { permanentRedirect } from "next/navigation";
import { localeUrl } from "@/lib/utils/seo";

interface PageProps {
  params: Promise<{ locale: string; tag: string }>;
}

export default async function SupportCategoryRedirect({ params }: PageProps) {
  const { locale, tag } = await params;
  permanentRedirect(localeUrl(locale, `/support/category/${tag}`));
}
