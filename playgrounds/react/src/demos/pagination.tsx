"use client";

import { clsx } from "@flt-ui/clsx";
import * as Pagination from "@flt-ui/react-pagination";
import * as VisuallyHidden from "@flt-ui/react-visually-hidden";

const CLASS_NAMES = clsx(
  "white-space-nowrap inline-flex size-8 items-center justify-center rounded-md text-sm outline-none hover:bg-slate-950/5 hover:text-slate-950 focus-visible:ring-2 focus-visible:ring-slate-950/25 focus-visible:ring-offset-0",
);

function PaginationDemo(): React.JSX.Element {
  return (
    <Pagination.Root
      defaultValue={5}
      count={10}
      className={clsx("mx-auto flex w-full justify-center")}
    >
      <Pagination.List className={clsx("flex flex-row items-center gap-1")}>
        <Pagination.Item>
          <Pagination.First
            href="#"
            className={clsx(CLASS_NAMES, "gap-1 px-2.5 sm:pl-2.5")}
          >
            &#xab;
            <VisuallyHidden.Root>First</VisuallyHidden.Root>
          </Pagination.First>
        </Pagination.Item>
        <Pagination.Item>
          <Pagination.Prev
            href="#"
            className={clsx(CLASS_NAMES, "gap-1 px-2.5 sm:pl-2.5")}
          >
            &#x2039;
            <VisuallyHidden.Root>Previous</VisuallyHidden.Root>
          </Pagination.Prev>
        </Pagination.Item>

        <Pagination.Items>
          {(items): React.JSX.Element[] =>
            items.map(({ type, value }, index): React.JSX.Element => {
              if (type === "page") {
                return (
                  <Pagination.Item key={index} type={type} value={value}>
                    <Pagination.Link
                      href="#"
                      className={clsx(
                        CLASS_NAMES,
                        "data-[flt-state=active]:border  data-[flt-state=active]:border-slate-950/35",
                      )}
                    >
                      {value}
                    </Pagination.Link>
                  </Pagination.Item>
                );
              } else {
                return (
                  <Pagination.Item key={index}>
                    <Pagination.Ellipsis
                      className={clsx(
                        "flex size-9 items-center justify-center",
                      )}
                    >
                      &#x22EF;
                      <VisuallyHidden.Root>More pages</VisuallyHidden.Root>
                    </Pagination.Ellipsis>
                  </Pagination.Item>
                );
              }
            })
          }
        </Pagination.Items>

        <Pagination.Item>
          <Pagination.Next
            href="#"
            className={clsx(CLASS_NAMES, "gap-1 px-2.5 sm:pr-2.5")}
          >
            &#x203A;
            <VisuallyHidden.Root>Next</VisuallyHidden.Root>
          </Pagination.Next>
        </Pagination.Item>
        <Pagination.Item>
          <Pagination.Last
            href="#"
            className={clsx(CLASS_NAMES, "gap-1 px-2.5 sm:pr-2.5")}
          >
            &#xbb;
            <VisuallyHidden.Root>Last</VisuallyHidden.Root>
          </Pagination.Last>
        </Pagination.Item>
      </Pagination.List>
    </Pagination.Root>
  );
}

export { PaginationDemo };
