import type { PaginationItem } from "./types";

const ellipsis = (pageNumber: number): PaginationItem => ({
  active: false,
  type: "ellipsis",
  value: pageNumber,
});

const first = (): PaginationItem => ({
  active: false,
  type: "first",
  value: 1,
});

const last = (totalPages: number): PaginationItem => ({
  active: false,
  type: "last",
  value: totalPages,
});

const prev = (currentPage: number): PaginationItem => ({
  active: false,
  type: "prev",
  value: Math.max(1, currentPage - 1),
});

const next = (currentPage: number, totalPages: number): PaginationItem => ({
  active: false,
  type: "next",
  value: Math.min(currentPage + 1, totalPages),
});

const init =
  (currentPage: number) =>
  (pageNumber: number): PaginationItem => ({
    active: currentPage === pageNumber,
    type: "page",
    value: pageNumber,
  });

const create = {
  init,
  first,
  last,
  prev,
  next,
  ellipsis,
};

export { create };
