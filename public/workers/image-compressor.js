/* Ai2 All Compress image pipeline.
 * Runs inside a dedicated Web Worker. Uses OffscreenCanvas + createImageBitmap.
 * No file data ever leaves the browser.
 */

const MAX_DIMENSION = 12000;
const MAX_PIXELS = 60000000;
const MIN_DIMENSION = 24;

function makeError(code, message) {
  const error = new Error(message || code);
  error.code = code;
  return error;
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function postProgress(id, payload) {
  self.postMessage({ id, type: "progress", ...payload });
}

self.onmessage = async (event) => {
  const data = event.data || {};
  const { id, file, options } = data;
  if (!id || !file) return;

  try {
    const result = await processImage(id, file, options || {});
    self.postMessage({ id, type: "done", ...result });
  } catch (error) {
    self.postMessage({
      id,
      type: "error",
      code: error && error.code ? error.code : "PROCESS_FAILED",
      message: error && error.message ? error.message : String(error),
    });
  }
};

async function decodeBitmap(file) {
  if (typeof createImageBitmap !== "function") {
    throw makeError("UNSUPPORTED_BROWSER");
  }
  try {
    return await createImageBitmap(file, { imageOrientation: "from-image" });
  } catch {
    try {
      return await createImageBitmap(file);
    } catch {
      throw makeError("IMAGE_DECODE");
    }
  }
}

function resolveFormat(options, sourceType) {
  if (options.format && options.format !== "auto") return options.format;
  if (
    sourceType === "image/jpeg" ||
    sourceType === "image/png" ||
    sourceType === "image/webp"
  ) {
    return sourceType;
  }
  return "image/jpeg";
}

function getSourceRect(bitmap, crop) {
  if (!crop) {
    return { sx: 0, sy: 0, sw: bitmap.width, sh: bitmap.height };
  }
  const sx = clamp(Math.round(crop.x), 0, Math.max(0, bitmap.width - 1));
  const sy = clamp(Math.round(crop.y), 0, Math.max(0, bitmap.height - 1));
  const sw = clamp(Math.round(crop.width), 1, bitmap.width - sx);
  const sh = clamp(Math.round(crop.height), 1, bitmap.height - sy);
  return { sx, sy, sw, sh };
}

function computeDimensions(rect, options) {
  const aspect = rect.sw / rect.sh;
  let width;
  let height;

  if (options.width && options.height) {
    width = options.width;
    height = options.height;
  } else if (options.width) {
    width = options.width;
    height = Math.round(width / aspect);
  } else if (options.height) {
    height = options.height;
    width = Math.round(height * aspect);
  } else if (options.maxWidth || options.maxHeight) {
    const scale = Math.min(
      1,
      options.maxWidth ? options.maxWidth / rect.sw : 1,
      options.maxHeight ? options.maxHeight / rect.sh : 1
    );
    width = Math.round(rect.sw * scale);
    height = Math.round(rect.sh * scale);
  } else {
    width = rect.sw;
    height = rect.sh;
  }

  width = clamp(Math.round(width), MIN_DIMENSION, MAX_DIMENSION);
  height = clamp(Math.round(height), MIN_DIMENSION, MAX_DIMENSION);

  const pixels = width * height;
  if (pixels > MAX_PIXELS) {
    const factor = Math.sqrt(MAX_PIXELS / pixels);
    width = Math.max(MIN_DIMENSION, Math.round(width * factor));
    height = Math.max(MIN_DIMENSION, Math.round(height * factor));
  }

  return { width, height };
}

function drawToCanvas(bitmap, rect, width, height, format) {
  if (typeof OffscreenCanvas === "undefined") {
    throw makeError("UNSUPPORTED_BROWSER");
  }
  let canvas;
  try {
    canvas = new OffscreenCanvas(width, height);
  } catch {
    throw makeError("CANVAS_FAILED");
  }
  const ctx = canvas.getContext("2d", { alpha: format !== "image/jpeg" });
  if (!ctx) throw makeError("CANVAS_FAILED");
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  if (format === "image/jpeg") {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);
  }
  ctx.drawImage(bitmap, rect.sx, rect.sy, rect.sw, rect.sh, 0, 0, width, height);
  return canvas;
}

async function encodeCanvas(canvas, format, quality) {
  let blob;
  try {
    blob = await canvas.convertToBlob({ type: format, quality });
  } catch {
    throw makeError("ENCODE_FAILED");
  }
  if (!blob || blob.size === 0) throw makeError("ENCODE_FAILED");
  if (format !== "image/png" && blob.type !== format) {
    throw makeError("UNSUPPORTED_FORMAT");
  }
  return blob;
}

