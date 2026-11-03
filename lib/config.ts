export const SITE_NAME = "Ai2 All Compress";
export const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL || "maidiladha59@gmail.com";

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ai2alltools.de5.net";

export const SITE_URL = rawSiteUrl.replace(/\/+$/, "");
export const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "";

export const locales = ["id", "en"] as const;
export type Locale = (typeof locales)[number];

export const IMAGE_ACCEPT =
  "image/jpeg,image/png,image/webp,image/bmp,image/gif,image/avif,image/heic,image/heif,.jpg,.jpeg,.png,.webp,.bmp,.gif,.avif,.heic,.heif";
export const PDF_ACCEPT = "application/pdf,.pdf";

export const MAX_IMAGE_BYTES = 50 * 1024 * 1024;
export const MAX_PDF_BYTES = 100 * 1024 * 1024;
export const MAX_IMAGE_FILES = 20;
export const MAX_PDF_FILES = 20;

export const IMAGE_PDF_ACCEPT = "image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp";

export const DOCX_ACCEPT =
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document,.docx";
export const MAX_DOCX_BYTES = 25 * 1024 * 1024;
