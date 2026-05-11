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

const FOCUSABLE_ELEMENTS = [
  "a[href]",
  "area[href]",
  "button:not([disabled])",
  "embed",
  "iframe",
  "input:not([disabled]):not([type=hidden])",
  "object",
  "select:not([disabled])",
  "summary",
  "textarea:not([disabled])",
  "audio[controls]",
  "video[controls]",
  "[contenteditable]:not([contenteditable^='false'])",
] as const;

const FOCUSABLE_ELEMENT_SELECTOR =
  FOCUSABLE_ELEMENTS.join(":not([hidden]),") +
  ",[tabindex]:not([tabindex='-1']):not([disabled]):not([hidden])";

const TABBABLE_ELEMENT_SELECTOR = [
  ...FOCUSABLE_ELEMENTS,
  "[tabindex]:not([tabindex='-1']):not([disabled])",
].join(":not([hidden]):not([tabindex='-1']),");

const KEYBOARD_KEY = Object.freeze({
  Space: " ",
  Enter: "Enter",
  Escape: "Escape",
  Backspace: "Backspace",
  Delete: "Delete",

  ArrowLeft: "ArrowLeft",
  ArrowUp: "ArrowUp",
  ArrowRight: "ArrowRight",
  ArrowDown: "ArrowDown",

  Home: "Home",
  End: "End",

  PageUp: "PageUp",
  PageDown: "PageDown",

  Tab: "Tab",
} as const);

const POINTER_TYPE = Object.freeze({
  Touch: "touch",
  Mouse: "mouse",
  Pen: "pen",
} as const);

const MOUSE_BUTTON = Object.freeze({
  Left: 0,
  Right: 2,
} as const);

export {
  FOCUSABLE_ELEMENTS,
  FOCUSABLE_ELEMENT_SELECTOR,
  TABBABLE_ELEMENT_SELECTOR,
  KEYBOARD_KEY,
  POINTER_TYPE,
  MOUSE_BUTTON,
};
