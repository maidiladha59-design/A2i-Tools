"use client";

import { useTranslations } from "next-intl";
import { FileUp, FileText, Image as ImageIcon, ShieldCheck } from "lucide-react";
import { Dropzone } from "@/components/ui/Dropzone";
import { buttonClass } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { useUploadFeedback } from "@/components/tools/useUploadFeedback";
import { useHandoff } from "@/lib/tools/handoff";
import { isImageFile } from "@/lib/image/client";
import { isPdfFile } from "@/lib/pdf/client";
import { IMAGE_ACCEPT, PDF_ACCEPT } from "@/lib/config";
import { Link } from "@/i18n/navigation";

const ACCEPT = `${IMAGE_ACCEPT},${PDF_ACCEPT}`;

export function QuickStart() {
  const t = useTranslations("home");
  const tErrors = useTranslations("errors");
  const { toast } = useToast();
  const { launch } = useHandoff();
  const upload = useUploadFeedback();

  const handleFiles = (files: File[]) => {
    if (!files.length) return;
    const images = files.filter(isImageFile);
    const pdfs = files.filter(isPdfFile);

    if (images.length === files.length) {
      launch("/image/compress", files);
      return;
    }
    if (pdfs.length === files.length) {
      launch("/pdf/compress", files);
      return;
    }
    if (images.length > 0 && pdfs.length > 0) {
      toast({ title: t("quickMixed"), variant: "info" });
      return;
    }
    upload.reportRejected(
      files.map((file) => ({
        name: file.name,
        reason: tErrors("unsupportedImage"),
      }))
    );
  };

  return (
    <div className="card-surface relative overflow-hidden p-5 shadow-lift sm:p-6">
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-accent/20 blur-2xl"
        aria-hidden="true"
      />
      <div className="relative">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="font-display text-lg font-extrabold text-ink">
              {t("quickTitle")}
            </h2>
            <p className="mt-1 text-xs leading-relaxed text-muted">
              {t("quickHint")}
            </p>
          </div>
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand-soft text-brand">
            <FileUp className="h-5 w-5" aria-hidden="true" />
          </span>
        </div>

        <Dropzone
          accept={ACCEPT}
          onFiles={handleFiles}
          title={t("quickDrop")}
          hint={t("quickFormats")}
          buttonLabel={t("quickBrowse")}
          compact
          multiple
          className="mt-4"
        />

        <div className="mt-4 grid grid-cols-2 gap-2">
          <Link href="/image/compress" className={buttonClass("primary", "sm", "w-full")}>
            <ImageIcon className="h-4 w-4" aria-hidden="true" />
            {t("quickImages")}
          </Link>
          <Link href="/pdf/compress" className={buttonClass("secondary", "sm", "w-full")}>
            <FileText className="h-4 w-4" aria-hidden="true" />
            {t("quickPdfs")}
          </Link>
        </div>

        <p className="mt-4 flex items-center justify-center gap-1.5 text-[11px] font-semibold text-success">
          <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
          {t("statsUpload")} {t("statsUploadLabel").toLowerCase()}
        </p>
      </div>
    </div>
  );
}
