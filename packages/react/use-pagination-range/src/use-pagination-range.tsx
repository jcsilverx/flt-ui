import { create } from "./helpers";
import { range } from "./range";

import type { PaginationItem } from "./types";

type PaginationRangeProps = {
  /**
   * The current page number.
   *
   * @default —
   */
  currentPage: number;
  /**
   * The total number of pages.
   *
   * @default —
   */
  totalPages: number;
  /**
   * The number of boundary pages to show at the beginning and
   * end of the pagination.
   *
   * @default 1
   */
  boundaryCount?: number;
  /**
   * The number of sibling pages to show around the current page.
   *
   * @default 1
   */
  siblingCount?: number;
  /**
   * If true, show the first-page button.
   *
   * @default false
   */
  showFirst?: boolean;
  /**
   * If true, show the last-page button.
   *
   * @default false
   */
  showLast?: boolean;
  /**
   * If true, hide the next-page button.
   *
   * @default false
   */
  hideNext?: boolean;
  /**
   * If true, hide the previous-page button.
   *
   * @default false
   */
  hidePrevious?: boolean;
  /**
   * If true, hide the ellipsis.
   *
   * @default false
   */
  hideEllipsis?: boolean;
};

type PaginationRangeReturn = PaginationItem[];

function usePaginationRange(
  props: PaginationRangeProps,
): PaginationRangeReturn {
  let {
    currentPage,
    totalPages,
    boundaryCount = 1,
    siblingCount = 1,
    showFirst = false,
    showLast = false,
    hidePrevious = false,
    hideNext = false,
    hideEllipsis = false,
  } = props;

  let pageItem = create.init(currentPage);
  let first = range(1, Math.min(boundaryCount, totalPages), pageItem);
  let last = range(
    Math.max(totalPages + 1 - boundaryCount, boundaryCount + 1),
    totalPages,
    pageItem,
  );

  let start = Math.max(
    Math.min(
      currentPage - siblingCount,
      totalPages - boundaryCount - siblingCount * 2 - 1,
    ),
    boundaryCount + 2,
  );
  let end = Math.min(
    Math.max(currentPage + siblingCount, boundaryCount + siblingCount * 2 + 2),
    totalPages - boundaryCount - 1,
  );

  let showLeftEllipsis = start > boundaryCount + 2;
  let showRightEllipsis = end < totalPages - boundaryCount - 1;

  let middle = [
    ...first,
    ...(!hideEllipsis && showLeftEllipsis
      ? [create.ellipsis(boundaryCount + 1)]
      : boundaryCount + 1 < totalPages - boundaryCount
        ? [pageItem(boundaryCount + 1)]
        : []),
    ...range(start, end, pageItem),
    ...(!hideEllipsis && showRightEllipsis
      ? [create.ellipsis(totalPages - boundaryCount)]
      : totalPages - boundaryCount > boundaryCount
        ? [pageItem(totalPages - boundaryCount)]
        : []),
    ...last,
  ];

  return [
    ...(showFirst ? [create.first()] : []),
    ...(!hidePrevious ? [create.prev(currentPage)] : []),
    ...middle,
    ...(!hideNext ? [create.next(currentPage, totalPages)] : []),
    ...(showLast ? [create.last(totalPages)] : []),
  ];
}

export { usePaginationRange };
export type { PaginationRangeProps, PaginationRangeReturn };
