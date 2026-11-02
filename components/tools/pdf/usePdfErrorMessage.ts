"use client";

import { useTranslations } from "next-intl";
import type { PdfErrorCode } from "@/lib/pdf/client";

export function usePdfErrorMessage() {
  const t = useTranslations("errors");

  return (code?: PdfErrorCode | string | null): string => {
    switch (code) {
      case "PASSWORD":
        return t("pdfPassword");
      case "CORRUPT":
        return t("pdfCorrupt");
      case "EMPTY":
        return t("pdfEmpty");
      case "UNSUPPORTED":
        return t("pdfOnly");
      case "TOO_LARGE":
        return t("pdfTooLarge");
      case "CANCELLED":
        return t("cancelled");
      default:
        return t("processFailed");
    }
  };
}
