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

const OWNER_NAME = "Pagination.List";

type ScopedProps<P> = P & {
  __scopePagination?: Scope;
};

type FC<P> = (props: P) => React.ReactNode;

type PaginationListProps = PrimitiveProps<"ul"> & {};

type PaginationListFC = FC<PaginationListProps> & {
  __ownerName?: string;
};

function createPaginationList(ownerName: string): PaginationListFC {
  const PaginationList = ((
    props: ScopedProps<PaginationListProps>,
  ): React.JSX.Element => {
    let { ref, ...rest } = props;

    return <Primitive.ul {...rest} ref={ref} />;
  }) as PaginationListFC;

  PaginationList.__ownerName = ownerName;

  return PaginationList;
}

const PaginationList: PaginationListFC = createPaginationList(OWNER_NAME);

export { PaginationList, PaginationList as List };
export type { PaginationListProps };

export { createPaginationList };
export type { PaginationListFC };
