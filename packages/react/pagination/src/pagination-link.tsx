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

import { getState, usePaginationContext } from "./pagination";
import { usePaginationItemContext, useValueContext } from "./pagination-item";

import type * as React from "react";
import type { Scope } from "@flt-ui/react-context-scope";
import type { PrimitiveProps } from "@flt-ui/react-primitive";

const OWNER_NAME = "Pagination.Link";
const ERROR_MESSAGE =
  `It seems that you're trying to use a 'PaginationLink' component within a 'PaginationItem'.` +
  ` However, the 'PaginationItem' wrapping your 'PaginationLink' is missing the required 'type' property.`;

type ScopedProps<P> = P & {
  __scopePagination?: Scope;
};

type FC<P> = (props: P) => React.ReactNode;

type PaginationLinkProps = PrimitiveProps<"a"> & {};

type PaginationLinkFC = FC<PaginationLinkProps> & {
  __ownerName?: string;
};

function createPaginationLink(ownerName: string): PaginationLinkFC {
  const PaginationLink = ((
    props: ScopedProps<PaginationLinkProps>,
  ): React.JSX.Element => {
    let { ref, ...rest } = props;

    let context = usePaginationContext(OWNER_NAME, props.__scopePagination);
    let itemContext = usePaginationItemContext(
      OWNER_NAME,
      props.__scopePagination,
    );
    let valueContext = useValueContext(OWNER_NAME, props.__scopePagination, {
      errorMessage: ERROR_MESSAGE,
    });

    let active = valueContext.value === context.value;

    const handleClick = useComposedEvent(props.onClick, (): void => {
      if (itemContext.disabled) {
        return /** UNUSED */;
      }

      context.onSelectChange(valueContext.value);

      return /** UNUSED */;
    });

    return (
      <Primitive.a
        {...rest}
        ref={ref}
        aria-current={getAriaCurrent(active)}
        aria-disabled={itemContext.disabled}
        aria-label={`page ${valueContext.value} of ${context.count}`}
        data-flt-state={getState(active)}
        data-flt-disabled={itemContext.disabled}
        onClick={handleClick}
      />
    );
  }) as PaginationLinkFC;

  PaginationLink.__ownerName = ownerName;

  return PaginationLink;
}

const PaginationLink: PaginationLinkFC = createPaginationLink(OWNER_NAME);

const getAriaCurrent = (active: boolean): "page" | undefined => {
  return active ? "page" : undefined;
};

export { PaginationLink, PaginationLink as Link };
export type { PaginationLinkProps };

export { createPaginationLink };
export type { PaginationLinkFC };
