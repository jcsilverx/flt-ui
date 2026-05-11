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

import * as React from "react";
import { useLatestValue } from "@flt-ui/react-use-latest-value";
import { EventHandler } from "@flt-ui/dom";

type PossibleRef<E extends globalThis.Element | globalThis.HTMLElement> =
  | E
  | React.RefObject<E | null>;

function useEventListener<K extends keyof globalThis.ElementEventMap>(
  element: PossibleRef<globalThis.Element> | null | undefined,
  type: K,
  listener: (event: globalThis.ElementEventMap[K]) => void,
  options?: boolean | globalThis.AddEventListenerOptions,
): void;

function useEventListener<K extends keyof globalThis.HTMLElementEventMap>(
  element: PossibleRef<globalThis.HTMLElement> | null | undefined,
  type: K,
  listener: (event: globalThis.HTMLElementEventMap[K]) => void,
  options?: boolean | globalThis.AddEventListenerOptions,
): void;

function useEventListener<K extends keyof globalThis.ElementEventMap>(
  element: PossibleRef<globalThis.Element> | null | undefined,
  type: K,
  listener: (event: globalThis.ElementEventMap[K]) => void,
  options?: boolean | globalThis.AddEventListenerOptions,
): void {
  let listenerRef = useLatestValue(listener);

  React.useEffect(() => {
    let elem = getElement(element);

    if (elem == null) {
      return;
    }

    const handler = (event: globalThis.ElementEventMap[K]): void => {
      listenerRef.current(event);

      return;
    };

    EventHandler.on(elem, type, handler, options);

    return (): void => {
      EventHandler.off(elem, type, handler, options);

      return;
    };
  }, [element, listenerRef, options, type]);

  return;
}

/**
 * @internal
 */
const getElement = (
  element:
    | PossibleRef<globalThis.Element | globalThis.HTMLElement>
    | null
    | undefined,
): globalThis.Element | null => {
  if (element == null) {
    return null;
  }

  if ("current" in element) {
    return element.current;
  }

  return element;
};

export { useEventListener };
