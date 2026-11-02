import { Compass, Home } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { buttonClass } from "@/components/ui/Button";
import { ToolCard } from "@/components/tools/ToolCard";
import { Link } from "@/i18n/navigation";
import { IMAGE_TOOLS, PDF_TOOLS } from "@/lib/tools/registry";

export default async function NotFound() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "notFound" });
  const tCommon = await getTranslations({ locale, namespace: "common" });
  const suggested = [
    ...IMAGE_TOOLS.filter((tool) => tool.popular),
    ...PDF_TOOLS.filter((tool) => tool.popular),
  ].slice(0, 3);

  return (
    <section className="container-page py-16 sm:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <p className="font-display text-6xl font-extrabold leading-none text-brand sm:text-8xl">
          {t("code")}
        </p>
        <h1 className="mt-4 text-3xl font-extrabold text-ink sm:text-4xl">
          {t("title")}
        </h1>
        <p className="mt-3 text-base leading-relaxed text-muted">{t("body")}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/" className={buttonClass("primary", "md")}>
            <Home className="h-4 w-4" aria-hidden="true" />
            {t("home")}
          </Link>
          <Link href="/blog" className={buttonClass("secondary", "md")}>
            <Compass className="h-4 w-4" aria-hidden="true" />
            {tCommon("blog")}
          </Link>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-4xl">
        <h2 className="text-center text-sm font-bold uppercase tracking-[0.14em] text-muted">
          {t("suggested")}
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {suggested.map((tool) => (
            <ToolCard key={tool.id} tool={tool} compact />
          ))}
        </div>
      </div>
    </section>
  );
}
