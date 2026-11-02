import type { PDFDocumentProxy, PDFPageProxy } from "pdfjs-dist";
import { MAX_PDF_BYTES } from "@/lib/config";

export type PdfErrorCode =
  | "PASSWORD"
  | "CORRUPT"
  | "EMPTY"
  | "UNSUPPORTED"
  | "TOO_LARGE"
  | "CANCELLED"
  | "PROCESS_FAILED";

export class PdfToolError extends Error {
  code: PdfErrorCode;

  constructor(code: PdfErrorCode, message?: string) {
    super(message || code);
    this.name = "PdfToolError";
    this.code = code;
  }
}

export type PdfValidationResult =
  | { ok: true; pageCount: number }
  | { ok: false; code: PdfErrorCode };

export type PdfPageRender = {
  sourceIndex: number;
  rotation: number;
};

export type PdfRasterOptions = {
  scale: number;
  quality: number;
  grayscale?: boolean;
};

export type PdfRenderResult = {
  blob: Blob;
  bytes: Uint8Array;
  pageCount: number;
};

export type PdfThumbnail = {
  sourceIndex: number;
  width: number;
  height: number;
  rotation: number;
  dataUrl: string;
};

export type ProgressCallbacks = {
  onPage?: (page: number, total: number) => void;
  onAttempt?: (attempt: number, totalAttempts: number, scale: number, quality: number) => void;
  shouldCancel?: () => boolean;
};

type PdfJsModule = typeof import("pdfjs-dist");

let pdfjsPromise: Promise<PdfJsModule> | null = null;

async function loadPdfJs(): Promise<PdfJsModule> {
  if (!pdfjsPromise) {
    pdfjsPromise = import("pdfjs-dist").then((pdfjs) => {
      pdfjs.GlobalWorkerOptions.workerSrc = new URL(
        "pdfjs-dist/build/pdf.worker.min.mjs",
        import.meta.url
      ).toString();
      return pdfjs;
    });
  }
  return pdfjsPromise;
}

export async function importPdfLib() {
  return import("pdf-lib");
}

export function isPdfFile(file: File): boolean {
  return file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
}

export function validatePdfBasics(file: File): PdfErrorCode | null {
  if (file.size === 0) return "EMPTY";
  if (!isPdfFile(file)) return "UNSUPPORTED";
  if (file.size > MAX_PDF_BYTES) return "TOO_LARGE";
  return null;
}

function classifyError(error: unknown): PdfToolError {
  if (error instanceof PdfToolError) return error;
  const name = (error as { name?: string } | null)?.name || "";
  const message = (error as { message?: string } | null)?.message || String(error);
  if (name === "PasswordException" || /password|encrypted/i.test(message)) {
    return new PdfToolError("PASSWORD");
  }
  if (name === "InvalidPDFException" || /invalid pdf|corrupt/i.test(message)) {
    return new PdfToolError("CORRUPT");
  }
  return new PdfToolError("PROCESS_FAILED", message);
}

export function isCancelledError(error: unknown): boolean {
  return error instanceof PdfToolError && error.code === "CANCELLED";
}

export async function validatePdfFile(file: File): Promise<PdfValidationResult> {
  const basic = validatePdfBasics(file);
  if (basic) return { ok: false, code: basic };

  try {
    const bytes = new Uint8Array(await file.arrayBuffer());
    const { PDFDocument } = await importPdfLib();
    const doc = await PDFDocument.load(bytes, {
      ignoreEncryption: false,
      updateMetadata: false,
    });
    return { ok: true, pageCount: doc.getPageCount() };
  } catch (error) {
    const classified = classifyError(error);
    if (classified.code === "PASSWORD" || classified.code === "CORRUPT") {
      return { ok: false, code: classified.code };
    }
    return { ok: false, code: "CORRUPT" };
  }
}

export async function readPdfPageCount(bytes: Uint8Array): Promise<number> {
  try {
    const { PDFDocument } = await importPdfLib();
    const doc = await PDFDocument.load(bytes, {
      ignoreEncryption: false,
      updateMetadata: false,
    });
    return doc.getPageCount();
  } catch (error) {
    throw classifyError(error);
  }
}

