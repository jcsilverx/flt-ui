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

type PossibleNumber<Number extends number = number> = Number | null | undefined;

/**
 * @internal use `0` or `-1` instead
 */
export type IncludedOrExcluded = 0 | -1;

const fromTabSequence = (inTabSequence: boolean) => {
  let tabIndex: IncludedOrExcluded = inTabSequence ? 0 : -1;

  const getTabIndex = (
    disabled?: boolean,
  ): PossibleNumber<IncludedOrExcluded> => {
    if (disabled === true) {
      return undefined;
    }

    return tabIndex;
  };

  return getTabIndex;
};

export { fromTabSequence };
export type { PossibleNumber };
