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

const RATIO_REGEX = /^(\d+):(\d+)$/;

type DisplayAspectRatio = `${number}:${number}`;

type DisplayAspectRatioProps = {
  /**
   * The desired aspect ratio.
   *
   * @default null
   */
  ratio?: number | DisplayAspectRatio | null;
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

type DisplayAspectRatioReturn = {
  /**
   * The calculated unitless aspect ratio value (`width` / `height`).
   */
  readonly value: number;
};

function useDisplayAspectRatio(
  props: DisplayAspectRatioProps,
): DisplayAspectRatioReturn {
  let { ratio = null, caller } = props;

  let value: number = 1 / 1;

  if (
    process.env.NODE_ENV !== "production" &&
    ratio != null &&
    !isNumber(ratio) &&
    !isDisplayAspectRatio(ratio)
  ) {
    let callerName = caller ?? "Anonymous";

    console.warn(
      `${callerName}: Invalid ratio (${ratio}) — expected a number or a string like '16:9'.` +
        ` It has been set to 1:1.`,
    );
  }

  let match =
    ratio != null && isDisplayAspectRatio(ratio) && RATIO_REGEX.exec(ratio);

  if (match) {
    let num = Number(match[1]);
    let den = Number(match[2]);

    if (isNumber(num) && isNumber(den) && den !== 0) {
      value = num / den;
    }
  } else if (ratio != null && isNumber(ratio)) {
    value = ratio;
  } else {
    // DO_NOTHING
  }

  return {
    value,
  };
}

const isNumber = (value: unknown): value is number => {
  return typeof value === "number" && !Number.isNaN(value);
};

const isDisplayAspectRatio = (ratio: unknown): ratio is DisplayAspectRatio => {
  if (typeof ratio !== "string") {
    return false;
  }

  return RATIO_REGEX.test(ratio);
};

export { useDisplayAspectRatio };
export type { DisplayAspectRatioProps, DisplayAspectRatioReturn };
