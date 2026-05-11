/**
 * Copyright 2025 flt/ui. All rights reserved.
 *
 * This file is Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { usePaginationRange } from "@flt-ui/react-use-pagination-range";

import { usePaginationContext } from "./pagination";

import type * as React from "react";
import type { Scope } from "@flt-ui/react-context-scope";

const OWNER_NAME = "Pagination.Items";

type ScopedProps<P> = P & {
  __scopePagination?: Scope;
};

type FC<P> = (props: P) => React.ReactNode;

type PaginationItem = {
  type: "page" | "ellipsis";
  value: number;
};

type PrimitiveProps = {
  children: (items: PaginationItem[]) => React.ReactNode;
};

type PaginationItemsProps = PrimitiveProps & {};

type PaginationItemsFC = FC<PaginationItemsProps> & {
  __ownerName?: string;
};

function createPaginationItems(ownerName: string): PaginationItemsFC {
  let disabled = Object.freeze({
    showFirst: false,
    showLast: false,
    hideNext: true,
    hidePrevious: true,
    hideEllipsis: false,
  } as const);

  const PaginationItems = ((
    props: ScopedProps<PaginationItemsProps>,
  ): React.JSX.Element => {
    let { children } = props;

    let {
      value: currentPage,
      count: totalPages,
      boundaryCount,
      siblingCount,
    } = usePaginationContext(OWNER_NAME, props.__scopePagination);

    let items = usePaginationRange({
      currentPage,
      totalPages,
      boundaryCount,
      siblingCount,
      ...disabled,
    }) as PaginationItem[];

    return <>{children(items)}</>;
  }) as PaginationItemsFC;

  PaginationItems.__ownerName = ownerName;

  return PaginationItems;
}

const PaginationItems: PaginationItemsFC = createPaginationItems(OWNER_NAME);

export { PaginationItems, PaginationItems as Items };
export type { PaginationItemsProps };

export { createPaginationItems };
export type { PaginationItemsFC };
