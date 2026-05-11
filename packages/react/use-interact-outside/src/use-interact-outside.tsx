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

import { contains } from "@flt-ui/dom";
import { useOwnerDocumentEvent } from "@flt-ui/react-use-event";
import { useLatestValue } from "@flt-ui/react-use-latest-value";

import type * as React from "react";

type PossibleRef<E extends globalThis.Element> = E | React.RefObject<E | null>;

function useInteractOutside<E extends globalThis.Element>(
  container: PossibleRef<E>,
  listener: (event: globalThis.PointerEvent) => void,
): void {
  let listenerRef = useLatestValue(listener);

  const handleInteractOutside = (event: globalThis.PointerEvent): void => {
    let { target } = event;

    if (!isHTMLElement(target) || !target.isConnected) {
      return;
    }

    let element = getElement(container);

    if (element == null || !isHTMLElement(element)) {
      return;
    }

    if (!contains(element, target)) {
      listenerRef.current(event);
    }

    return;
  };

  useOwnerDocumentEvent(container, "pointerdown", handleInteractOutside, {
    capture: true,
  });

  return;
}

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

const isHTMLElement = (element: unknown): element is globalThis.HTMLElement => {
  return element instanceof globalThis.HTMLElement;
};

export { useInteractOutside };
