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

import {
  getMinMaxValues,
  isNumber,
  isValidMaxNumber,
  isValidMinNumber,
} from "./get-min-max-values";

type ProgressProps = {
  /**
   * The progress value.
   *
   * @default null
   */
  value?: number | null;
  /**
   * The minimum value of the progress.
   *
   * @default 0
   */
  min?: number;
  /**
   * The maximum value of the progress.
   *
   * @default 100
   */
  max?: number;
  /**
   * A function that returns the accessible text label representing
   * the current value in a human-readable format.
   *
   * @note If **not** provided, the value is read as the numeric value
   *       as a percentage of the min and max values.
   *
   * @default —
   */
  getValueText?: (value: number, min: number, max: number) => string;
  /**
   * The name of the caller that triggers warnings during validation.
   *
   * @note This prop is primarily used for debugging purposes to identify
   *       which component is passing invalid or out-of-range values for `min`,
   *       `max`, or `value`.
   *
   * @default —
   */
  caller?: string;
};

type ProgressReturn = {
  /**
   * The current progress value.
   */
  readonly value: number | null;
  /**
   * A string that represents the text label for the current progress value.
   */
  readonly valueText: string | undefined;
  /**
   * The minimum value of the progress.
   */
  readonly min: number;
  /**
   * The maximum value of the progress.
   */
  readonly max: number;
};

function useProgress(props: ProgressProps): ProgressReturn {
  let {
    value: _value = null,
    min: _min,
    max: _max,
    getValueText: _getValueText,
    caller,
  } = props;

  let { fmin: min, fmax: max, nmin, nmax } = getMinMaxValues(_min, _max);

  if (process.env.NODE_ENV !== "production") {
    let callerName = caller ?? "Anonymous";

    if (_min != null && !isValidMinNumber(_min, nmax)) {
      console.error(
        `${callerName}: Invalid min value (${_min}) — only numbers less than ${nmax}` +
          ` or equals to 0 are valid min values. It has been set to ${min}.`,
      );
    }

    if (_max != null && !isValidMaxNumber(_max, nmin)) {
      console.error(
        `${callerName}: Invalid max value (${_max}) — only numbers greater than ${nmin}` +
          ` are valid max values. It has been set to ${max}.`,
      );
    }
  }

  let value = isValidValueNumber(_value, min, max) ? _value : null;

  if (process.env.NODE_ENV !== "production") {
    let callerName = caller ?? "Anonymous";

    if (_value !== null && !isValidValueNumber(_value, min, max)) {
      console.warn(
        `${callerName}: Invalid value (${_value}) — must be between ${min} and ${max}.` +
          ` It has been set to null.`,
      );
    }
  }

  const setValueText = _getValueText ?? getValueText;

  let valueText = isNumber(value) ? setValueText(value, min, max) : undefined;

  return {
    value,
    valueText,
    min,
    max,
  };
}

const isValidValueNumber = (
  value: unknown,
  min: number,
  max: number,
): value is number => {
  return isNumber(value) && value >= min && value <= max;
};

const getValueText = (value: number, min: number, max: number): string => {
  return `${Math.round(((value - min) / (max - min)) * 100)}%`;
};

export { useProgress };
export type { ProgressProps, ProgressReturn };
