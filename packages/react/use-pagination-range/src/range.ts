import type { PaginationItem } from "./types";

const __range = (start: number, end?: number, step = 1): number[] => {
  let stop = end ?? start;

  if (end === undefined) {
    start = 0;
  }

  let len = Math.max(Math.ceil((stop - start) / (step | 1)), 0);
  let R: number[] = new Array<number>(len);
  let k = 0;

  while (k < len) {
    R[k] = start;
    start += step;
    ++k;
  }
  return R;
};

const __map = <T, U>(
  a: readonly T[],
  callbackFn: (value: T, index: number) => U,
): U[] => {
  let len = a.length >>> 0;

  if (typeof callbackFn !== "function") {
    throw new TypeError("Callback must be a function");
  }

  let R: U[] = new Array<U>(len);
  let k = 0;

  while (k < len) {
    let E = a[k];

    R[k] = callbackFn(E, k);
    ++k;
  }
  return R;
};

type PageItem = (pageNumber: number) => PaginationItem;

const range = (
  start: number,
  end: number,
  pageItem: PageItem,
): PaginationItem[] => __map(__range(start, end + 1), pageItem);

export { range };
