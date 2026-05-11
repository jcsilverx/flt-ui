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
import { Primitive } from "@flt-ui/react-primitive";
import { useComposedRefs } from "@flt-ui/react-use-composed-refs";
import { useDirection } from "@flt-ui/react-direction";
import { useComposedEvent } from "@flt-ui/react-use-event";
import { useFocusIntent } from "@flt-ui/react-use-focus-intent";
import { useFocusManager } from "@flt-ui/react-use-focus-manager";
import {
  focusElement,
  isTabbable,
  KEYBOARD_KEY,
  MOUSE_BUTTON,
} from "@flt-ui/a11y";
import { contains, getActiveElement, getOwnerDocument } from "@flt-ui/dom";
import { useFocusWithin } from "@flt-ui/react-use-focus-within";

import type { Omit, PrimitiveProps } from "@flt-ui/react-primitive";

const OWNER_NAME = "Toolbar";

type FC<P> = (props: P) => React.ReactNode;

type ToolbarProps = Omit<PrimitiveProps<"div">, "dir"> & {
  orientation?: "horizontal" | "vertical";
  dir?: "ltr" | "rtl";
  loop?: boolean;
};

type ToolbarFC = FC<ToolbarProps> & {
  __ownerName?: string;
};

function createToolbar(ownerName: string): ToolbarFC {
  const Toolbar = ((props: ToolbarProps): React.JSX.Element => {
    let { ref, orientation = "horizontal", dir, loop = true, ...rest } = props;

    let node = React.useRef<globalThis.HTMLDivElement | null>(null);
    let composedRefs = useComposedRefs(ref, node);
    let direction = useDirection(dir);
    let focusIntent = useFocusIntent(direction, orientation);
    let focusManager = useFocusManager(node, {
      accept: (node): boolean => {
        return isHTMLElement(node) && isTabbable(node);
      },
    });

    let lastFocused = React.useRef<globalThis.HTMLElement | null>(null);

    let { onFocus, onBlur } = useFocusWithin({
      onFocusWithin: (event): void => {
        let { target, currentTarget, relatedTarget } = event;

        if (lastFocused.current == null) {
          return /** UNUSED */;
        }

        if (contains(currentTarget, relatedTarget)) {
          return /** UNUSED */;
        }

        let container = node.current;

        if (container == null || !isHTMLElement(container)) {
          return /** UNUSED */;
        }

        if (!contains(container, target)) {
          return /** UNUSED */;
        }

        focusElement(lastFocused.current);
        lastFocused.current = null;

        return /** UNUSED */;
      },

      onBlurWithin: (event): void => {
        let { target } = event;

        if (!isHTMLElement(target) || lastFocused.current) {
          return /** UNUSED */;
        }

        lastFocused.current = target;

        return /** UNUSED */;
      },
    });

    const handleKeyDownCapture = useComposedEvent(
      props.onKeyDownCapture,
      (event): void => {
        let { key, target, currentTarget, shiftKey } = event;

        let container = node.current;

        if (container == null || !isHTMLElement(container)) {
          return /** UNUSED */;
        }

        if (!isHTMLElement(target) || !contains(currentTarget, target)) {
          return /** UNUSED */;
        }

        let ownerDocument = getOwnerDocument(container);
        let activeElement = getActiveElement(ownerDocument);

        if (activeElement == null || !isHTMLElement(activeElement)) {
          return /** UNUSED */;
        }

        if (key === KEYBOARD_KEY.Tab) {
          event.stopPropagation();

          lastFocused.current = activeElement;

          if (shiftKey) {
            focusManager.focusFirst();
          } else {
            focusManager.focusLast();
          }

          return /** UNUSED */;
        }

        let intent = focusIntent.getFocusIntent(key);

        if (intent == null) {
          return /** UNUSED */;
        }

        event.preventDefault();
        event.stopPropagation();

        switch (intent) {
          case "FIRST":
            focusManager.focusFirst();
            break;
          case "PREV":
            focusManager.focusPrevious({
              loop: loop,
            });
            break;
          case "NEXT":
            focusManager.focusNext({
              loop: loop,
            });
            break;
          case "LAST":
            focusManager.focusLast();
            break;
        }

        return /** UNUSED */;
      },
    );

    const handleFocusCapture = useComposedEvent(props.onFocusCapture, onFocus);

    const handleBlurCapture = useComposedEvent(props.onBlurCapture, onBlur);

    const handlePointerDownCapture = useComposedEvent(
      props.onPointerDownCapture,
      (event): void => {
        let { target, button, ctrlKey } = event;

        let container = node.current;

        if (container == null || !isHTMLElement(container)) {
          return /** UNUSED */;
        }

        if (!isHTMLElement(target) || !contains(container, target)) {
          return /** UNUSED */;
        }

        if (button !== MOUSE_BUTTON.Left || ctrlKey) {
          event.preventDefault();

          return /** UNUSED */;
        }

        lastFocused.current = target;

        return /** UNUSED */;
      },
    );

    return (
      <Primitive.div
        {...rest}
        ref={composedRefs}
        role="toolbar"
        aria-orientation={orientation}
        dir={direction}
        onPointerDownCapture={handlePointerDownCapture}
        onKeyDownCapture={handleKeyDownCapture}
        onFocusCapture={handleFocusCapture}
        onBlurCapture={handleBlurCapture}
      />
    );
  }) as ToolbarFC;

  Toolbar.__ownerName = ownerName;

  return Toolbar;
}

const Toolbar: ToolbarFC = createToolbar(OWNER_NAME);

const isHTMLElement = (element: unknown): element is globalThis.HTMLElement => {
  return element instanceof globalThis.HTMLElement;
};

export { Toolbar, Toolbar as Root };
export type { ToolbarProps };

export { createToolbar };
export type { ToolbarFC };
