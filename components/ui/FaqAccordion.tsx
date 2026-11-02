import { ChevronDown } from "lucide-react";
import type { FaqEntry } from "@/content/faqs";
import { cn } from "@/lib/utils";

export function FaqAccordion({
  items,
  className,
}: {
  items: FaqEntry[];
  className?: string;
}) {
  return (
    <div className={cn("divide-y divide-line rounded-3xl border border-line bg-surface", className)}>
      {items.map((item) => (
        <details key={item.q} className="group">
          <summary className="flex min-h-[60px] cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left transition hover:bg-surface-2/60 sm:px-6 [&::-webkit-details-marker]:hidden">
            <span className="text-sm font-bold text-ink sm:text-base">{item.q}</span>
            <ChevronDown
              className="h-5 w-5 shrink-0 text-muted transition group-open:rotate-180"
              aria-hidden="true"
            />
          </summary>
          <div className="px-5 pb-5 text-sm leading-relaxed text-muted sm:px-6">
            {item.a}
          </div>
        </details>
      ))}
    </div>
  );
}