type OpenedPdf = {
  pdf: PDFDocumentProxy;
  destroy: () => Promise<void>;
};

async function openDocument(bytes: Uint8Array): Promise<OpenedPdf> {
  const pdfjs = await loadPdfJs();
  const loadingTask = pdfjs.getDocument({
    data: new Uint8Array(bytes),
    useSystemFonts: true,
    verbosity: 0,
  });
  try {
    const pdf = await loadingTask.promise;
    return { pdf, destroy: () => loadingTask.destroy() };
  } catch (error) {
    throw classifyError(error);
  }
}

function assertNotCancelled(shouldCancel?: () => boolean): void {
  if (shouldCancel?.()) {
    throw new PdfToolError("CANCELLED");
  }
}

function yieldToMainThread(): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, 0);
  });
}

function canvasToJpeg(canvas: HTMLCanvasElement, quality: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new PdfToolError("PROCESS_FAILED", "Canvas encoding failed"));
      },
      "image/jpeg",
      quality
    );
  });
}

type RenderedPage = {
  blob: Blob;
  width: number;
  height: number;
};

async function renderSinglePage(
  page: PDFPageProxy,
  options: PdfRasterOptions,
  rotationDelta: number
): Promise<RenderedPage> {
  const rotation = ((page.rotate || 0) + rotationDelta + 360) % 360;
  const baseViewport = page.getViewport({ scale: 1, rotation });
  const maxSideScale =
    4200 / Math.max(baseViewport.width, baseViewport.height);
  const pixelScale = Math.min(
    options.scale,
    maxSideScale,
    Math.sqrt(16000000 / (baseViewport.width * baseViewport.height))
  );
  const viewport = page.getViewport({
    scale: Math.max(0.1, pixelScale),
    rotation,
  });

  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.floor(viewport.width));
  canvas.height = Math.max(1, Math.floor(viewport.height));
  const context = canvas.getContext("2d", { alpha: false });
  if (!context) throw new PdfToolError("PROCESS_FAILED", "Canvas unavailable");
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, canvas.width, canvas.height);

  try {
    const task = page.render({
      canvasContext: context,
      canvas,
      viewport,
      background: "#ffffff",
    });
    await task.promise;

    let outputCanvas = canvas;
    let grayCanvas: HTMLCanvasElement | null = null;
    if (options.grayscale) {
      grayCanvas = document.createElement("canvas");
      grayCanvas.width = canvas.width;
      grayCanvas.height = canvas.height;
      const grayContext = grayCanvas.getContext("2d", { alpha: false });
      if (grayContext) {
        grayContext.filter = "grayscale(100%)";
        grayContext.drawImage(canvas, 0, 0);
        outputCanvas = grayCanvas;
      }
    }

    const blob = await canvasToJpeg(outputCanvas, options.quality);
    return {
      blob,
      width: baseViewport.width,
      height: baseViewport.height,
    };
  } finally {
    canvas.width = 0;
    canvas.height = 0;
    page.cleanup();
  }
}

async function buildPdfFromDocument(
  pdf: PDFDocumentProxy,
  pages: PdfPageRender[],
  options: PdfRasterOptions,
  callbacks: ProgressCallbacks
): Promise<PdfRenderResult> {
  const { PDFDocument } = await importPdfLib();
  const output = await PDFDocument.create();
  const total = pages.length;

  for (let index = 0; index < pages.length; index += 1) {
    assertNotCancelled(callbacks.shouldCancel);
    const spec = pages[index];
    if (!spec) continue;
    const page = await pdf.getPage(spec.sourceIndex + 1);
    const rendered = await renderSinglePage(page, options, spec.rotation);
    const image = await output.embedJpg(await rendered.blob.arrayBuffer());
    const outputPage = output.addPage([rendered.width, rendered.height]);
    outputPage.drawImage(image, {
      x: 0,
      y: 0,
      width: rendered.width,
      height: rendered.height,
    });
    callbacks.onPage?.(index + 1, total);
    await yieldToMainThread();
  }

  assertNotCancelled(callbacks.shouldCancel);
  const bytes = await output.save({ useObjectStreams: true });
  return {
    bytes,
    blob: new Blob([new Uint8Array(bytes)], { type: "application/pdf" }),
    pageCount: output.getPageCount(),
  };
}

