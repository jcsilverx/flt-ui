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

import { Primitive } from "@flt-ui/react-primitive";

import type * as React from "react";
import type { Scope } from "@flt-ui/react-context-scope";
import type { PrimitiveProps } from "@flt-ui/react-primitive";

const OWNER_NAME = "Pagination.Ellipsis";

type ScopedProps<P> = P & {
  __scopePagination?: Scope;
};

type FC<P> = (props: P) => React.ReactNode;

type PaginationEllipsisProps = PrimitiveProps<"span"> & {};

type PaginationEllipsisFC = FC<PaginationEllipsisProps> & {
  __ownerName?: string;
};

function createPaginationEllipsis(ownerName: string): PaginationEllipsisFC {
  const PaginationEllipsis = ((
    props: ScopedProps<PaginationEllipsisProps>,
  ): React.JSX.Element => {
    let { ref, ...rest } = props;

    return <Primitive.span {...rest} aria-hidden={true} ref={ref} />;
  }) as PaginationEllipsisFC;

  PaginationEllipsis.__ownerName = ownerName;

  return PaginationEllipsis;
}

const PaginationEllipsis: PaginationEllipsisFC =
  createPaginationEllipsis(OWNER_NAME);

export { PaginationEllipsis, PaginationEllipsis as Ellipsis };
export type { PaginationEllipsisProps };

export { createPaginationEllipsis };
export type { PaginationEllipsisFC };
