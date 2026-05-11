/* eslint-disable @typescript-eslint/no-unsafe-argument */
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

import { composeEvent } from "@flt-ui/react-compose-event";
import { mergeStyles } from "@flt-ui/merge-styles";
import { clsx } from "@flt-ui/clsx";
import { composeRefs } from "@flt-ui/react-compose-refs";

type UnionOf<T extends any[]> = T[number];

type UnionToIntersection<T> = (T extends any ? (x: T) => any : never) extends (
  x: infer R,
) => any
  ? R
  : never;

type AnyProps = globalThis.Record<string, any>;

const EVENT_REGEX = /^on[A-Z]/;

const mergeProps = <T extends AnyProps>(
  ...args: T[]
): UnionToIntersection<UnionOf<T[]>> => {
  let result: AnyProps = {};

  for (let props of args) {
    for (let prop in props) {
      let value = props[prop];

      if (EVENT_REGEX.test(prop) && typeof value === "function") {
        result[prop] = composeEvent(value, result[prop]);
      } else if (
        prop === "style" &&
        typeof value === "object" &&
        value !== null &&
        !Array.isArray(value)
      ) {
        result[prop] = mergeStyles(result[prop], value);
      } else if (prop === "className" && typeof value === "string") {
        result[prop] = clsx(result[prop], value);
      } else if (prop === "ref" && value != null) {
        result[prop] = composeRefs(result[prop], value);
      } else {
        result[prop] = value;
      }
    }
  }

  return result as any;
};

export { mergeProps };
export type { AnyProps };