export async function compressPdf(
  bytes: Uint8Array,
  options: PdfRasterOptions,
  callbacks: ProgressCallbacks = {}
): Promise<PdfRenderResult> {
  const { pdf, destroy } = await openDocument(bytes);
  try {
    const pages = Array.from({ length: pdf.numPages }, (_, index) => ({
      sourceIndex: index,
      rotation: 0,
    }));
    return await buildPdfFromDocument(pdf, pages, options, callbacks);
  } finally {
    await destroy();
  }
}

const REDUCE_STRATEGIES: Array<{ scale: number; quality: number }> = [
  { scale: 1.8, quality: 0.82 },
  { scale: 1.5, quality: 0.7 },
  { scale: 1.25, quality: 0.6 },
  { scale: 1.05, quality: 0.5 },
  { scale: 0.9, quality: 0.44 },
  { scale: 0.75, quality: 0.38 },
  { scale: 0.6, quality: 0.32 },
];

export type PdfReduceResult = PdfRenderResult & {
  targetBytes: number;
  targetMet: boolean;
  attempts: number;
};

export async function reducePdfToTarget(
  bytes: Uint8Array,
  targetBytes: number,
  callbacks: ProgressCallbacks = {}
): Promise<PdfReduceResult> {
  const { pdf, destroy } = await openDocument(bytes);
  try {
    const pages = Array.from({ length: pdf.numPages }, (_, index) => ({
      sourceIndex: index,
      rotation: 0,
    }));
    let best: PdfRenderResult | null = null;
    let attempts = 0;

    for (let index = 0; index < REDUCE_STRATEGIES.length; index += 1) {
      assertNotCancelled(callbacks.shouldCancel);
      const strategy = REDUCE_STRATEGIES[index];
      if (!strategy) continue;
      attempts = index + 1;
      callbacks.onAttempt?.(attempts, REDUCE_STRATEGIES.length, strategy.scale, strategy.quality);

      const result = await buildPdfFromDocument(
        pdf,
        pages,
        { scale: strategy.scale, quality: strategy.quality },
        callbacks
      );

      if (!best || result.bytes.length < best.bytes.length) {
        best = result;
      }

      if (result.bytes.length <= targetBytes) {
        return {
          ...result,
          targetBytes,
          targetMet: true,
          attempts,
        };
      }
    }

    if (!best) throw new PdfToolError("PROCESS_FAILED");
    return {
      ...best,
      targetBytes,
      targetMet: false,
      attempts,
    };
  } finally {
    await destroy();
  }
}

export type RewritePdfOptions =
  | { rasterize: false }
  | {
      rasterize: true;
      rasterOptions: PdfRasterOptions;
    };

export async function rewritePdfPages(
  bytes: Uint8Array,
  pages: PdfPageRender[],
  options: RewritePdfOptions,
  callbacks: ProgressCallbacks = {}
): Promise<PdfRenderResult> {
  if (!pages.length) {
    throw new PdfToolError("PROCESS_FAILED", "No pages selected");
  }

  if (!options.rasterize) {
    const { PDFDocument, degrees } = await importPdfLib();
    const source = await PDFDocument.load(bytes, { updateMetadata: false });
    const output = await PDFDocument.create();

    for (let index = 0; index < pages.length; index += 1) {
      assertNotCancelled(callbacks.shouldCancel);
      const spec = pages[index];
      if (!spec) continue;
      const [copied] = await output.copyPages(source, [spec.sourceIndex]);
      if (!copied) continue;
      const current = copied.getRotation().angle || 0;
      copied.setRotation(degrees((current + spec.rotation + 360) % 360));
      output.addPage(copied);
      callbacks.onPage?.(index + 1, pages.length);
    }

    assertNotCancelled(callbacks.shouldCancel);
    const saved = await output.save({ useObjectStreams: true });
    return {
      bytes: saved,
      blob: new Blob([new Uint8Array(saved)], { type: "application/pdf" }),
      pageCount: output.getPageCount(),
    };
  }

  const { pdf, destroy } = await openDocument(bytes);
  try {
    return await buildPdfFromDocument(
      pdf,
      pages,
      options.rasterOptions,
      callbacks
    );
  } finally {
    await destroy();
  }
}

