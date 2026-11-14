"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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
import {
  IMAGE_TOOLS,
  PDF_TOOLS,
  type ToolDefinition,
  type ToolId,
} from "@/lib/tools/registry";
import { cn } from "@/lib/utils";

const MOBILE_IMAGE_TOOL_IDS: ToolId[] = [
  "imageCompress",
  "imageResize",
  "imageConvert",
  "imageCrop",
];

const MOBILE_PDF_TOOL_IDS: ToolId[] = [
  "pdfCompress",
  "pdfReduce",
  "pdfOrganize",
  "pdfMerge",
];

const MOBILE_IMAGE_TOOLS = IMAGE_TOOLS.filter((tool) =>
  MOBILE_IMAGE_TOOL_IDS.includes(tool.id)
);

const MOBILE_PDF_TOOLS = PDF_TOOLS.filter((tool) =>
  MOBILE_PDF_TOOL_IDS.includes(tool.id)
);

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

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
  const mobileToggleRef = useRef<HTMLButtonElement>(null);
  const mobilePanelRef = useRef<HTMLDivElement>(null);

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

  const closeMobileMenu = useCallback((restoreFocus = false) => {
    setMobileOpen(false);
    if (restoreFocus) {
      // Defer so the browser's default pointer focus does not override it.
      requestAnimationFrame(() => mobileToggleRef.current?.focus());
    }
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    mobilePanelRef.current?.focus({ preventScroll: true });

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMobileMenu(true);
        return;
      }
      if (event.key !== "Tab") return;

      const panel = mobilePanelRef.current;
      const toggle = mobileToggleRef.current;
      if (!panel) return;

      const focusables = [
        ...(toggle ? [toggle] : []),
        ...Array.from(
          panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
        ),
      ];
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (!first || !last) return;
      const active = document.activeElement;

      if (event.shiftKey) {
        if (active === first || active === panel) {
          event.preventDefault();
          last.focus();
        }
      } else if (active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const handlePointer = (event: PointerEvent) => {
      const target = event.target as Node;
      if (mobilePanelRef.current?.contains(target)) return;
      if (mobileToggleRef.current?.contains(target)) return;
      closeMobileMenu(true);
    };

    const desktopQuery = window.matchMedia("(min-width: 1024px)");
    const handleDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) closeMobileMenu();
    };

    document.addEventListener("keydown", handleKey);
    document.addEventListener("pointerdown", handlePointer);
    desktopQuery.addEventListener("change", handleDesktop);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKey);
      document.removeEventListener("pointerdown", handlePointer);
      desktopQuery.removeEventListener("change", handleDesktop);
    };
  }, [mobileOpen, closeMobileMenu]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  const navLinkClass = (href: string) =>
    cn(
      "rounded-full px-4 py-2 text-sm font-semibold transition",
      isActive(href)
        ? "bg-surface text-ink shadow-sm"
        : "text-muted hover:bg-surface/70 hover:text-ink"
    );

  const mobilePages = [
    { href: "/blog", label: t("blog") },
    { href: "/about", label: t("about") },
    { href: "/contact", label: t("contact") },
  ];

  return (
    <>
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
            <div className="hidden lg:block">
              <ThemeToggle />
            </div>
            <Link
              href="/image/compress"
              className={buttonClass("primary", "sm", "hidden md:inline-flex")}
            >
              {tNav("start")}
            </Link>
            <button
              ref={mobileToggleRef}
              type="button"
              onClick={() => {
                setToolsOpen(false);
                setMobileOpen((open) => !open);
              }}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface text-ink transition hover:bg-surface-2 lg:hidden"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={mobileOpen ? t("closeMenu") : t("openMenu")}
            >
              {mobileOpen ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Rendered outside <header>: backdrop-blur on the header would otherwise
          become the containing block for this fixed panel and collapse it. */}
      {mobileOpen ? (
        <div
          id="mobile-menu"
          role="dialog"
          aria-label={tNav("menuTitle")}
          className="fixed inset-x-0 bottom-0 top-[72px] z-[130] flex flex-col lg:hidden"
        >
          <div
            className="absolute inset-0 animate-fade-in bg-ink/40 backdrop-blur-sm motion-reduce:animate-none"
            aria-hidden="true"
          />
          <div
            ref={mobilePanelRef}
            tabIndex={-1}
            className="relative flex max-h-full flex-1 flex-col overflow-y-auto overflow-x-hidden overscroll-contain border-t border-line bg-canvas shadow-lift outline-none animate-fade-up motion-reduce:animate-none"
          >
            <div className="container-page flex min-h-full flex-col gap-6 py-5">
              <section aria-labelledby="mobile-image-tools">
                <p
                  id="mobile-image-tools"
                  className="mb-1 px-1 text-[11px] font-bold uppercase tracking-[0.16em] text-muted"
                >
                  {t("imageTools")}
                </p>
                <div className="grid gap-1 sm:grid-cols-2">
                  {MOBILE_IMAGE_TOOLS.map((tool) => (
                    <ToolMenuItem
                      key={tool.id}
                      tool={tool}
                      onNavigate={() => closeMobileMenu()}
                    />
                  ))}
                </div>
              </section>

              <section aria-labelledby="mobile-pdf-tools">
                <p
                  id="mobile-pdf-tools"
                  className="mb-1 px-1 text-[11px] font-bold uppercase tracking-[0.16em] text-muted"
                >
                  {t("pdfTools")}
                </p>
                <div className="grid gap-1 sm:grid-cols-2">
                  {MOBILE_PDF_TOOLS.map((tool) => (
                    <ToolMenuItem
                      key={tool.id}
                      tool={tool}
                      onNavigate={() => closeMobileMenu()}
                    />
                  ))}
                </div>
              </section>

              <section className="border-t border-line pt-4" aria-labelledby="mobile-pages">
                <p
                  id="mobile-pages"
                  className="mb-1 px-1 text-[11px] font-bold uppercase tracking-[0.16em] text-muted"
                >
                  {tNav("pagesTitle")}
                </p>
                <div className="grid gap-1">
                  {mobilePages.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => closeMobileMenu()}
                      className="flex min-h-[44px] items-center justify-between rounded-xl px-3 text-sm font-semibold text-ink hover:bg-surface-2 focus-visible:bg-surface-2"
                    >
                      {item.label}
                      <ArrowUpRight className="h-4 w-4 text-muted" aria-hidden="true" />
                    </Link>
                  ))}
                </div>
              </section>

              <div className="mt-auto space-y-4 border-t border-line pt-4">
                <div className="flex min-h-[44px] items-center justify-between gap-3">
                  <span className="text-sm font-semibold text-ink">
                    {tNav("languageLabel")}
                  </span>
                  <LocaleSwitcher
                    variant="full"
                    size="md"
                    onSelect={() => closeMobileMenu()}
                  />
                </div>
                <div className="flex min-h-[44px] items-center justify-between gap-3">
                  <span className="text-sm font-semibold text-ink">
                    {tNav("themeLabel")}
                  </span>
                  <ThemeToggle />
                </div>
                <Link
                  href="/image/compress"
                  onClick={() => closeMobileMenu()}
                  className={buttonClass("primary", "md", "w-full")}
                >
                  {tNav("start")}
                </Link>
                <p className="flex items-center gap-2 pb-1 text-xs text-muted">
                  <ShieldCheck className="h-4 w-4 text-success" aria-hidden="true" />
                  {t("privacyBadge")}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
