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

const DEFAULT_MIN_VALUE = 0;
const DEFAULT_MAX_VALUE = 100;

type MinMaxValuesOptions = {
  isValidMin?: (fmin: unknown, nmax: number) => fmin is number;
  isValidMax?: (fmax: unknown, nmin: number) => fmax is number;
};

type MinMaxValuesReturn = {
  readonly nmin: number;
  readonly nmax: number;
  readonly fmin: number;
  readonly fmax: number;
};

const getMinMaxValues = (
  min: unknown,
  max: unknown,
  options: MinMaxValuesOptions = {},
): MinMaxValuesReturn => {
  let { isValidMin = isValidMinNumber, isValidMax = isValidMaxNumber } =
    options;

  let nmin = getNmin(min);
  let nmax = getNmax(max);

  let fmin = isValidMin(min, nmax) ? min : DEFAULT_MIN_VALUE;
  let fmax = isValidMax(max, nmin) ? max : DEFAULT_MAX_VALUE;

  return {
    nmin,
    nmax,
    fmin,
    fmax,
  };
};

/**
 * @internal
 *
 * @category refinements
 */
export const isNumber = (value: unknown): value is number => {
  return typeof value === "number" && !Number.isNaN(value);
};

/**
 * @internal
 */
export const isValidMinNumber = (min: unknown, max: number): min is number => {
  return isNumber(min) && min >= 0 && min < max;
};

/**
 * @internal
 */
export const isValidMaxNumber = (max: unknown, min: number): max is number => {
  return isNumber(max) && max > min;
};

/**
 * @internal
 */
const getNmin = (min: unknown): number => {
  return isNumber(min) && min >= 0 ? min : DEFAULT_MIN_VALUE;
};

/**
 * @internal
 */
const getNmax = (max: unknown): number => {
  return isNumber(max) && max > 0 ? max : DEFAULT_MAX_VALUE;
};

export { getMinMaxValues };
export type { MinMaxValuesOptions, MinMaxValuesReturn };
