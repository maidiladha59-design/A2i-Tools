import { describe, expect, it } from "vitest";
import {
  TARGET_TOLERANCE,
  canRaisePageQuality,
  isCloseToTarget,
  mixNumber,
  pageAllowance,
  refineUnderTarget,
} from "@/lib/target-search";
import { reduceStrategyAt } from "@/lib/pdf/client";

const KB = 1024;

describe("isCloseToTarget", () => {
  it("rejects a result that wasted 10% of the budget", () => {
    // The reported bug: 800 KB target producing 718 KB.
    expect(isCloseToTarget(Math.round(700 * KB), 800 * KB)).toBe(false);
  });

  it("accepts results inside the 3-5% band under the target", () => {
    expect(isCloseToTarget(Math.round(770 * KB), 800 * KB)).toBe(true);
    expect(isCloseToTarget(Math.round(785 * KB), 800 * KB)).toBe(true);
    expect(isCloseToTarget(Math.round(799 * KB), 800 * KB)).toBe(true);
  });

  it("never accepts a result above the target", () => {
    expect(isCloseToTarget(801 * KB, 800 * KB)).toBe(false);
  });

  it("ignores empty or invalid sizes", () => {
    expect(isCloseToTarget(0, 800 * KB)).toBe(false);
    expect(isCloseToTarget(-5, 800 * KB)).toBe(false);
    expect(isCloseToTarget(NaN, 800 * KB)).toBe(false);
    expect(isCloseToTarget(500 * KB, 0)).toBe(false);
  });
});

describe("refineUnderTarget", () => {
  it("stops immediately when the known candidate already sits in the band", async () => {
    let probes = 0;
    const result = await refineUnderTarget<number, { size: number }>({
      target: 800 * KB,
      known: { candidate: 0, value: { size: 790 * KB } },
      aspiration: 1,
      mix: (t) => t,
      probe: async (candidate) => {
        probes += 1;
        return { size: Math.round(500 * KB + candidate * 600 * KB) };
      },
    });

    expect(probes).toBe(0);
    expect(result.steps).toBe(0);
    expect(result.withinTolerance).toBe(true);
    expect(result.candidate).toBe(0);
  });

  it("keeps bisecting until the result is within tolerance", async () => {
    // Size grows linearly with the candidate and crosses 800 KB at candidate 0.5.
    const model = (candidate: number) =>
      Math.round(500 * KB + candidate * 600 * KB);
    const result = await refineUnderTarget<number, { size: number }>({
      target: 800 * KB,
      known: { candidate: 0, value: { size: model(0) } },
      aspiration: 1,
      mix: (t) => t,
      probe: async (candidate) => ({ size: model(candidate) }),
    });

    expect(result.value.size).toBeLessThanOrEqual(800 * KB);
    expect(result.withinTolerance).toBe(true);
    expect(result.steps).toBeLessThanOrEqual(5);
  });

  it("never returns a candidate above the target on a sharp size cliff", async () => {
    const cliff = 0.3;
    const model = (candidate: number) =>
      candidate <= cliff ? 700 * KB : 950 * KB;
    const result = await refineUnderTarget<number, { size: number }>({
      target: 800 * KB,
      known: { candidate: 0, value: { size: model(0) } },
      aspiration: 1,
      mix: (t) => t,
      probe: async (candidate) => ({ size: model(candidate) }),
      maxSteps: 5,
      minGap: 0.05,
    });

    expect(result.value.size).toBeLessThanOrEqual(800 * KB);
    expect(result.candidate).toBeLessThanOrEqual(cliff);
    expect(result.withinTolerance).toBe(false);
  });

  it("respects the step budget", async () => {
    let probes = 0;
    const model = (candidate: number) =>
      Math.round(500 * KB + candidate * 299 * KB); // never reaches the band
    const result = await refineUnderTarget<number, { size: number }>({
      target: 800 * KB,
      known: { candidate: 0, value: { size: model(0) } },
      aspiration: 1,
      mix: (t) => t,
      probe: async (candidate) => {
        probes += 1;
        return { size: model(candidate) };
      },
      maxSteps: 3,
    });

    expect(probes).toBe(3);
    expect(result.steps).toBe(3);
    expect(result.value.size).toBeLessThanOrEqual(800 * KB);
  });

  it("gives up when the deadline passes and keeps the last safe candidate", async () => {
    let clock = 1_000;
    const result = await refineUnderTarget<number, { size: number }>({
      target: 800 * KB,
      known: { candidate: 0, value: { size: 400 * KB } },
      aspiration: 1,
      mix: (t) => t,
      probe: async (candidate) => {
        clock += 5_000;
        return { size: Math.round(500 * KB + candidate * 299 * KB) };
      },
      deadlineAt: 2_000,
      now: () => clock,
    });

    expect(result.steps).toBe(1);
    expect(result.stoppedEarly).toBe(true);
    expect(result.value.size).toBeLessThanOrEqual(800 * KB);
  });

  it("stops at the first candidate that reaches the band", async () => {
    const result = await refineUnderTarget<number, { size: number }>({
      target: 800 * KB,
      known: { candidate: 0, value: { size: 100 * KB } },
      aspiration: 1,
      mix: (t) => t,
      probe: async () => ({ size: 795 * KB }),
      maxSteps: 5,
    });

    expect(result.candidate).toBe(0.5);
    expect(result.steps).toBe(1);
    expect(result.withinTolerance).toBe(true);
  });

  it("stops when the affordability check fails", async () => {
    let probes = 0;
    const result = await refineUnderTarget<number, { size: number }>({
      target: 800 * KB,
      known: { candidate: 0, value: { size: 100 * KB } },
      aspiration: 1,
      mix: (t) => t,
      probe: async (candidate) => {
        probes += 1;
        return { size: Math.round(500 * KB + candidate * 299 * KB) };
      },
      maxSteps: 5,
      canContinue: () => probes < 2,
    });

    expect(probes).toBe(2);
    expect(result.stoppedEarly).toBe(true);
    expect(result.value.size).toBeLessThanOrEqual(800 * KB);
  });

  it("keeps the value object that belongs to the winning candidate", async () => {
    const result = await refineUnderTarget<number, { size: number; tag: string }>(
      {
        target: 800 * KB,
        known: { candidate: 0, value: { size: 100 * KB, tag: "base" } },
        aspiration: 1,
        mix: (t) => t,
        probe: async (candidate) => ({
          size: Math.round(500 * KB + candidate * 600 * KB),
          tag: candidate <= 0.5 ? "under" : "over",
        }),
      }
    );

    expect(result.value.tag).toBe("under");
    expect(result.value.size).toBeLessThanOrEqual(800 * KB);
  });
});

