import { ArrowUpRight } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { ToolDefinition } from "@/lib/tools/registry";
import { cn } from "@/lib/utils";

export async function ToolCard({
  tool,
  compact = false,
  className,
}: {
  tool: ToolDefinition;
  compact?: boolean;
  className?: string;
}) {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "tools" });
  const tCommon = await getTranslations({ locale, namespace: "common" });
  const Icon = tool.icon;

  return (
    <Link
      href={tool.href}
      className={cn(
        "group card-surface card-hover relative flex h-full flex-col overflow-hidden p-5",
        compact ? "gap-2" : "gap-3 p-6",
        className
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <span
          className={cn(
            "flex items-center justify-center rounded-2xl",
            compact ? "h-10 w-10" : "h-12 w-12",
            tool.group === "image"
              ? "bg-brand-soft text-brand"
              : "bg-accent/20 text-accent-strong"
          )}
        >
          <Icon className={compact ? "h-5 w-5" : "h-6 w-6"} aria-hidden="true" />
        </span>
        {tool.popular ? (
          <span className="pill border border-accent-strong/20 bg-accent/15 text-accent-strong">
            {tCommon("free")}
          </span>
        ) : null}
      </div>
      <div className="flex-1">
        <h3 className={cn("font-display font-extrabold text-ink", compact ? "text-base" : "text-lg")}>
          {t(`${tool.id}.name`)}
        </h3>
        <p className={cn("mt-1 text-sm leading-relaxed text-muted", compact && "line-clamp-2")}>
          {t(`${tool.id}.short`)}
        </p>
      </div>
      <span className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold text-brand">
        {tCommon("openTool")}
        <ArrowUpRight
          className="h-3.5 w-3.5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </span>
    </Link>
  );
}
