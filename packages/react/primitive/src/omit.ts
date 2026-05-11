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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyRecord = globalThis.Record<string, any>;
type Pattern = globalThis.Readonly<string | globalThis.RegExp>;

const omit = <T extends AnyRecord>(
  r: T,
  pattern: globalThis.ReadonlyArray<Pattern>,
): globalThis.Partial<T> => {
  let result: globalThis.Partial<T> = {};

  let regExp = pattern.map((p): globalThis.Readonly<globalThis.RegExp> => {
    return typeof p === "string" ? new globalThis.RegExp(p) : p;
  });

  for (let Pk in r) {
    let inSome = regExp.some((rEx): boolean => {
      return rEx.test(Pk);
    });

    if (!inSome) {
      result[Pk] = r[Pk];
    }
  }

  return result;
};

export { omit };
