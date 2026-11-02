"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import {
  ArrowUpRight,
  ChevronDown,
  Menu,
  ShieldCheck,
  X,
} from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { Logo } from "@/components/ui/Logo";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { LocaleSwitcher } from "@/components/layout/LocaleSwitcher";
import { buttonClass } from "@/components/ui/Button";
import { IMAGE_TOOLS, PDF_TOOLS, type ToolDefinition } from "@/lib/tools/registry";
import { cn } from "@/lib/utils";

function ToolMenuItem({
  tool,
  onNavigate,
}: {
  tool: ToolDefinition;
  onNavigate: () => void;
}) {
  const t = useTranslations("tools");
  const Icon = tool.icon;
  return (
    <Link
      href={tool.href}
      onClick={onNavigate}
      className="group flex items-start gap-3 rounded-2xl p-3 transition hover:bg-surface-2"
    >
      <span
        className={cn(
          "mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
          tool.group === "image"
            ? "bg-brand-soft text-brand"
            : "bg-accent/20 text-accent-strong"
        )}
      >
        <Icon className="h-4 w-4" aria-hidden="true" />
      </span>
      <span className="min-w-0">
        <span className="flex items-center gap-1.5 text-sm font-bold text-ink">
          {t(`${tool.id}.name`)}
          <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition group-hover:opacity-60" />
        </span>
        <span className="mt-0.5 line-clamp-2 block text-xs leading-snug text-muted">
          {t(`${tool.id}.short`)}
        </span>
      </span>
    </Link>
  );
}

export function Header() {
  const t = useTranslations("common");
  const tNav = useTranslations("nav");
  const pathname = usePathname();
  const [toolsOpen, setToolsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const toolsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect -- close menus when the route changes */
    setToolsOpen(false);
    setMobileOpen(false);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [pathname]);

  useEffect(() => {
    if (!toolsOpen) return;

    const handlePointer = (event: PointerEvent) => {
      if (!toolsRef.current?.contains(event.target as Node)) {
        setToolsOpen(false);
      }
    };
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setToolsOpen(false);
    };
    document.addEventListener("pointerdown", handlePointer);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("pointerdown", handlePointer);
      document.removeEventListener("keydown", handleKey);
    };
  }, [toolsOpen]);

  useEffect(() => {
    if (!mobileOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [mobileOpen]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  const navLinkClass = (href: string) =>
    cn(
      "rounded-full px-4 py-2 text-sm font-semibold transition",
      isActive(href)
        ? "bg-surface text-ink shadow-sm"
        : "text-muted hover:bg-surface/70 hover:text-ink"
    );

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-canvas/85 backdrop-blur-xl">
      <div className="container-page flex h-[72px] items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Logo markClassName="h-9 w-9" />
        </div>

        <nav className="hidden items-center gap-1 lg:flex" aria-label={tNav("main")}>
          <div className="relative" ref={toolsRef}>
            <button
              type="button"
              onClick={() => setToolsOpen((open) => !open)}
              aria-expanded={toolsOpen}
              aria-controls="tools-menu"
              className={cn(
                "inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-semibold transition",
                toolsOpen || pathname.startsWith("/image") || pathname.startsWith("/pdf")
                  ? "bg-surface text-ink shadow-sm"
                  : "text-muted hover:bg-surface/70 hover:text-ink"
              )}
            >
              {tNav("tools")}
              <ChevronDown
                className={cn("h-4 w-4 transition", toolsOpen && "rotate-180")}
                aria-hidden="true"
              />
            </button>
            {toolsOpen ? (
              <div
                id="tools-menu"
                className="absolute left-0 top-full mt-3 w-[640px] max-w-[calc(100vw-2rem)] rounded-3xl border border-line bg-surface p-4 shadow-lift animate-fade-up"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="px-3 pb-1 text-[11px] font-bold uppercase tracking-[0.16em] text-muted">
                      {t("imageTools")}
                    </p>
                    {IMAGE_TOOLS.map((tool) => (
                      <ToolMenuItem
                        key={tool.id}
                        tool={tool}
                        onNavigate={() => setToolsOpen(false)}
                      />
                    ))}
                  </div>
                  <div>
                    <p className="px-3 pb-1 text-[11px] font-bold uppercase tracking-[0.16em] text-muted">
                      {t("pdfTools")}
                    </p>
                    {PDF_TOOLS.map((tool) => (
                      <ToolMenuItem
                        key={tool.id}
                        tool={tool}
                        onNavigate={() => setToolsOpen(false)}
                      />
                    ))}
                  </div>
                </div>
                <div className="mt-2 flex items-center gap-2 rounded-2xl bg-surface-2/70 px-3 py-2 text-xs text-muted">
                  <ShieldCheck className="h-4 w-4 text-success" aria-hidden="true" />
                  {t("privacyBadge")}
                </div>
              </div>
            ) : null}
          </div>
          <Link href="/blog" className={navLinkClass("/blog")}>
            {t("blog")}
          </Link>
          <Link href="/about" className={navLinkClass("/about")}>
            {t("about")}
          </Link>
          <Link href="/contact" className={navLinkClass("/contact")}>
            {t("contact")}
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <LocaleSwitcher className="hidden xl:inline-flex" />
          <ThemeToggle />
          <Link
            href="/image/compress"
            className={buttonClass("primary", "sm", "hidden md:inline-flex")}
          >
            {tNav("start")}
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface text-ink transition hover:bg-surface-2 lg:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? t("closeMenu") : t("openMenu")}
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <div
          id="mobile-menu"
          className="fixed inset-x-0 bottom-0 top-[72px] z-30 overflow-y-auto border-t border-line bg-canvas lg:hidden"
        >
          <div className="container-page space-y-6 py-6">
            <div>
              <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.16em] text-muted">
                {t("imageTools")}
              </p>
              <div className="grid gap-2 sm:grid-cols-2">
                {IMAGE_TOOLS.map((tool) => (
                  <ToolMenuItem
                    key={tool.id}
                    tool={tool}
                    onNavigate={() => setMobileOpen(false)}
                  />
                ))}
              </div>
            </div>
            <div>
              <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.16em] text-muted">
                {t("pdfTools")}
              </p>
              <div className="grid gap-2 sm:grid-cols-2">
                {PDF_TOOLS.map((tool) => (
                  <ToolMenuItem
                    key={tool.id}
                    tool={tool}
                    onNavigate={() => setMobileOpen(false)}
                  />
                ))}
              </div>
            </div>
            <div className="grid gap-1 border-t border-line pt-4">
              {[
                { href: "/blog", label: t("blog") },
                { href: "/about", label: t("about") },
                { href: "/contact", label: t("contact") },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex min-h-[44px] items-center justify-between rounded-xl px-3 text-sm font-semibold text-ink hover:bg-surface"
                >
                  {item.label}
                  <ArrowUpRight className="h-4 w-4 text-muted" aria-hidden="true" />
                </Link>
              ))}
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
              <LocaleSwitcher variant="full" />
              <Link
                href="/image/compress"
                onClick={() => setMobileOpen(false)}
                className={buttonClass("primary", "sm")}
              >
                {tNav("start")}
              </Link>
            </div>
            <p className="flex items-center gap-2 pb-6 text-xs text-muted">
              <ShieldCheck className="h-4 w-4 text-success" aria-hidden="true" />
              {t("privacyBadge")}
            </p>
          </div>
        </div>
      ) : null}
    </header>
  );
}
