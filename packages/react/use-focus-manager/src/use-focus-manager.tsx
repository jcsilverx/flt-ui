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
import { FocusManager } from "@flt-ui/a11y";
import { useIsoMorphicEffect } from "@flt-ui/react-use-iso-morphic-effect";

import type { FocusManagerOptions } from "@flt-ui/a11y";

type PossibleRef<E extends globalThis.Element> =
  | E
  | React.RefObject<E | null>
  | null
  | undefined;

type Options = {
  from?: globalThis.Element;
  loop?: boolean;
};

function useFocusManager<E extends globalThis.Element>(
  container: PossibleRef<E>,
  options: globalThis.Partial<FocusManagerOptions> = {},
) {
  let focusManagerRef = React.useRef<FocusManager | null>(null);

  useIsoMorphicEffect(() => {
    let element = getElement(container);

    if (element == null) {
      return;
    }

    focusManagerRef.current = new FocusManager(element, options);

    return (): void => {
      focusManagerRef.current = null;

      return;
    };
  }, [container, options]);

  return {
    focusFirst: React.useCallback((): globalThis.Node | null => {
      return focusManagerRef.current?.focusFirst() ?? null;
    }, []),

    focusPrevious: React.useCallback(
      (options: globalThis.Partial<Options> = {}): globalThis.Node | null => {
        return focusManagerRef.current?.focusPrevious(options) ?? null;
      },
      [],
    ),

    focusNext: React.useCallback(
      (options: globalThis.Partial<Options> = {}): globalThis.Node | null => {
        return focusManagerRef.current?.focusNext(options) ?? null;
      },
      [],
    ),

    focusLast: React.useCallback((): globalThis.Node | null => {
      return focusManagerRef.current?.focusLast() ?? null;
    }, []),
  };
}

const getElement = <E extends globalThis.Element>(
  element: PossibleRef<E>,
): E | null => {
  if (element == null) {
    return null;
  }

  if ("current" in element) {
    return element.current;
  }

  return element;
};

export { useFocusManager };
export type { FocusManagerOptions };

export type { Options };
