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
import { useComposedEvent } from "@flt-ui/react-use-event";
import { useComposedRefs } from "@flt-ui/react-use-composed-refs";
import { useFocusManager } from "@flt-ui/react-use-focus-manager";
import {
  focusElement,
  isFocusable,
  KEYBOARD_KEY,
  MOUSE_BUTTON,
} from "@flt-ui/a11y";
import {
  getActiveElement,
  getOwnerDocument,
  EventHandler,
  contains,
} from "@flt-ui/dom";
import { useFocusWithin } from "@flt-ui/react-use-focus-within";
import { useIsoMorphicEffect } from "@flt-ui/react-use-iso-morphic-effect";
import { useLatestValue } from "@flt-ui/react-use-latest-value";
import { useInteractOutside } from "@flt-ui/react-use-interact-outside";
import { UniqueDeque } from "@flt-ui/unique-deque";

import {
  getState,
  makeDescriptionId,
  makeTitleId,
  useDialogContext,
} from "./dialog";

import type { Scope } from "@flt-ui/react-context-scope";
import type { PrimitiveProps } from "@flt-ui/react-primitive";

const OWNER_NAME = "Dialog.Content";
const OPEN_AUTO_FOCUS = "initial-focus";
const CLOSE_AUTO_FOCUS = "final-focus";
const AUTO_FOCUS_OPTS = Object.freeze({
  bubbles: false,
  cancelable: true,
} as const) satisfies globalThis.CustomEventInit;
const UDQ = new UniqueDeque<string>();

type ScopedProps<P> = P & {
  __scopeDialog?: Scope;
};

type FC<P> = (props: P) => React.ReactNode;

type DialogContentProps = PrimitiveProps<"div"> & {
  persist?: true;
  onOpenAutoFocus?: (event: globalThis.Event) => void;
  onCloseAutoFocus?: (event: globalThis.Event) => void;
  onInteractOutside?: (event: globalThis.PointerEvent) => void;
  onEscapeKeyDown?: (event: React.KeyboardEvent<HTMLDivElement>) => void;
};

type DialogContentFC = FC<DialogContentProps> & {
  __ownerName?: string;
};

