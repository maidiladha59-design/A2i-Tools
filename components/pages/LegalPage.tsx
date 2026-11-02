import { ArrowLeft, Mail } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { Link } from "@/i18n/navigation";
import { breadcrumbJsonLd } from "@/lib/seo";
import { CONTACT_EMAIL } from "@/lib/config";
import type { LegalDoc } from "@/content/legal";
import { pickLocale } from "@/content/types";
import type { Locale } from "@/i18n/routing";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export async function LegalPage({
  locale,
  doc,
  path,
}: {
  locale: Locale;
  doc: LegalDoc;
  path: string;
}) {
  const t = await getTranslations({ locale, namespace: "legal" });
  const tCommon = await getTranslations({ locale, namespace: "common" });
  const title = pickLocale(doc.title, locale);
  const description = pickLocale(doc.description, locale);
  const sections = pickLocale(doc.sections, locale);
  const updated = new Intl.DateTimeFormat(locale === "en" ? "en-GB" : "id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(doc.updated));

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd(locale, [
          { name: tCommon("home"), path: "/" },
          { name: title, path },
        ])}
      />
      <section className="border-b border-line bg-surface/40">
        <div className="container-page py-8 sm:py-10">
          <Breadcrumbs
            items={[
              { label: tCommon("home"), href: "/" },
              { label: title },
            ]}
            label={tCommon("breadcrumb")}
          />
          <h1 className="mt-5 max-w-3xl text-3xl font-extrabold text-ink sm:text-4xl">
            {title}
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
            {description}
          </p>
          <p className="mt-3 text-xs font-medium text-muted">
            {t("updated", { date: updated })}
          </p>
        </div>
      </section>

      <section className="container-page py-10">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
          <article className="min-w-0">
            {sections.map((section, index) => {
              const id = slugify(section.heading);
              return (
                <section
                  key={`${section.heading}-${index}`}
                  id={id}
                  className="scroll-mt-24 border-b border-line py-6 first:pt-0 last:border-0"
                >
                  <h2 className="text-xl font-extrabold text-ink sm:text-2xl">
                    {section.heading}
                  </h2>
                  <div className="mt-3 space-y-3">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph.slice(0, 48)} className="text-sm leading-relaxed text-muted sm:text-base">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  {section.bullets?.length ? (
                    <ul className="mt-3 space-y-2">
                      {section.bullets.map((bullet) => (
                        <li key={bullet} className="flex gap-2 text-sm leading-relaxed text-muted">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              );
            })}

            <div className="mt-6 rounded-2xl border border-line bg-surface-2/60 p-4 text-sm text-muted">
              <p>
                {t("contactNote", { email: CONTACT_EMAIL })}{" "}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="font-semibold text-brand underline underline-offset-2"
                >
                  {CONTACT_EMAIL}
                </a>
              </p>
            </div>

            <Link
              href="/"
              className="mt-6 inline-flex min-h-[44px] items-center gap-2 text-sm font-bold text-brand hover:underline"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              {t("backToHome")}
            </Link>
          </article>

          <aside className="lg:sticky lg:top-[88px] lg:self-start">
            <nav
              aria-label={tCommon("menu")}
              className="rounded-2xl border border-line bg-surface p-4"
            >
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted">
                {tCommon("menu")}
              </p>
              <ul className="mt-2 space-y-1.5">
                {sections.map((section, index) => (
                  <li key={`${section.heading}-toc-${index}`}>
                    <a
                      href={`#${slugify(section.heading)}`}
                      className="block rounded py-1 text-sm text-muted transition hover:text-ink"
                    >
                      {section.heading}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="mt-3 flex items-center gap-2 rounded-2xl border border-line bg-surface p-4 text-sm font-semibold text-brand hover:underline"
            >
              <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
              {CONTACT_EMAIL}
            </a>
          </aside>
        </div>
      </section>
    </>
  );
}
