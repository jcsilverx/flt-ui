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
import { useComposedEvent } from "@flt-ui/react-use-event";

import { usePaginationContext } from "./pagination";
import { usePaginationItemContext } from "./pagination-item";

import type * as React from "react";
import type { Scope } from "@flt-ui/react-context-scope";
import type { PrimitiveProps } from "@flt-ui/react-primitive";

const OWNER_NAME = "Pagination.First";

type ScopedProps<P> = P & {
  __scopePagination?: Scope;
};

type FC<P> = (props: P) => React.ReactNode;

type PaginationFirstProps = PrimitiveProps<"a"> & {};

type PaginationFirstFC = FC<PaginationFirstProps> & {
  __ownerName?: string;
};

function createPaginationFirst(ownerName: string): PaginationFirstFC {
  const PaginationFirst = ((
    props: ScopedProps<PaginationFirstProps>,
  ): React.JSX.Element => {
    let { ref, ...rest } = props;

    let context = usePaginationContext(OWNER_NAME, props.__scopePagination);
    let itemContext = usePaginationItemContext(
      OWNER_NAME,
      props.__scopePagination,
    );

    let disabled = (itemContext.disabled ?? context.value === 1) || undefined;

    const handleClick = useComposedEvent(props.onClick, (): void => {
      if (disabled) {
        return /** UNUSED */;
      }

      context.onFirstChange();

      return /** UNUSED */;
    });

    return (
      <Primitive.a
        {...rest}
        ref={ref}
        aria-label="Go to first page"
        aria-disabled={disabled}
        data-flt-disabled={disabled}
        onClick={handleClick}
      />
    );
  }) as PaginationFirstFC;

  PaginationFirst.__ownerName = ownerName;

  return PaginationFirst;
}

const PaginationFirst: PaginationFirstFC = createPaginationFirst(OWNER_NAME);

export { PaginationFirst, PaginationFirst as First };
export type { PaginationFirstProps };

export { createPaginationFirst };
export type { PaginationFirstFC };