export async function mergePdfs(
  files: Array<{ bytes: Uint8Array; name: string }>,
  callbacks: ProgressCallbacks = {}
): Promise<PdfRenderResult> {
  if (files.length < 2) {
    throw new PdfToolError("PROCESS_FAILED", "At least two PDFs are required");
  }

  const { PDFDocument } = await importPdfLib();
  const output = await PDFDocument.create();
  let pageCount = 0;

  for (let index = 0; index < files.length; index += 1) {
    assertNotCancelled(callbacks.shouldCancel);
    const entry = files[index];
    if (!entry) continue;
    try {
      const source = await PDFDocument.load(entry.bytes, {
        updateMetadata: false,
      });
      const copied = await output.copyPages(source, source.getPageIndices());
      copied.forEach((page) => output.addPage(page));
      pageCount += copied.length;
    } catch (error) {
      throw classifyError(error);
    }
    callbacks.onPage?.(index + 1, files.length);
    await yieldToMainThread();
  }

  assertNotCancelled(callbacks.shouldCancel);
  const saved = await output.save({ useObjectStreams: true });
  return {
    bytes: saved,
    blob: new Blob([new Uint8Array(saved)], { type: "application/pdf" }),
    pageCount,
  };
}

export async function renderPdfThumbnails(
  bytes: Uint8Array,
  callbacks: ProgressCallbacks = {}
): Promise<{ thumbnails: PdfThumbnail[]; pageCount: number }> {
  const { pdf, destroy } = await openDocument(bytes);
  const total = pdf.numPages;
  const thumbnails: PdfThumbnail[] = [];

  try {
    for (let index = 0; index < total; index += 1) {
      assertNotCancelled(callbacks.shouldCancel);
      const page = await pdf.getPage(index + 1);
      const rotation = page.rotate || 0;
      const baseViewport = page.getViewport({ scale: 1 });
      const targetWidth = 220;
      const scale = targetWidth / baseViewport.width;
      const viewport = page.getViewport({ scale });

      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.floor(viewport.width));
      canvas.height = Math.max(1, Math.floor(viewport.height));
      const context = canvas.getContext("2d", { alpha: false });
      if (!context) throw new PdfToolError("PROCESS_FAILED", "Canvas unavailable");
      context.fillStyle = "#ffffff";
      context.fillRect(0, 0, canvas.width, canvas.height);

      try {
        await page.render({
          canvasContext: context,
          canvas,
          viewport,
          background: "#ffffff",
        }).promise;
        const dataUrl = canvas.toDataURL("image/jpeg", 0.62);
        thumbnails.push({
          sourceIndex: index,
          width: baseViewport.width,
          height: baseViewport.height,
          rotation,
          dataUrl,
        });
      } finally {
        canvas.width = 0;
        canvas.height = 0;
        page.cleanup();
      }

      callbacks.onPage?.(index + 1, total);
      await yieldToMainThread();
    }
    return { thumbnails, pageCount: total };
  } finally {
    await destroy();
  }
}

export function pdfErrorMessageKey(code: PdfErrorCode): string {
  switch (code) {
    case "PASSWORD":
      return "errors.pdfPassword";
    case "CORRUPT":
      return "errors.pdfCorrupt";
    case "EMPTY":
      return "errors.emptyFile";
    case "UNSUPPORTED":
      return "errors.pdfOnly";
    case "TOO_LARGE":
      return "errors.pdfTooLarge";
    case "CANCELLED":
      return "errors.cancelled";
    default:
      return "errors.processFailed";
  }
}
