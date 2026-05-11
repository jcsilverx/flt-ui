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

import { createPaginationContext } from "./pagination";

import type * as React from "react";
import type { Scope } from "@flt-ui/react-context-scope";
import type { Omit, PrimitiveProps } from "@flt-ui/react-primitive";

const OWNER_NAME = "Pagination.Item";

type ScopedProps<P> = P & {
  __scopePagination?: Scope;
};

type FC<P> = (props: P) => React.ReactNode;

type PaginationItemBaseProps = PaginationItemImplBaseProps & {
  type?: never;
};

type PaginationItemPageProps = PaginationItemImplPageProps & {
  type?: "page";
};

type PaginationItemProps = PaginationItemBaseProps | PaginationItemPageProps;

type PaginationItemFC = FC<PaginationItemProps> & {
  __ownerName?: string;
};

function createPaginationItem(ownerName: string): PaginationItemFC {
  const PaginationItemBase: PaginationItemImplBaseFC =
    createPaginationItemImplBase(ownerName);

  const PaginationItemPage: PaginationItemImplPageFC =
    createPaginationItemImplPage(ownerName);

  const PaginationItem = ((
    props: ScopedProps<PaginationItemProps>,
  ): React.JSX.Element => {
    let { ref, type, ...rest } = props;

    if (type != null && !isPageType(type)) {
      throw new Error(
        `${ownerName}: invalid "type" prop "${type}" — if provided, "type" must be "page".`,
      );
    }

    switch (type) {
      case "page": {
        let pageProps = rest as PaginationItemImplPageProps;

        return <PaginationItemPage {...pageProps} ref={ref} />;
      }
      default: {
        let baseProps = rest as PaginationItemImplBaseProps;

        return <PaginationItemBase {...baseProps} ref={ref} />;
      }
    }
  }) as PaginationItemFC;

  PaginationItem.__ownerName = ownerName;

  return PaginationItem;
}

/**
 * PaginationItemImpl
 */
type PaginationItemImplContextValue = {
  disabled: true | undefined;
};

const [PaginationItemImplContext, usePaginationItemContext] =
  createPaginationContext<PaginationItemImplContextValue>(OWNER_NAME);

type PaginationItemImplProps = Omit<PrimitiveProps<"li">, "value"> & {
  disabled?: boolean;
};

type PaginationItemImplFC = FC<PaginationItemImplProps> & {
  __ownerName?: string;
};

function createPaginationItemImpl(ownerName: string): PaginationItemImplFC {
  const PaginationItemImpl = ((
    props: ScopedProps<PaginationItemImplProps>,
  ): React.JSX.Element => {
    let { ref, disabled: _disabled = false, ...rest } = props;

    let disabled = _disabled || undefined;

    return (
      <PaginationItemImplContext.Provider
        scope={props.__scopePagination}
        disabled={disabled}
      >
        <Primitive.li {...rest} ref={ref} />
      </PaginationItemImplContext.Provider>
    );
  }) as PaginationItemImplFC;

  PaginationItemImpl.__ownerName = ownerName;

  return PaginationItemImpl;
}

/**
 * PaginationItemImplBase
 */
type PaginationItemImplBaseProps = PaginationItemImplProps & {};

type PaginationItemImplBaseFC = FC<PaginationItemImplBaseProps> & {
  __ownerName?: string;
};

function createPaginationItemImplBase(
  ownerName: string,
): PaginationItemImplBaseFC {
  const PaginationItemImpl: PaginationItemImplFC =
    createPaginationItemImpl(ownerName);

  const PaginationItemImplBase = ((
    props: ScopedProps<PaginationItemImplBaseProps>,
  ): React.JSX.Element => {
    let { ref, ...rest } = props;

    return <PaginationItemImpl {...rest} ref={ref} />;
  }) as PaginationItemImplBaseFC;

  PaginationItemImplBase.__ownerName = ownerName;

  return PaginationItemImplBase;
}

/**
 * ValueContextValue
 */
type ValueContextValue = {
  value: number;
};

const [ValueContext, useValueContext] =
  createPaginationContext<ValueContextValue>(OWNER_NAME);

/**
 * PaginationItemImplPage
 */
type PaginationItemImplPageProps = PaginationItemImplProps & {
  value: number;
};

type PaginationItemImplPageFC = FC<PaginationItemImplPageProps> & {
  __ownerName?: string;
};

function createPaginationItemImplPage(
  ownerName: string,
): PaginationItemImplPageFC {
  const PaginationItemImpl: PaginationItemImplFC =
    createPaginationItemImpl(ownerName);

  const PaginationItemImplPage = ((
    props: ScopedProps<PaginationItemImplPageProps>,
  ): React.JSX.Element => {
    let { ref, value, ...rest } = props;

    return (
      <ValueContext.Provider scope={props.__scopePagination} value={value}>
        <PaginationItemImpl {...rest} ref={ref} />
      </ValueContext.Provider>
    );
  }) as PaginationItemImplPageFC;

  PaginationItemImplPage.__ownerName = ownerName;

  return PaginationItemImplPage;
}

const PaginationItem: PaginationItemFC = createPaginationItem(OWNER_NAME);

const isPageType = (type: unknown): type is "page" => {
  return type === "page";
};

export { PaginationItem, PaginationItem as Item };
export type { PaginationItemProps };

export { createPaginationItem };
export type { PaginationItemFC };

export { usePaginationItemContext, useValueContext };
