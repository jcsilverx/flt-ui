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
import { usePagination } from "@flt-ui/react-use-pagination";
import { createContextScope } from "@flt-ui/react-context-scope";

import type * as React from "react";
import type { Scope } from "@flt-ui/react-context-scope";
import type { Omit, PrimitiveProps } from "@flt-ui/react-primitive";

const OWNER_NAME = "Pagination";

type ScopedProps<P> = P & {
  __scopePagination?: Scope;
};

const [createPaginationContext, createPaginationScope] =
  createContextScope(OWNER_NAME);

type PaginationContextValue = {
  value: number;
  count: number;
  boundaryCount: number;
  siblingCount: number;
  onFirstChange: () => void;
  onLastChange: () => void;
  onPrevChange: () => void;
  onNextChange: () => void;
  onSelectChange: (value: number) => void;
};

const [PaginationContext, usePaginationContext] =
  createPaginationContext<PaginationContextValue>(OWNER_NAME);

type PaginationState = "active" | undefined;

type FC<P> = (props: P) => React.ReactNode;

type PaginationProps = Omit<PrimitiveProps<"nav">, "defaultValue"> & {
  value?: number;
  defaultValue?: number;
  onValueChange?: (value: number) => void;
  count: number;
  boundaryCount?: number;
  siblingCount?: number;
};

type PaginationFC = FC<PaginationProps> & {
  __ownerName?: string;
};

function createPagination(ownerName: string): PaginationFC {
  const Pagination = ((
    props: ScopedProps<PaginationProps>,
  ): React.JSX.Element => {
    let {
      ref,
      value: _value,
      defaultValue: _defaultValue,
      onValueChange: _onValueChange,
      boundaryCount = 1,
      siblingCount = 1,
      count,
      ...rest
    } = props;

    let {
      value,
      onFirstChange,
      onLastChange,
      onPrevChange,
      onNextChange,
      onSelectChange,
    } = usePagination({
      value: _value,
      onValueChange: _onValueChange,
      defaultValue: _defaultValue,
      totalPages: count,
      caller: ownerName,
    });

    return (
      <PaginationContext.Provider
        scope={props.__scopePagination}
        value={value}
        count={count}
        onFirstChange={onFirstChange}
        onLastChange={onLastChange}
        onPrevChange={onPrevChange}
        onNextChange={onNextChange}
        onSelectChange={onSelectChange}
        boundaryCount={boundaryCount}
        siblingCount={siblingCount}
      >
        <Primitive.nav
          {...rest}
          ref={ref}
          role="navigation"
          aria-label="Pagination"
        />
      </PaginationContext.Provider>
    );
  }) as PaginationFC;

  Pagination.__ownerName = ownerName;

  return Pagination;
}

const Pagination: PaginationFC = createPagination(OWNER_NAME);

const getState = (active: boolean): PaginationState => {
  return active ? "active" : undefined;
};

export { Pagination, Pagination as Root };
export type { PaginationProps };

export { createPagination, getState };
export type { PaginationFC };

export { createPaginationContext, createPaginationScope, usePaginationContext };
