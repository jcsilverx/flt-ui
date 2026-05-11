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

import type { CreateUseScope, MC, Scope, ScopeHook } from "./types";

function composeContextScope(
  initialScope: CreateUseScope,
  ...scopes: globalThis.ReadonlyArray<CreateUseScope>
): CreateUseScope {
  let len = scopes.length;

  if (len === 0) {
    return initialScope;
  }

  return ((): ScopeHook => {
    return createUseScope(initialScope, ...scopes);
  }) as CreateUseScope;
}

const createUseScope = (
  ...scopes: globalThis.ReadonlyArray<CreateUseScope>
): ScopeHook => {
  let scopeHooks = scopes.map((scope) => {
    return {
      scopeName: scope.__scopeName,
      scopeHook: scope(),
    };
  });

  const useScope = (overrides: Scope): Record<string, Record<string, MC>> => {
    let next: globalThis.Record<string, MC> = React.useMemo(() => ({}), []);

    for (let { scopeName, scopeHook } of scopeHooks) {
      let scopeProps = scopeHook(overrides);
      let current = scopeProps[`__scope${scopeName}`];

      for (let key in current) {
        next[key] = current[key];
      }
    }

    return React.useMemo(() => {
      let initialScope = scopes[0];

      return {
        [`__scope${initialScope.__scopeName}`]: next,
      };
    }, [next]);
  };

  return useScope;
};

export { composeContextScope };
