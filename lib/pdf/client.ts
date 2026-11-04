import type { PDFDocumentProxy, PDFPageProxy } from "pdfjs-dist";
import { MAX_PDF_BYTES } from "@/lib/config";
import {
  clampNumber,
  isCloseToTarget,
  mixNumber,
  pageAllowance,
  canRaisePageQuality,
  refineUnderTarget,
} from "@/lib/target-search";

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
  imageBytesTotal?: number;
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

type RasterizedPage = {
  canvas: HTMLCanvasElement;
  width: number;
  height: number;
};

async function rasterizePage(
  page: PDFPageProxy,
  options: PdfRasterOptions,
  rotationDelta: number
): Promise<RasterizedPage> {
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
  } catch (error) {
    canvas.width = 0;
    canvas.height = 0;
    throw error;
  }

  if (!options.grayscale) return { canvas, width: baseViewport.width, height: baseViewport.height };

  const grayCanvas = document.createElement("canvas");
  grayCanvas.width = canvas.width;
  grayCanvas.height = canvas.height;
  const grayContext = grayCanvas.getContext("2d", { alpha: false });
  if (!grayContext) return { canvas, width: baseViewport.width, height: baseViewport.height };
  grayContext.filter = "grayscale(100%)";
  grayContext.drawImage(canvas, 0, 0);
  return { canvas: grayCanvas, width: baseViewport.width, height: baseViewport.height };
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
  const raster = await rasterizePage(page, options, rotationDelta);
  try {
    const blob = await canvasToJpeg(raster.canvas, options.quality);
    return {
      blob,
      width: raster.width,
      height: raster.height,
    };
  } finally {
    raster.canvas.width = 0;
    raster.canvas.height = 0;
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
  let imageBytesTotal = 0;

  for (let index = 0; index < pages.length; index += 1) {
    assertNotCancelled(callbacks.shouldCancel);
    const spec = pages[index];
    if (!spec) continue;
    const page = await pdf.getPage(spec.sourceIndex + 1);
    const rendered = await renderSinglePage(page, options, spec.rotation);
    imageBytesTotal += rendered.blob.size;
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
    imageBytesTotal,
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

export type PdfReduceStrategy = { scale: number; quality: number };

/** Quality ceiling for the per-page budget pass. */
const REDUCE_MAX_QUALITY = 0.95;
const REDUCE_MIN_QUALITY = 0.2;
const REFINE_MAX_STEPS = 5;
const REFINE_MIN_GAP = 0.05;
const POLISH_MAX_PAGES = 60;
const MIN_BUDGET_MS = 45000;
const MAX_BUDGET_MS = 240000;
const HARD_MAX_MS = 420000;
const BUDGET_PASSES = 6;

/**
 * Strategy at a fractional position on the rung ladder. Whole positions match
 * `REDUCE_STRATEGIES`; positions between two rungs blend scale and quality so the
 * search can step finer than the ladder itself. Higher position, smaller output.
 */
export function reduceStrategyAt(position: number): PdfReduceStrategy {
  const lastIndex = REDUCE_STRATEGIES.length - 1;
  const clamped = clampNumber(position, 0, lastIndex);
  const low = Math.floor(clamped);
  const high = Math.min(lastIndex, low + 1);
  const a = REDUCE_STRATEGIES[low];
  const b = REDUCE_STRATEGIES[high];
  if (!a || !b) return { scale: 0.6, quality: 0.32 };
  const t = clamped - low;
  return {
    scale: Number(mixNumber(a.scale, b.scale, t).toFixed(4)),
    quality: Number(mixNumber(a.quality, b.quality, t).toFixed(4)),
  };
}

type SizedRender = PdfRenderResult & { size: number; imageBytesTotal: number };

function toSized(result: PdfRenderResult): SizedRender {
  return {
    ...result,
    size: result.bytes.length,
    imageBytesTotal: result.imageBytesTotal ?? result.bytes.length,
  };
}

async function renderAtPosition(
  pdf: PDFDocumentProxy,
  pages: PdfPageRender[],
  position: number,
  callbacks: ProgressCallbacks
): Promise<SizedRender> {
  return toSized(
    await buildPdfFromDocument(pdf, pages, reduceStrategyAt(position), callbacks)
  );
}

/**
 * One render pass that fits the document to the target page by page. Every page
 * is rasterised once, encoded at the global quality, then nudged: a page with
 * headroom gets more quality, a page over its share gets less. Pages that
 * underspend hand their room to the pages behind them, so leftover bytes end up
 * used instead of wasted.
 */
async function buildPdfWithPageBudget(
  pdf: PDFDocumentProxy,
  pages: PdfPageRender[],
  strategy: PdfReduceStrategy,
  budget: {
    targetBytes: number;
    overheadBytes: number;
    minQuality: number;
    maxQuality: number;
  },
  callbacks: ProgressCallbacks
): Promise<SizedRender> {
  const { PDFDocument } = await importPdfLib();
  const output = await PDFDocument.create();
  let usedBytes = 0;
  let imageBytesTotal = 0;

  for (let index = 0; index < pages.length; index += 1) {
    assertNotCancelled(callbacks.shouldCancel);
    const spec = pages[index];
    if (!spec) continue;
    const page = await pdf.getPage(spec.sourceIndex + 1);
    const raster = await rasterizePage(page, strategy, spec.rotation);

    try {
      const allowance = pageAllowance({
        targetBytes: budget.targetBytes,
        overheadBytes: budget.overheadBytes,
        usedBytes,
        pageIndex: index,
        pageCount: pages.length,
      });

      let quality = strategy.quality;
      let blob = await canvasToJpeg(raster.canvas, quality);

      if (blob.size > allowance && quality > budget.minQuality) {
        // This page alone would blow the budget: step down until it fits.
        const floorBlob = await canvasToJpeg(raster.canvas, budget.minQuality);
        if (floorBlob.size <= allowance) {
          const refined = await refineUnderTarget<number, Blob>({
            target: allowance,
            known: { candidate: budget.minQuality, value: floorBlob },
            aspiration: quality,
            mix: (t) => mixNumber(budget.minQuality, quality, t),
            probe: (candidate) => canvasToJpeg(raster.canvas, candidate),
            maxSteps: 2,
            minGap: 0.05,
          });
          quality = refined.candidate;
          blob = refined.value;
        } else {
          quality = budget.minQuality;
          blob = floorBlob;
        }
      } else if (
        canRaisePageQuality({
          pageSize: blob.size,
          allowance,
          quality,
          maxQuality: budget.maxQuality,
        })
      ) {
        const refined = await refineUnderTarget<number, Blob>({
          target: allowance,
          known: { candidate: quality, value: blob },
          aspiration: budget.maxQuality,
          mix: (t) => mixNumber(quality, budget.maxQuality, t),
          probe: (candidate) => canvasToJpeg(raster.canvas, candidate),
          maxSteps: 2,
          minGap: 0.06,
        });
        quality = refined.candidate;
        blob = refined.value;
      }

      usedBytes += blob.size;
      imageBytesTotal += blob.size;
      const image = await output.embedJpg(await blob.arrayBuffer());
      const outputPage = output.addPage([raster.width, raster.height]);
      outputPage.drawImage(image, {
        x: 0,
        y: 0,
        width: raster.width,
        height: raster.height,
      });
    } finally {
      raster.canvas.width = 0;
      raster.canvas.height = 0;
      page.cleanup();
    }

    callbacks.onPage?.(index + 1, pages.length);
    await yieldToMainThread();
  }

  assertNotCancelled(callbacks.shouldCancel);
  const bytes = await output.save({ useObjectStreams: true });
  return toSized({
    bytes,
    blob: new Blob([new Uint8Array(bytes)], { type: "application/pdf" }),
    pageCount: output.getPageCount(),
    imageBytesTotal,
  });
}

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
    const pageCount = pages.length;
    const lastIndex = REDUCE_STRATEGIES.length - 1;
    const willPolish = pageCount > 0 && pageCount <= POLISH_MAX_PAGES;
    const bracketSteps = Math.ceil(Math.log2(lastIndex + 1)) + 1;
    const totalAttempts = bracketSteps + REFINE_MAX_STEPS + (willPolish ? 1 : 0);

    const startedAt = Date.now();
    let passMs = 0;
    let deadlineAt = startedAt + MIN_BUDGET_MS;
    const hardDeadlineAt = startedAt + HARD_MAX_MS;
    let attempts = 0;

    // A full pass is the expensive unit of work, so the time budget is expressed
    // in passes measured from the document itself rather than a fixed guess.
    const canAffordPass = () => Date.now() + Math.max(passMs, 1000) <= deadlineAt;
    // The per-page pass is reserved one pass beyond the soft budget: it is the
    // step that actually closes the gap to the target, and the ladder alone can
    // spend the whole soft budget on documents with many pages.
    const canAffordPolish = () =>
      canAffordPass() || Date.now() + Math.max(passMs, 1000) <= hardDeadlineAt;

    const measure = (tookMs: number) => {
      passMs = passMs ? Math.round((passMs + tookMs) / 2) : tookMs;
      deadlineAt =
        startedAt + clampNumber(passMs * BUDGET_PASSES, MIN_BUDGET_MS, MAX_BUDGET_MS);
    };

    const probe = async (position: number): Promise<SizedRender> => {
      assertNotCancelled(callbacks.shouldCancel);
      const strategy = reduceStrategyAt(position);
      attempts += 1;
      callbacks.onAttempt?.(attempts, totalAttempts, strategy.scale, strategy.quality);
      const beganAt = Date.now();
      const result = await renderAtPosition(pdf, pages, position, callbacks);
      measure(Date.now() - beganAt);
      return result;
    };

    const polish = async (
      position: number,
      overheadBytes: number
    ): Promise<SizedRender> => {
      const strategy = reduceStrategyAt(position);
      attempts += 1;
      callbacks.onAttempt?.(attempts, totalAttempts, strategy.scale, strategy.quality);
      const beganAt = Date.now();
      const result = await buildPdfWithPageBudget(
        pdf,
        pages,
        strategy,
        {
          targetBytes,
          overheadBytes,
          minQuality: Math.min(REDUCE_MIN_QUALITY, strategy.quality),
          maxQuality: REDUCE_MAX_QUALITY,
        },
        callbacks
      );
      measure(Date.now() - beganAt);
      return result;
    };

    // Bisect the ladder instead of walking it: find the gentlest rung that still
    // fits in a few passes, whatever the document size.
    let smallest: SizedRender | null = null;
    let fit: { position: number; result: SizedRender } | null = null;
    let lo = 0;
    let hi = lastIndex;

    while (lo <= hi) {
      const mid = Math.floor((lo + hi) / 2);
      const result = await probe(mid);
      if (!smallest || result.size < smallest.size) {
        smallest = result;
      }
      if (result.size <= targetBytes) {
        if (!fit || result.size > fit.result.size) {
          fit = { position: mid, result };
        }
        hi = mid - 1;
      } else {
        lo = mid + 1;
      }
    }

    if (!fit) {
      // Nothing on the ladder reached the target. The per-page pass can still go
      // below the lowest global quality, so try it before giving up.
      let fallback = smallest;
      if (willPolish && fallback && canAffordPolish()) {
        const polished = await polish(
          lastIndex,
          Math.max(0, fallback.size - fallback.imageBytesTotal)
        );
        if (polished.size <= fallback.size) {
          fallback = polished;
        }
      }
      if (!fallback) throw new PdfToolError("PROCESS_FAILED");
      return {
        ...fallback,
        targetBytes,
        targetMet: fallback.size <= targetBytes,
        attempts,
      };
    }

    let chosen = fit.result;
    let chosenPosition = fit.position;

    // Chase the target from below: walk back toward the rung that was still too
    // big, accepting only candidates that stay at or under the target.
    if (
      chosenPosition >= 1 &&
      !isCloseToTarget(chosen.size, targetBytes) &&
      canAffordPass()
    ) {
      const refined = await refineUnderTarget<number, SizedRender>({
        target: targetBytes,
        known: { candidate: chosenPosition, value: chosen },
        aspiration: chosenPosition - 1,
        mix: (t) => mixNumber(chosenPosition, chosenPosition - 1, t),
        probe,
        maxSteps: REFINE_MAX_STEPS,
        minGap: REFINE_MIN_GAP,
        deadlineAt,
        canContinue: canAffordPass,
      });
      chosen = refined.value;
      chosenPosition = refined.candidate;
    }

    // Spend what the global search left on the table, page by page.
    if (willPolish && !isCloseToTarget(chosen.size, targetBytes) && canAffordPolish()) {
      const polished = await polish(
        chosenPosition,
        Math.max(0, chosen.size - chosen.imageBytesTotal)
      );
      if (polished.size <= targetBytes && polished.size > chosen.size) {
        chosen = polished;
      }
    }

    assertNotCancelled(callbacks.shouldCancel);
    return {
      ...chosen,
      targetBytes,
      targetMet: chosen.size <= targetBytes,
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

export type ImagePdfPageSize = "auto" | "a4";

export type ImageToPdfOptions = {
  pageSize?: ImagePdfPageSize;
  margin?: number;
};

const A4_SHORT_SIDE = 595.28;
const A4_LONG_SIDE = 841.89;
const AUTO_MAX_SIDE = 842;
const MAX_RASTER_SIDE = 4200;

function canvasToMime(
  canvas: HTMLCanvasElement,
  type: string,
  quality?: number
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new PdfToolError("PROCESS_FAILED", "Canvas encoding failed"));
      },
      type,
      quality
    );
  });
}

