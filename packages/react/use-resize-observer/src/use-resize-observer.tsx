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

import { useLatestValue } from "@flt-ui/react-use-latest-value";
import { useIsoMorphicEffect } from "@flt-ui/react-use-iso-morphic-effect";
import { getOwnerWindow } from "@flt-ui/dom";

import type * as React from "react";
import type { Window } from "@flt-ui/dom";

type PossibleRef<E extends globalThis.Element> = E | React.RefObject<E | null>;

function useResizeObserver<E extends globalThis.Element>(
  element: PossibleRef<E> | null | undefined,
  onResize: globalThis.ResizeObserverCallback,
  options?: globalThis.ResizeObserverOptions,
): void {
  let onResizeRef = useLatestValue(onResize);

  useIsoMorphicEffect(() => {
    let elem = getElement(element);

    if (elem == null) {
      return;
    }

    let ownerWindow = getOwnerWindow(elem);

    if (!hasResizeObserver(ownerWindow)) {
      console.warn("'ResizeObserver' is not supported.");

      return;
    }

    const handleResize = (
      entries: globalThis.ResizeObserverEntry[],
      observer: globalThis.ResizeObserver,
    ): void => {
      let len = entries.length;

      if (len === 0) {
        return;
      }

      onResizeRef.current(entries, observer);

      return;
    };

    let observer = new ownerWindow.ResizeObserver(handleResize);

    observer.observe(elem, options);

    return (): void => {
      observer.unobserve(elem);

      return;
    };
  }, [element, onResizeRef, options]);

  return;
}

const hasResizeObserver = (ownerWindow: Window): boolean => {
  return typeof ownerWindow.window.ResizeObserver !== "undefined";
};

const getElement = <E extends globalThis.Element>(
  element: PossibleRef<E> | null | undefined,
): E | null => {
  if (element == null) {
    return null;
  }

  if ("current" in element) {
    return element.current;
  }

  return element;
};

export { useResizeObserver };