async function processImage(id, file, options) {
  if (typeof OffscreenCanvas === "undefined") {
    throw makeError("UNSUPPORTED_BROWSER");
  }

  const startedAt = Date.now();
  postProgress(id, { stage: "decode" });
  const bitmap = await decodeBitmap(file);

  try {
    const sourceWidth = bitmap.width;
    const sourceHeight = bitmap.height;
    if (!sourceWidth || !sourceHeight) throw makeError("IMAGE_DECODE");

    const format = resolveFormat(options, file.type);
    const rect = getSourceRect(bitmap, options.crop);
    const requestedTarget =
      Number.isFinite(options.targetBytes) && options.targetBytes > 0
        ? Math.floor(options.targetBytes)
        : null;
    const fixedQuality = Number.isFinite(options.quality)
      ? clamp(options.quality, 0.05, 1)
      : 0.8;

    let dims = computeDimensions(rect, options);
    let attempts = 0;
    let best = null;
    let targetMet = requestedTarget === null ? null : false;

    if (requestedTarget === null) {
      postProgress(id, { stage: "encode" });
      attempts = 1;
      const canvas = drawToCanvas(bitmap, rect, dims.width, dims.height, format);
      const blob = await encodeCanvas(
        canvas,
        format,
        format === "image/png" ? undefined : fixedQuality
      );
      best = {
        blob,
        width: dims.width,
        height: dims.height,
        quality: format === "image/png" ? null : fixedQuality,
      };
    } else {
      for (let attempt = 0; attempt < 6; attempt += 1) {
        attempts = attempt + 1;
        const canvas = drawToCanvas(bitmap, rect, dims.width, dims.height, format);

        if (format === "image/png") {
          postProgress(id, {
            stage: "search",
            attempt: attempts,
            quality: null,
            width: dims.width,
            height: dims.height,
          });
          const blob = await encodeCanvas(canvas, format, undefined);
          if (!best || blob.size < best.blob.size) {
            best = {
              blob,
              width: dims.width,
              height: dims.height,
              quality: null,
            };
          }
          if (blob.size <= requestedTarget) {
            targetMet = true;
            break;
          }
          if (dims.width <= MIN_DIMENSION || dims.height <= MIN_DIMENSION) break;
          const ratio = Math.sqrt(requestedTarget / blob.size) * 0.95;
          const factor = clamp(ratio, 0.5, 0.9);
          dims = {
            width: Math.max(MIN_DIMENSION, Math.round(dims.width * factor)),
            height: Math.max(MIN_DIMENSION, Math.round(dims.height * factor)),
          };
          continue;
        }

        let low = 0.1;
        let high = 0.95;
        let bestUnderTarget = null;
        let smallest = null;

        for (let step = 0; step < 6; step += 1) {
          const quality = (low + high) / 2;
          postProgress(id, {
            stage: "search",
            attempt: attempts,
            quality,
            width: dims.width,
            height: dims.height,
          });
          const blob = await encodeCanvas(canvas, format, quality);
          if (!smallest || blob.size < smallest.blob.size) {
            smallest = { blob, quality };
          }
          if (blob.size <= requestedTarget) {
            bestUnderTarget = { blob, quality };
            low = quality;
          } else {
            high = quality;
          }
        }

        const chosen = bestUnderTarget || smallest;
        if (chosen && (!best || chosen.blob.size < best.blob.size)) {
          best = {
            blob: chosen.blob,
            width: dims.width,
            height: dims.height,
            quality: chosen.quality,
          };
        }

        if (bestUnderTarget) {
          targetMet = true;
          break;
        }

        if (!smallest) break;
        if (dims.width <= MIN_DIMENSION || dims.height <= MIN_DIMENSION) break;
        const ratio = Math.sqrt(requestedTarget / smallest.blob.size) * 0.95;
        const factor = clamp(ratio, 0.5, 0.88);
        dims = {
          width: Math.max(MIN_DIMENSION, Math.round(dims.width * factor)),
          height: Math.max(MIN_DIMENSION, Math.round(dims.height * factor)),
        };
      }
    }

    if (!best) throw makeError("PROCESS_FAILED");

    return {
      blob: best.blob,
      width: best.width,
      height: best.height,
      sourceWidth,
      sourceHeight,
      format,
      quality: best.quality,
      originalSize: file.size,
      targetBytes: requestedTarget,
      targetMet,
      resized: best.width !== sourceWidth || best.height !== sourceHeight,
      attempts,
      durationMs: Date.now() - startedAt,
    };
  } finally {
    if (bitmap && typeof bitmap.close === "function") bitmap.close();
  }
}
