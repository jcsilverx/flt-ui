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

function useMutationObserver<E extends globalThis.Element>(
  element: PossibleRef<E> | null | undefined,
  onMutation: globalThis.MutationCallback,
  options?: globalThis.MutationObserverInit,
): void {
  let onMutationRef = useLatestValue(onMutation);

  useIsoMorphicEffect(() => {
    let elem = getElement(element);

    if (
      typeof window === "undefined" ||
      typeof document === "undefined" ||
      elem == null
    ) {
      return;
    }

    let ownerWindow = getOwnerWindow(elem);

    if (!hasMutationObserver(ownerWindow)) {
      console.warn("'MutationObserver' is not supported.");

      return;
    }

    const handleMutation = (
      mutations: globalThis.MutationRecord[],
      observer: globalThis.MutationObserver,
    ): void => {
      let len = mutations.length;

      if (len === 0) {
        return;
      }

      onMutationRef.current(mutations, observer);

      return;
    };

    let observer = new ownerWindow.MutationObserver(handleMutation);

    observer.observe(elem, options);

    return (): void => {
      observer.disconnect();

      return;
    };
  }, [element, onMutationRef, options]);

  return;
}

const hasMutationObserver = (ownerWindow: Window): boolean => {
  return typeof ownerWindow.window.MutationObserver !== "undefined";
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

export { useMutationObserver };
