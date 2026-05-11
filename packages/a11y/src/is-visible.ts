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

import { getOwnerWindow } from "@flt-ui/dom";

import { hasHiddenAncestor } from "./has-hidden-ancestor";
import { isInvisible } from "./is-invisible";

const isCheckVisibilitySupported =
  typeof globalThis.Element !== "undefined" &&
  "checkVisibility" in globalThis.Element.prototype;

const isVisible = (element: globalThis.Element): boolean => {
  if (isCheckVisibilitySupported) {
    return element.checkVisibility({
      visibilityProperty: true,
    });
  }

  if (!isHTMLElement(element) && !isSVGElement(element)) {
    return false;
  }

  if (element.getClientRects().length === 0) {
    return false;
  }

  if (hasHiddenAncestor(element) || isInvisible(element)) {
    return false;
  }

  return true;
};

const isHTMLElement = (
  element: globalThis.Element,
): element is globalThis.HTMLElement => {
  let ownerWindow = getOwnerWindow(element);

  return element instanceof ownerWindow.HTMLElement;
};

const isSVGElement = (
  element: globalThis.Element,
): element is globalThis.SVGElement => {
  let ownerWindow = getOwnerWindow(element);

  return element instanceof ownerWindow.SVGElement;
};

export { isVisible };