describe("pageAllowance", () => {
  it("splits the usable budget evenly across the remaining pages", () => {
    expect(
      pageAllowance({
        targetBytes: 800 * KB,
        overheadBytes: 20 * KB,
        usedBytes: 0,
        pageIndex: 0,
        pageCount: 4,
      })
    ).toBe(195 * KB);
  });

  it("hands an underspent page's room to the pages behind it", () => {
    const first = pageAllowance({
      targetBytes: 800 * KB,
      overheadBytes: 20 * KB,
      usedBytes: 0,
      pageIndex: 0,
      pageCount: 4,
    });
    const second = pageAllowance({
      targetBytes: 800 * KB,
      overheadBytes: 20 * KB,
      usedBytes: Math.round(first * 0.5),
      pageIndex: 1,
      pageCount: 4,
    });

    expect(second).toBeGreaterThan(first);
  });

  it("floors at zero once the budget is gone", () => {
    expect(
      pageAllowance({
        targetBytes: 500 * KB,
        overheadBytes: 20 * KB,
        usedBytes: 600 * KB,
        pageIndex: 2,
        pageCount: 4,
      })
    ).toBe(0);
  });

  it("never divides by a missing page count", () => {
    expect(
      pageAllowance({
        targetBytes: 800 * KB,
        overheadBytes: 0,
        usedBytes: 0,
        pageIndex: 5,
        pageCount: 3,
      })
    ).toBe(800 * KB);
  });
});

describe("canRaisePageQuality", () => {
  it("refuses when the page has no headroom left", () => {
    expect(
      canRaisePageQuality({
        pageSize: 194 * KB,
        allowance: 195 * KB,
        quality: 0.6,
        maxQuality: 0.95,
      })
    ).toBe(false);
  });

  it("refuses when the global quality is already the ceiling", () => {
    expect(
      canRaisePageQuality({
        pageSize: 50 * KB,
        allowance: 195 * KB,
        quality: 0.95,
        maxQuality: 0.95,
      })
    ).toBe(false);
  });

  it("refuses when the allowance is empty", () => {
    expect(
      canRaisePageQuality({
        pageSize: 10 * KB,
        allowance: 0,
        quality: 0.4,
        maxQuality: 0.95,
      })
    ).toBe(false);
  });

  it("allows a raise while the page clearly underspends", () => {
    expect(
      canRaisePageQuality({
        pageSize: 90 * KB,
        allowance: 195 * KB,
        quality: 0.5,
        maxQuality: 0.95,
      })
    ).toBe(true);
  });
});

describe("reduceStrategyAt", () => {
  it("reproduces the ladder rungs exactly", () => {
    expect(reduceStrategyAt(0)).toEqual({ scale: 1.8, quality: 0.82 });
    expect(reduceStrategyAt(1)).toEqual({ scale: 1.5, quality: 0.7 });
    expect(reduceStrategyAt(6)).toEqual({ scale: 0.6, quality: 0.32 });
  });

  it("blends between rungs for fractional positions", () => {
    expect(reduceStrategyAt(0.5)).toEqual({ scale: 1.65, quality: 0.76 });
    expect(reduceStrategyAt(2.25)).toEqual({
      scale: Number(mixNumber(1.25, 1.05, 0.25).toFixed(4)),
      quality: Number(mixNumber(0.6, 0.5, 0.25).toFixed(4)),
    });
  });

  it("clamps outside positions to the ends of the ladder", () => {
    expect(reduceStrategyAt(-3)).toEqual({ scale: 1.8, quality: 0.82 });
    expect(reduceStrategyAt(99)).toEqual({ scale: 0.6, quality: 0.32 });
  });

  it("is monotonic: a higher position never produces a bigger strategy", () => {
    let previous = reduceStrategyAt(0);
    for (let position = 0.05; position <= 6.01; position += 0.05) {
      const current = reduceStrategyAt(position);
      expect(current.scale).toBeLessThanOrEqual(previous.scale + 1e-9);
      expect(current.quality).toBeLessThanOrEqual(previous.quality + 1e-9);
      previous = current;
    }
  });

  it("uses the shared tolerance band", () => {
    expect(TARGET_TOLERANCE).toBeGreaterThanOrEqual(0.03);
    expect(TARGET_TOLERANCE).toBeLessThanOrEqual(0.05);
  });
});
