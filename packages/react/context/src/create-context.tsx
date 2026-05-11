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

import * as React from "react";

import type {
  Context,
  Globals,
  Locals,
  ProviderFC,
  ProviderProps,
  UseContext,
} from "./types";

const REGX_PATTERN = /\./g;

function createContext<C>(
  ownerName: string,
): readonly [Context<C>, UseContext<C>];
function createContext<C>(
  ownerName: string,
  globals: Globals<C>,
): readonly [Context<C>, UseContext<C>];

function createContext<C>(
  ownerName: string,
  globals?: Globals<C>,
): readonly [Context<C>, UseContext<C>] {
  let Context = React.createContext<C | undefined>(globals?.defaultValue);

  const Provider = ((props: ProviderProps<C>): React.JSX.Element => {
    let { children, ...rest } = props;

    let value = React.useMemo(() => {
      return rest;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, Object.values(rest)) as C;

    return <Context.Provider value={value}>{children}</Context.Provider>;
  }) as ProviderFC<C>;

  Provider.__ownerName = ownerName;

  const useContext = ((consumerName: string, locals?: Locals): C => {
    let context = React.useContext<C | undefined>(Context);

    if (context == null) {
      if (globals?.defaultValue !== undefined) {
        return globals.defaultValue;
      }

      throw new Error(
        locals?.errorMessage ??
          globals?.errorMessage ??
          getErrorMessage(consumerName, ownerName),
      );
    }

    return context;
  }) as UseContext<C>;

  return [{ Provider }, useContext] as const;
}

const getErrorMessage = (consumerName: string, ownerName: string): string => {
  return `'${format(consumerName)}' must be used within a '${format(ownerName)}'.`;
};

const format = (str: string): string => {
  if (!REGX_PATTERN.test(str)) {
    return str;
  }

  return str.replace(REGX_PATTERN, "");
};

export { createContext };

export type { Context, Globals, Locals, UseContext };
