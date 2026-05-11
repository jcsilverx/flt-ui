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
import { useResizeObserver } from "@flt-ui/react-use-resize-observer";
import { useIsoMorphicEffect } from "@flt-ui/react-use-iso-morphic-effect";

type PossibleRef<E extends globalThis.Element> = E | React.RefObject<E | null>;

type Dimension = "height" | "width";

type Size = globalThis.Record<Dimension, number | undefined>;

function useSize<E extends globalThis.Element>(
  element: PossibleRef<E> | null | undefined,
): Size {
  let [size, setSize] = React.useState<Size>({
    height: undefined,
    width: undefined,
  });

  useIsoMorphicEffect(() => {
    let elem = getElement(element);

    if (elem == null || !isHTMLElement(elem)) {
      return;
    }

    let { height, width } = elem.getBoundingClientRect();

    setSize({
      height,
      width,
    });
  }, [element]);

  useResizeObserver(
    element,
    (entries): void => {
      let entry = entries[0] as globalThis.ResizeObserverEntry | undefined;
      let elem = getElement(element);

      if (entry == null || !isHTMLElement(elem)) {
        return;
      }

      let { height, width }: Size = {
        height: entry.borderBoxSize[0]?.blockSize ?? elem.offsetHeight,
        width: entry.borderBoxSize[0]?.inlineSize ?? elem.offsetWidth,
      };

      if (height !== size.height || width !== size.width) {
        setSize({
          height,
          width,
        });
      }

      return;
    },
    {
      box: "border-box",
    },
  );

  return size;
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

export { useSize };
