"use client";

import { useCallback, useEffect, useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useToast } from "@/components/ui/Toast";
import { formatBytes } from "@/lib/size";

export type RejectedUpload = { name: string; reason: string };

const FLASH_CLASS = "animate-upload-flash";
const FLASH_MS = 1700;
const MAX_REJECTED_LINES = 4;
const MOBILE_QUERY = "(max-width: 767px)";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

/**
 * Shared upload feedback: one toast per batch (including rejected files),
 * a short highlight on the new queue rows, and a small-screen-only reveal.
 */
export function useUploadFeedback() {
  const t = useTranslations("upload");
  const locale = useLocale();
  const { toast } = useToast();
  const flashTimer = useRef<number | null>(null);
  const flashClearTimer = useRef<number | null>(null);
  const revealTimer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (flashTimer.current) window.clearTimeout(flashTimer.current);
      if (flashClearTimer.current) window.clearTimeout(flashClearTimer.current);
      if (revealTimer.current) window.clearTimeout(revealTimer.current);
    };
  }, []);

  const describeRejected = useCallback(
    (items: RejectedUpload[]) => {
      const lines = items
        .slice(0, MAX_REJECTED_LINES)
        .map((item) => t("rejectedItem", { name: item.name, reason: item.reason }));
      const extra = items.length - MAX_REJECTED_LINES;
      if (extra > 0) lines.push(t("more", { count: extra }));
      return lines.join("\n");
    },
    [t]
  );

  const reportAdded = useCallback(
    (count: number) => {
      if (count <= 0) return;
      toast({ title: t("added", { count }), variant: "success" });
    },
    [t, toast]
  );

  const reportRejected = useCallback(
    (items: RejectedUpload[]) => {
      if (!items.length) return;
      toast({
        title: t("rejectedTitle", { count: items.length }),
        description: describeRejected(items),
        variant: "error",
      });
    },
    [describeRejected, t, toast]
  );

  const reportAddedWithRejected = useCallback(
    (added: number, items: RejectedUpload[]) => {
      if (!items.length) {
        reportAdded(added);
        return;
      }
      if (added <= 0) {
        reportRejected(items);
        return;
      }
      toast({
        title: t("addedWithSkipped", { count: added, skipped: items.length }),
        description: describeRejected(items),
        variant: "error",
      });
    },
    [describeRejected, reportAdded, reportRejected, t, toast]
  );

  const flashNewItems = useCallback((count: number) => {
    if (count <= 0) return;
    if (flashTimer.current) window.clearTimeout(flashTimer.current);
    if (flashClearTimer.current) window.clearTimeout(flashClearTimer.current);
    document
      .querySelectorAll<HTMLElement>(`[data-upload-list] > .${FLASH_CLASS}`)
      .forEach((row) => row.classList.remove(FLASH_CLASS));
    flashTimer.current = window.setTimeout(() => {
      const list = document.querySelector<HTMLElement>("[data-upload-list]");
      if (!list) return;
      const rows = Array.from(list.children).slice(-Math.min(count, 8));
      if (!rows.length) return;
      rows.forEach((row) => {
        row.classList.remove(FLASH_CLASS);
        void (row as HTMLElement).offsetWidth;
        row.classList.add(FLASH_CLASS);
      });
      flashClearTimer.current = window.setTimeout(() => {
        rows.forEach((row) => row.classList.remove(FLASH_CLASS));
        flashClearTimer.current = null;
      }, FLASH_MS);
    }, 60);
  }, []);

  const revealUploadTarget = useCallback(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia(MOBILE_QUERY).matches) return;
    if (revealTimer.current) window.clearTimeout(revealTimer.current);
    revealTimer.current = window.setTimeout(() => {
      revealTimer.current = null;
      const target =
        document.querySelector<HTMLElement>("[data-upload-list]") ??
        document.querySelector<HTMLElement>("[data-upload-action]");
      if (!target) return;
      const rect = target.getBoundingClientRect();
      const visible =
        rect.top >= 0 && rect.bottom <= window.innerHeight - 24;
      if (visible) return;
      const reduce = window.matchMedia(REDUCED_MOTION_QUERY).matches;
      target.scrollIntoView({
        behavior: reduce ? "auto" : "smooth",
        block: "start",
      });
    }, 80);
  }, []);

  const readySummary = useCallback(
    (key: string, count: number, bytes: number) =>
      t(key, { count, size: formatBytes(bytes, locale) }),
    [locale, t]
  );

  return {
    t,
    reportAdded,
    reportRejected,
    reportAddedWithRejected,
    flashNewItems,
    revealUploadTarget,
    readySummary,
  };
}
