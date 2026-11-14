import type { Bilingual } from "@/content/types";

export type GuideLink = {
  slug: string;
  label: Bilingual<string>;
};

export const GUIDE_LINKS: GuideLink[] = [
  {
    slug: "compress-image-100kb",
    label: {
      id: "Kompres gambar ke 100 KB",
      en: "Compress images to 100 KB",
    },
  },
  {
    slug: "compress-image-200kb",
    label: {
      id: "Kompres gambar ke 200 KB",
      en: "Compress images to 200 KB",
    },
  },
  {
    slug: "compress-pdf-1mb",
    label: {
      id: "Kompres PDF ke 1 MB",
      en: "Compress PDF to 1 MB",
    },
  },
  {
    slug: "compress-jpg",
    label: {
      id: "Kompres JPG (format JPEG)",
      en: "Compress JPG (JPEG format)",
    },
  },
  {
    slug: "compress-png",
    label: {
      id: "Kompres PNG dengan transparansi",
      en: "Compress PNG with transparency",
    },
  },
  {
    slug: "merge-pdf",
    label: {
      id: "Gabung PDF dengan urutan sendiri",
      en: "Merge PDFs in your order",
    },
  },
  {
    slug: "jpg-to-pdf",
    label: {
      id: "Konversi JPG ke PDF",
      en: "Convert JPG to PDF",
    },
  },
  {
    slug: "png-to-pdf",
    label: {
      id: "Konversi PNG ke PDF",
      en: "Convert PNG to PDF",
    },
  },
  {
    slug: "pdf-to-jpg",
    label: {
      id: "Konversi PDF ke JPG",
      en: "Convert PDF to JPG",
    },
  },
  {
    slug: "pdf-to-png",
    label: {
      id: "Konversi PDF ke PNG",
      en: "Convert PDF to PNG",
    },
  },
  {
    slug: "word-to-pdf",
    label: {
      id: "Konversi Word ke PDF",
      en: "Convert Word to PDF",
    },
  },
  {
    slug: "pdf-to-word",
    label: {
      id: "Konversi PDF ke Word",
      en: "Convert PDF to Word",
    },
  },
];
