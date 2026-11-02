import { describe, expect, it } from "vitest";
import {
  parseSizeToBytes,
  formatBytes,
  savingsPercent,
  unitMultiplier,
  SIZE_PRESETS,
} from "@/lib/size";

describe("parseSizeToBytes", () => {
  it("parses KB targets", () => {
    expect(parseSizeToBytes("100", "KB")).toBe(102400);
    expect(parseSizeToBytes(100, "KB")).toBe(102400);
  });

  it("parses MB targets", () => {
    expect(parseSizeToBytes("1", "MB")).toBe(1048576);
    expect(parseSizeToBytes("1.5", "MB")).toBe(1572864);
  });

  it("accepts decimal commas", () => {
    expect(parseSizeToBytes("99,5", "KB")).toBe(101888);
  });

  it("rejects invalid or non-positive values", () => {
    expect(parseSizeToBytes("", "KB")).toBeNull();
    expect(parseSizeToBytes("abc", "KB")).toBeNull();
    expect(parseSizeToBytes("0", "MB")).toBeNull();
    expect(parseSizeToBytes("-5", "KB")).toBeNull();
    expect(parseSizeToBytes("1.2.3", "MB")).toBeNull();
  });

  it("uses 1024-based units", () => {
    expect(unitMultiplier("KB")).toBe(1024);
    expect(unitMultiplier("MB")).toBe(1024 * 1024);
  });
});

describe("SIZE_PRESETS", () => {
  it("is sorted ascending and covers 50 KB to 2 MB", () => {
    const sizes = SIZE_PRESETS.map((preset) => preset.bytes);
    expect(sizes).toEqual([...sizes].sort((a, b) => a - b));
    expect(sizes[0]).toBe(50 * 1024);
    expect(sizes.at(-1)).toBe(2 * 1024 * 1024);
  });
});

describe("formatBytes", () => {
  it("formats bytes and kilobytes", () => {
    expect(formatBytes(512, "en")).toBe("512 B");
    expect(formatBytes(1536, "en")).toBe("1.5 KB");
  });

  it("formats megabytes", () => {
    expect(formatBytes(2 * 1024 * 1024, "en")).toBe("2 MB");
  });

  it("returns a dash for invalid values", () => {
    expect(formatBytes(-1)).toBe("—");
    expect(formatBytes(Number.NaN)).toBe("—");
  });
});

describe("savingsPercent", () => {
  it("calculates the saved percentage", () => {
    expect(savingsPercent(1000, 250)).toBe(75);
    expect(savingsPercent(1000, 1000)).toBe(0);
  });

  it("returns 0 for invalid original sizes", () => {
    expect(savingsPercent(0, 100)).toBe(0);
    expect(savingsPercent(Number.NaN, 100)).toBe(0);
  });
});
