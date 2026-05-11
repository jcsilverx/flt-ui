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

const OWNER_NAME = "Pagination.Last";

type ScopedProps<P> = P & {
  __scopePagination?: Scope;
};

type FC<P> = (props: P) => React.ReactNode;

type PaginationLastProps = PrimitiveProps<"a"> & {};

type PaginationLastFC = FC<PaginationLastProps> & {
  __ownerName?: string;
};

function createPaginationLast(ownerName: string): PaginationLastFC {
  const PaginationLast = ((
    props: ScopedProps<PaginationLastProps>,
  ): React.JSX.Element => {
    let { ref, ...rest } = props;

    let context = usePaginationContext(OWNER_NAME, props.__scopePagination);
    let itemContext = usePaginationItemContext(
      OWNER_NAME,
      props.__scopePagination,
    );

    let disabled =
      (itemContext.disabled ?? context.value === context.count) || undefined;

    const handleClick = useComposedEvent(props.onClick, (): void => {
      if (disabled) {
        return /** UNUSED */;
      }

      context.onLastChange();

      return /** UNUSED */;
    });

    return (
      <Primitive.a
        {...rest}
        ref={ref}
        aria-label="Go to last page"
        aria-disabled={disabled}
        data-flt-disabled={disabled}
        onClick={handleClick}
      />
    );
  }) as PaginationLastFC;

  PaginationLast.__ownerName = ownerName;

  return PaginationLast;
}

const PaginationLast: PaginationLastFC = createPaginationLast(OWNER_NAME);

export { PaginationLast, PaginationLast as Last };
export type { PaginationLastProps };

export { createPaginationLast };
export type { PaginationLastFC };
