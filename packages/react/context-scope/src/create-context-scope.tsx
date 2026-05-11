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

import { composeContextScope } from "./compose-context-scope";

import type {
  Context,
  CreateContext,
  CreateUseScope,
  Globals,
  Locals,
  MC,
  ProviderFC,
  ProviderProps,
  Scope,
  ScopeHook,
  UseContext,
} from "./types";

const REGX_PATTERN = /\./g;

function createContextScope(
  scopeName: string,
): readonly [CreateContext, CreateUseScope];
function createContextScope(
  scopeName: string,
  scopeDeps: globalThis.ReadonlyArray<CreateUseScope>,
): readonly [CreateContext, CreateUseScope];

function createContextScope(
  scopeName: string,
  scopeDeps: globalThis.ReadonlyArray<CreateUseScope> = [],
): readonly [CreateContext, CreateUseScope] {
  const defaultValues: globalThis.Map<string, any> = new Map<string, any>();

  const createContext = (<C,>(
    ownerName: string,
    globals?: Globals<C>,
  ): readonly [Context<C>, UseContext<C>] => {
    let BaseContext = React.createContext<C | undefined>(globals?.defaultValue);

    defaultValues.set(ownerName, globals?.defaultValue);

    const Provider = ((props: ProviderProps<C>): React.JSX.Element => {
      let { scope, children, ...rest } = props;

      let Context = scope?.[scopeName]?.get(ownerName) ?? BaseContext;

      let value = React.useMemo(() => {
        return rest;
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, globalThis.Object.values(rest)) as C;

      return <Context.Provider value={value}>{children}</Context.Provider>;
    }) as ProviderFC<C>;

    Provider.__ownerName = ownerName;

    const useContext = ((
      consumerName: string,
      scope: Scope,
      locals?: Locals,
    ): C => {
      let Context = scope?.[scopeName]?.get(ownerName) ?? BaseContext;

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
  }) as CreateContext;

  const createUseScope = ((): ScopeHook => {
    let scopes: MC = new Map<string, React.Context<any>>();

    for (let [key, defaultValue] of defaultValues) {
      let context = React.createContext<any>(defaultValue);

      scopes.set(key, context);
    }

    const useScope = (scope: Scope): globalThis.Record<string, Scope> => {
      let contexts = scope?.[scopeName] ?? scopes;

      return React.useMemo(() => {
        return {
          [`__scope${scopeName}`]: {
            ...scope,
            [scopeName]: contexts,
          },
        };
      }, [contexts, scope]);
    };

    return useScope;
  }) as CreateUseScope;

  createUseScope.__scopeName = scopeName;

  return [
    createContext,
    composeContextScope(createUseScope, ...scopeDeps),
  ] as const;
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

export { createContextScope };

export type {
  Context,
  CreateContext,
  CreateUseScope,
  Globals,
  Locals,
  Scope,
  ScopeHook,
  UseContext,
};