async function encodeImageFile(file: File): Promise<{
  bytes: ArrayBuffer;
  width: number;
  height: number;
  kind: "png" | "jpeg";
}> {
  if (typeof createImageBitmap !== "function") {
    throw new PdfToolError("PROCESS_FAILED", "Image decoding unavailable");
  }

  let bitmap: ImageBitmap;
  try {
    bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
  } catch {
    throw new PdfToolError("UNSUPPORTED", "Image could not be decoded");
  }

  const isPng =
    file.type.toLowerCase() === "image/png" || /\.png$/i.test(file.name);
  const canvas = document.createElement("canvas");
  try {
    const scale = Math.min(
      1,
      MAX_RASTER_SIDE / Math.max(bitmap.width, bitmap.height)
    );
    const width = Math.max(1, Math.floor(bitmap.width * scale));
    const height = Math.max(1, Math.floor(bitmap.height * scale));
    canvas.width = width;
    canvas.height = height;

    const context = canvas.getContext("2d", { alpha: isPng });
    if (!context) throw new PdfToolError("PROCESS_FAILED", "Canvas unavailable");
    if (!isPng) {
      context.fillStyle = "#ffffff";
      context.fillRect(0, 0, width, height);
    }
    context.drawImage(bitmap, 0, 0, width, height);

    const blob = await canvasToMime(
      canvas,
      isPng ? "image/png" : "image/jpeg",
      isPng ? undefined : 0.92
    );
    return {
      bytes: await blob.arrayBuffer(),
      width,
      height,
      kind: isPng ? "png" : "jpeg",
    };
  } finally {
    bitmap.close();
    canvas.width = 0;
    canvas.height = 0;
  }
}

