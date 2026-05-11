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

type Direction = "ltr" | "rtl";
type Orientation = "horizontal" | "vertical" | undefined;

type FOCUS_INTENT = "FIRST" | "PREV" | "NEXT" | "LAST";

const FOCUS_INTENT_KEYS: Record<string, FOCUS_INTENT> = {
  Home: "FIRST",
  End: "LAST",

  PageUp: "FIRST",
  PageDown: "LAST",

  ArrowLeft: "PREV",
  ArrowUp: "PREV",

  ArrowRight: "NEXT",
  ArrowDown: "NEXT",
};

const createFocusIntent =
  (direction: Direction, orientation: Orientation) =>
  (key: string): FOCUS_INTENT | undefined => {
    let resolvedKey = direction !== "rtl" ? key : flip(key);

    if (isBlockedBy(orientation, key)) {
      return undefined;
    }

    return FOCUS_INTENT_KEYS[resolvedKey];
  };

const flip = (key: string): string => {
  return key === "ArrowLeft"
    ? "ArrowRight"
    : key === "ArrowRight"
      ? "ArrowLeft"
      : key;
};

const isBlockedBy = (orientation: Orientation, key: string): boolean => {
  return orientation === "vertical"
    ? key === "ArrowLeft" || key === "ArrowRight"
    : orientation === "horizontal"
      ? key === "ArrowUp" || key === "ArrowDown"
      : false;
};

export { createFocusIntent };
export type { FOCUS_INTENT };
