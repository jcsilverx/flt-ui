import * as FLT from "../src/index";

const EXPECTED_EXPORTS = [
  "Pagination",
  "Root",
  "createPagination",
  "createPaginationScope",

  "PaginationList",
  "List",
  "createPaginationList",

  "PaginationItem",
  "Item",
  "createPaginationItem",

  "PaginationFirst",
  "First",
  "createPaginationFirst",

  "PaginationPrev",
  "Prev",
  "createPaginationPrev",

  "PaginationLink",
  "Link",
  "createPaginationLink",

  "PaginationNext",
  "Next",
  "createPaginationNext",

  "PaginationLast",
  "Last",
  "createPaginationLast",

  "PaginationEllipsis",
  "Ellipsis",
  "createPaginationEllipsis",
] as const;

it("should expose the appropriate `Pagination` components", (): void => {
  let output = Object.keys(FLT);

  expect(output).toEqual(EXPECTED_EXPORTS);
});
