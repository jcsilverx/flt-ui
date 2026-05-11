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

type ClassValue =
  | string
  | globalThis.Record<string, boolean>
  | undefined
  | false
  | null;

const clsx = (...classes: globalThis.ReadonlyArray<ClassValue>): string => {
  let str = "";

  for (let cls of classes) {
    if (typeof cls === "string") {
      if (cls) {
        if (str) {
          str += " ";
        }

        str += cls;
      }
    } else if (typeof cls === "object" && cls != null && !Array.isArray(cls)) {
      for (let key in cls) {
        if (cls[key]) {
          if (str) {
            str += " ";
          }

          str += key;
        }
      }
    }
  }

  return str;
};

export { clsx };
export type { ClassValue };