function createDialogContent(ownerName: string): DialogContentFC {
  const style = Object.freeze({
    pointerEvents: "auto",
  } as const) satisfies React.CSSProperties;

  const DialogContent = ((
    props: ScopedProps<DialogContentProps>,
  ): React.JSX.Element => {
    let {
      ref,
      persist,
      onOpenAutoFocus,
      onCloseAutoFocus,
      onInteractOutside,
      onEscapeKeyDown,
      ...rest
    } = props;

    let context = useDialogContext(OWNER_NAME, props.__scopeDialog);
    let node = React.useRef<globalThis.HTMLDivElement | null>(null);
    let composedRefs = useComposedRefs(ref, node);
    let focusManager = useFocusManager(node, {
      accept: (node): boolean => {
        return isHTMLElement(node) && isFocusable(node);
      },
    });
    let onOpenAutoFocusRef = useLatestValue(onOpenAutoFocus);
    let onCloseAutoFocusRef = useLatestValue(onCloseAutoFocus);
    let lastFocused = React.useRef<globalThis.HTMLElement | null>(null);

    let titleId = makeTitleId(context.id);
    let descriptionId = makeDescriptionId(context.id);

    useIsoMorphicEffect(() => {
      let container = node.current;

      if (container == null || !isHTMLElement(container)) {
        return /** UNUSED */;
      }

      UDQ.push_front(context.id);

      let ownerDocument = getOwnerDocument(container);
      let previouslyFocusedElement = getActiveElement(ownerDocument);

      const O_TYPE = `${ownerName}#${OPEN_AUTO_FOCUS}` as const;

      let event = new CustomEvent<Event>(O_TYPE, AUTO_FOCUS_OPTS);
      let onOpenAutoFocus = onOpenAutoFocusRef.current;

      const handleOpenAutoFocus = (event: Event): void => {
        onOpenAutoFocus?.(event);
      };

      EventHandler.on(container, O_TYPE, handleOpenAutoFocus);
      container.dispatchEvent(event);

      if (event.defaultPrevented) {
        return /** UNUSED */;
      }

      let firstElment = focusManager.focusFirst();

      if (firstElment == null) {
        focusElement(container, {
          preventScroll: true,
        });
      } else {
        focusElement(firstElment, {
          preventScroll: true,
        });
      }

      return (): void => {
        EventHandler.off(container, O_TYPE, handleOpenAutoFocus);

        queueMacrotask((): void => {
          UDQ.remove(context.id);

          const C_TYPE = `${ownerName}#${CLOSE_AUTO_FOCUS}` as const;

          let event = new CustomEvent<Event>(C_TYPE, AUTO_FOCUS_OPTS);
          let onCloseAutoFocus = onCloseAutoFocusRef.current;

          const handleCloseAutoFocus = (event: Event): void => {
            onCloseAutoFocus?.(event);
          };

          EventHandler.on(container, C_TYPE, handleCloseAutoFocus);
          container.dispatchEvent(event);

          if (event.defaultPrevented) {
            return /** UNUSED */;
          }

          focusElement(previouslyFocusedElement, {
            preventScroll: true,
          });

          EventHandler.off(container, C_TYPE, handleCloseAutoFocus);

          return /** UNUSED */;
        });

        return /** UNUSED */;
      };
    }, [
      context.id,
      focusManager,
      focusManager.focusFirst,
      onCloseAutoFocusRef,
      onOpenAutoFocusRef,
    ]);

    useInteractOutside(node, (event): void => {
      let { button, ctrlKey, target } = event;

      if (UDQ.front() !== context.id) {
        return /** UNUSED */;
      }

      let isTrigger =
        isHTMLElement(target) && contains(context.trigger, target);

      if (button !== MOUSE_BUTTON.Left || ctrlKey || isTrigger) {
        event.preventDefault();

        return /** UNUSED */;
      }

      onInteractOutside?.(event);

      if (event.defaultPrevented) {
        return /** UNUSED */;
      }

      event.preventDefault();
      event.stopPropagation();

      context.onCloseChange();
    });

    // Programmatically prevent focus from leaving the container.
    let { onFocus, onBlur } = useFocusWithin({
      onFocusWithin: (event): void => {
        let { target } = event;

        if (UDQ.front() !== context.id) {
          return /** UNUSED */;
        }

        if (!context.modal || !isHTMLElement(target)) {
          return /** UNUSED */;
        }

        let container = node.current;

        if (
          container == null ||
          !isHTMLElement(container) ||
          !contains(container, target)
        ) {
          return /** UNUSED */;
        }

        lastFocused.current = target;

        return /** UNUSED */;
      },
      onBlurWithin: (event): void => {
        let { relatedTarget } = event;

        if (UDQ.front() !== context.id) {
          return /** UNUSED */;
        }

        if (
          !context.modal ||
          relatedTarget == null ||
          !isHTMLElement(relatedTarget)
        ) {
          return /** UNUSED */;
        }

        let container = node.current;

        if (
          container == null ||
          isHTMLElement(container) ||
          contains(container, relatedTarget)
        ) {
          return /** UNUSED */;
        }

        focusElement(lastFocused.current, {
          preventScroll: true,
        });

        return /** UNUSED */;
      },
    });

    const handleKeyDown = useComposedEvent(props.onKeyDown, (event): void => {
      let { key, shiftKey } = event;

      // Close on Escape when this content is the top-most layer
      if (key === KEYBOARD_KEY.Escape) {
        if (UDQ.front() !== context.id) {
          return /** UNUSED */;
        }

        onEscapeKeyDown?.(event);

        if (event.defaultPrevented) {
          return /** UNUSED */;
        }

        event.preventDefault();
        event.stopPropagation();

        context.onCloseChange();

        return /** UNUSED */;
      }

      if (!context.modal || key !== KEYBOARD_KEY.Tab) {
        return /** UNUSED */;
      }

      let container = node.current;

      if (container == null || !isHTMLElement(container)) {
        return /** UNUSED */;
      }

      let ownerDocument = getOwnerDocument(container);
      let activeElement = getActiveElement(ownerDocument);

      if (
        activeElement == null ||
        !isHTMLElement(activeElement) ||
        !contains(container, activeElement)
      ) {
        return /** UNUSED */;
      }

      event.preventDefault();
      event.stopPropagation();

      if (shiftKey) {
        // Shift+Tab: Focus moves to the previous focusable element; if at the start, loops to the end
        focusManager.focusPrevious({
          loop: true,
        });
      } else {
        // Tab: Focus moves to the next focusable element; if at the end, loops to the start
        focusManager.focusNext({
          loop: true,
        });
      }

      return /** UNUSED */;
    });

    const handleFocus = useComposedEvent(props.onFocus, onFocus);

    const handleBlur = useComposedEvent(props.onBlur, onBlur);

    return (
      <>
        {persist || context.open ? (
          <Primitive.div
            {...rest}
            ref={composedRefs}
            id={context.id}
            role="dialog"
            tabIndex={-1}
            aria-labelledby={titleId}
            aria-describedby={descriptionId}
            data-flt-state={getState(context.open)}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            onBlur={handleBlur}
            style={{
              ...style,
              ...props.style,
            }}
          />
        ) : null}
      </>
    );
  }) as DialogContentFC;

  DialogContent.__ownerName = ownerName;

  return DialogContent;
}

const DialogContent: DialogContentFC = createDialogContent(OWNER_NAME);

const isHTMLElement = (element: unknown): element is globalThis.HTMLElement => {
  return element instanceof globalThis.HTMLElement;
};

const queueMacrotask = (callback: () => void): void => {
  let channel = new MessageChannel();

  channel.port1.onmessage = (): void => {
    callback();

    return /** UNUSED */;
  };

  channel.port2.postMessage(null);

  return /** UNUSED */;
};

export { DialogContent, DialogContent as Content };
export type { DialogContentProps };

export { createDialogContent };
export type { DialogContentFC };
