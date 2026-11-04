/**
 * Target-size search helpers.
 * Pure module: no DOM, no canvas, so the search policy is unit-testable.
 * Core rule everywhere: a candidate is only accepted when it is at or under the
 * target. Refinement chases the target from below and never overshoots it.
 */

/** Accept a result that lands within this fraction under the target (4% ≈ the 3–5% band). */
export const TARGET_TOLERANCE = 0.04;

/** Normalised axis resolution: stop refining once candidates are closer than this. */
export const TARGET_MIN_GAP = 0.04;

export type Sized = { size: number };

export type RefineStep = {
  t: number;
  size: number;
  accepted: boolean;
};

export type RefineResult<P, R extends Sized> = {
  candidate: P;
  value: R;
  t: number;
  steps: number;
  probed: RefineStep[];
  withinTolerance: boolean;
  stoppedEarly: boolean;
};

export function clampNumber(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * True when `size` fits under `target` while still using most of the budget.
 * Zero, negative, and non-finite values never count as close.
 */
export function isCloseToTarget(
  size: number,
  target: number,
  tolerance = TARGET_TOLERANCE
): boolean {
  if (!Number.isFinite(size) || size <= 0) return false;
  if (!Number.isFinite(target) || target <= 0) return false;
  return size <= target && size >= target * (1 - tolerance);
}

/**
 * Binary search on a normalised axis where t = 0 is a candidate already known to
 * fit the target and t = 1 is a more aggressive candidate expected to exceed it.
 * Size must grow monotonically with t; if the aspiration also fits, the search
 * simply converges to it.
 *
 * Bounded by `maxSteps` and an optional `deadlineAt` so a phone never gets stuck
 * in an open-ended refinement loop.
 */
export async function refineUnderTarget<P, R extends Sized>(input: {
  target: number;
  known: { candidate: P; value: R };
  aspiration: P;
  mix: (t: number) => P;
  probe: (candidate: P) => Promise<R>;
  tolerance?: number;
  maxSteps?: number;
  minGap?: number;
  deadlineAt?: number;
  now?: () => number;
  /** Extra affordability check per step, e.g. "is another full pass still cheap enough". */
  canContinue?: () => boolean;
}): Promise<RefineResult<P, R>> {
  const tolerance = input.tolerance ?? TARGET_TOLERANCE;
  const maxSteps = input.maxSteps ?? 5;
  const minGap = input.minGap ?? TARGET_MIN_GAP;
  const now = input.now ?? ((): number => Date.now());

  let best = { candidate: input.known.candidate, value: input.known.value, t: 0 };
  let lo = 0;
  let hi = 1;
  let steps = 0;
  let withinTolerance = isCloseToTarget(best.value.size, input.target, tolerance);
  let stoppedEarly = false;
  const probed: RefineStep[] = [];

  if (!withinTolerance) {
    for (let step = 0; step < maxSteps; step += 1) {
      if (hi - lo <= minGap) break;
      if (input.canContinue && !input.canContinue()) {
        stoppedEarly = true;
        break;
      }
      if (input.deadlineAt !== undefined && now() >= input.deadlineAt) {
        stoppedEarly = true;
        break;
      }
      const mid = (lo + hi) / 2;
      const candidate = input.mix(mid);
      const value = await input.probe(candidate);
      steps += 1;
      const accepted = value.size <= input.target;
      probed.push({ t: mid, size: value.size, accepted });
      if (accepted) {
        best = { candidate, value, t: mid };
        lo = mid;
        if (isCloseToTarget(value.size, input.target, tolerance)) {
          withinTolerance = true;
          break;
        }
      } else {
        hi = mid;
      }
    }
  }

  return {
    ...best,
    steps,
    probed,
    withinTolerance,
    stoppedEarly,
  };
}

/**
 * Bytes a single page may use so the whole document still fits the target.
 * Splits what is left over the remaining pages, so a page that underspends
 * automatically leaves more room for the pages behind it.
 */
export function pageAllowance(input: {
  targetBytes: number;
  overheadBytes: number;
  usedBytes: number;
  pageIndex: number;
  pageCount: number;
}): number {
  const pagesLeft = Math.max(1, input.pageCount - input.pageIndex);
  const left = input.targetBytes - input.overheadBytes - input.usedBytes;
  return Math.max(0, Math.floor(left / pagesLeft));
}

/**
 * Quality ceiling for one page: never above `maxQuality`, and only raised when
 * the page still has headroom against its allowance.
 */
export function canRaisePageQuality(input: {
  pageSize: number;
  allowance: number;
  quality: number;
  maxQuality: number;
  step?: number;
}): boolean {
  const minStep = input.step ?? 0.03;
  if (input.quality >= input.maxQuality - 0.001) return false;
  if (input.allowance <= 0) return false;
  return input.pageSize <= input.allowance * (1 - minStep);
}

/** Linear blend used to walk between two search candidates. */
export function mixNumber(from: number, to: number, t: number): number {
  return from + (to - from) * t;
}
