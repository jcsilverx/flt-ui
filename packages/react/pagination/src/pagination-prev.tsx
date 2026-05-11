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

const OWNER_NAME = "Pagination.Prev";

type ScopedProps<P> = P & {
  __scopePagination?: Scope;
};

type FC<P> = (props: P) => React.ReactNode;

type PaginationPrevProps = PrimitiveProps<"a"> & {};

type PaginationPrevFC = FC<PaginationPrevProps> & {
  __ownerName?: string;
};

function createPaginationPrev(ownerName: string): PaginationPrevFC {
  const PaginationPrev = ((
    props: ScopedProps<PaginationPrevProps>,
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

      context.onPrevChange();

      return /** UNUSED */;
    });

    return (
      <Primitive.a
        {...rest}
        ref={ref}
        aria-label="Go to previous page"
        aria-disabled={disabled}
        data-flt-disabled={disabled}
        onClick={handleClick}
      />
    );
  }) as PaginationPrevFC;

  PaginationPrev.__ownerName = ownerName;

  return PaginationPrev;
}

const PaginationPrev: PaginationPrevFC = createPaginationPrev(OWNER_NAME);

export { PaginationPrev, PaginationPrev as Prev };
export type { PaginationPrevProps };

export { createPaginationPrev };
export type { PaginationPrevFC };