export async function imagesToPdf(
  files: File[],
  options: ImageToPdfOptions = {},
  callbacks: ProgressCallbacks = {}
): Promise<PdfRenderResult> {
  if (!files.length) {
    throw new PdfToolError("PROCESS_FAILED", "No images selected");
  }

  const { PDFDocument } = await importPdfLib();
  const output = await PDFDocument.create();
  const total = files.length;
  const margin = Math.max(0, options.margin ?? 24);

  for (let index = 0; index < files.length; index += 1) {
    assertNotCancelled(callbacks.shouldCancel);
    const file = files[index];
    if (!file) continue;

    const encoded = await encodeImageFile(file);
    const image =
      encoded.kind === "png"
        ? await output.embedPng(encoded.bytes)
        : await output.embedJpg(encoded.bytes);

    if (options.pageSize === "a4") {
      const landscape = encoded.width > encoded.height;
      const pageWidth = landscape ? A4_LONG_SIDE : A4_SHORT_SIDE;
      const pageHeight = landscape ? A4_SHORT_SIDE : A4_LONG_SIDE;
      const availableWidth = Math.max(1, pageWidth - margin * 2);
      const availableHeight = Math.max(1, pageHeight - margin * 2);
      const fit = Math.min(
        availableWidth / encoded.width,
        availableHeight / encoded.height
      );
      const drawWidth = encoded.width * fit;
      const drawHeight = encoded.height * fit;
      const page = output.addPage([pageWidth, pageHeight]);
      page.drawImage(image, {
        x: (pageWidth - drawWidth) / 2,
        y: (pageHeight - drawHeight) / 2,
        width: drawWidth,
        height: drawHeight,
      });
    } else {
      const fit = Math.min(
        1,
        AUTO_MAX_SIDE / Math.max(encoded.width, encoded.height)
      );
      const drawWidth = Math.max(1, encoded.width * fit);
      const drawHeight = Math.max(1, encoded.height * fit);
      const page = output.addPage([drawWidth, drawHeight]);
      page.drawImage(image, {
        x: 0,
        y: 0,
        width: drawWidth,
        height: drawHeight,
      });
    }

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

export type PdfImageFormat = "image/jpeg" | "image/png";

export type PdfToImageOptions = {
  format: PdfImageFormat;
  scale: number;
  quality?: number;
};

export type PdfImagePage = {
  pageNumber: number;
  blob: Blob;
  width: number;
  height: number;
};

export type PdfImageResult = {
  pages: PdfImagePage[];
  pageCount: number;
};

export async function pdfToImages(
  bytes: Uint8Array,
  options: PdfToImageOptions,
  callbacks: ProgressCallbacks = {}
): Promise<PdfImageResult> {
  const { pdf, destroy } = await openDocument(bytes);
  const total = pdf.numPages;
  const pages: PdfImagePage[] = [];

  try {
    for (let index = 0; index < total; index += 1) {
      assertNotCancelled(callbacks.shouldCancel);
      const page = await pdf.getPage(index + 1);
      const rotation = page.rotate || 0;
      const baseViewport = page.getViewport({ scale: 1, rotation });
      const pixelScale = Math.min(
        options.scale,
        MAX_RASTER_SIDE / Math.max(baseViewport.width, baseViewport.height),
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
        await page.render({
          canvasContext: context,
          canvas,
          viewport,
          background: "#ffffff",
        }).promise;
        const blob = await canvasToMime(
          canvas,
          options.format,
          options.format === "image/jpeg" ? options.quality ?? 0.9 : undefined
        );
        pages.push({
          pageNumber: index + 1,
          blob,
          width: canvas.width,
          height: canvas.height,
        });
      } finally {
        canvas.width = 0;
        canvas.height = 0;
        page.cleanup();
      }

      callbacks.onPage?.(index + 1, total);
      await yieldToMainThread();
    }

    return { pages, pageCount: total };
  } finally {
    await destroy();
  }
}

export type PdfTextPage = {
  pageNumber: number;
  text: string;
};

export type PdfTextResult = {
  pages: PdfTextPage[];
  pageCount: number;
};

type PositionedText = {
  str: string;
  x: number;
  y: number;
  size: number;
  width: number;
};

type TextLineGroup = {
  y: number;
  size: number;
  parts: PositionedText[];
};

function readPdfTextItem(item: unknown): PositionedText | null {
  if (!item || typeof item !== "object") return null;
  const candidate = item as {
    str?: unknown;
    transform?: unknown;
    width?: unknown;
    height?: unknown;
  };
  if (typeof candidate.str !== "string" || !Array.isArray(candidate.transform)) {
    return null;
  }
  const size =
    Math.abs(Number(candidate.transform[3])) || Number(candidate.height) || 10;
  return {
    str: candidate.str,
    x: Number(candidate.transform[4]) || 0,
    y: Number(candidate.transform[5]) || 0,
    size,
    width: typeof candidate.width === "number" ? candidate.width : 0,
  };
}

function buildPageText(items: PositionedText[]): string {
  const positioned = items
    .filter((item) => item.str.trim().length > 0)
    .slice()
    .sort((a, b) => (Math.abs(a.y - b.y) > 2 ? b.y - a.y : a.x - b.x));

  if (!positioned.length) return "";

  const lines: TextLineGroup[] = [];
  for (const item of positioned) {
    const line = lines[lines.length - 1];
    if (line && Math.abs(line.y - item.y) <= Math.max(2, line.size * 0.4)) {
      line.parts.push(item);
    } else {
      lines.push({ y: item.y, size: item.size, parts: [item] });
    }
  }

  const rendered: Array<{ text: string; gap: number; size: number }> = [];
  let previousY: number | null = null;

  for (const line of lines) {
    line.parts.sort((a, b) => a.x - b.x);
    let text = "";
    let previousEnd: number | null = null;

    for (const part of line.parts) {
      const piece = part.str.replace(/\s+/g, " ").trim();
      if (!piece) continue;
      if (
        text &&
        previousEnd !== null &&
        part.x - previousEnd > Math.max(1, part.size * 0.12)
      ) {
        text += " ";
      }
      text += piece;
      previousEnd = part.x + part.width;
    }

    if (!text) continue;
    rendered.push({
      text,
      gap: previousY === null ? 0 : Math.max(0, previousY - line.y),
      size: line.size,
    });
    previousY = line.y;
  }

  let output = "";
  rendered.forEach((entry, index) => {
    if (index > 0) {
      output += entry.gap > entry.size * 1.8 ? "\n\n" : "\n";
    }
    output += entry.text;
  });
  return output;
}

export async function extractPdfText(
  bytes: Uint8Array,
  callbacks: ProgressCallbacks = {}
): Promise<PdfTextResult> {
  const { pdf, destroy } = await openDocument(bytes);
  const total = pdf.numPages;
  const pages: PdfTextPage[] = [];

  try {
    for (let index = 0; index < total; index += 1) {
      assertNotCancelled(callbacks.shouldCancel);
      const page = await pdf.getPage(index + 1);
      const content = await page.getTextContent();
      const items = content.items
        .map(readPdfTextItem)
        .filter((item): item is PositionedText => item !== null);
      pages.push({
        pageNumber: index + 1,
        text: buildPageText(items),
      });
      page.cleanup();
      callbacks.onPage?.(index + 1, total);
      await yieldToMainThread();
    }
    return { pages, pageCount: total };
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
