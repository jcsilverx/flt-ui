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
import { createToggle } from "@flt-ui/react-toggle";
import { useComposedRefs } from "@flt-ui/react-use-composed-refs";
import { useComposedEvent } from "@flt-ui/react-use-event";
import { useFromTabSequence } from "@flt-ui/react-use-from-tab-sequence";
import { MOUSE_BUTTON } from "@flt-ui/a11y";

import {
  Collection,
  useFocusableContext,
  useToggleGroupContext,
  useValueContext,
} from "./toggle-group";

import type { Scope } from "@flt-ui/react-context-scope";
import type { ToggleFC, ToggleProps } from "@flt-ui/react-toggle";
import type { Omit } from "@flt-ui/react-primitive";

const OWNER_NAME = "ToggleGroup.Item";

type ScopedProps<P> = P & {
  __scopeToggleGroup?: Scope;
};

type FC<P> = (props: P) => React.ReactNode;

type ToggleGroupItemProps = Omit<
  ToggleProps,
  "value" | "pressed" | "defaultPressed" | "onPressedChange" | "disabled"
> & {
  value: string;
  disabled?: boolean;
};

type ToggleGroupItemFC = FC<ToggleGroupItemProps> & {
  __ownerName?: string;
};

function createToggleGroupItem(ownerName: string): ToggleGroupItemFC {
  const Toggle: ToggleFC = createToggle(ownerName);

  const ToggleGroupItem = ((
    props: ScopedProps<ToggleGroupItemProps>,
  ): React.JSX.Element => {
    let { ref, value, disabled: _disabled = false, ...rest } = props;

    let node = React.useRef<HTMLButtonElement | null>(null);
    let composedRefs = useComposedRefs(ref, node);
    let context = useToggleGroupContext(OWNER_NAME, props.__scopeToggleGroup);
    let focusableContext = useFocusableContext(
      OWNER_NAME,
      props.__scopeToggleGroup,
    );
    let valueContext = useValueContext(OWNER_NAME, props.__scopeToggleGroup);

    let pressed = (value && valueContext.value.includes(value)) || false;
    let focused =
      value === focusableContext.focusableValue ||
      focusableContext.focusableValue == null;

    let disabled = _disabled || context.disabled;
    let fromTabSequence = useFromTabSequence(focused);
    let tabIndex = fromTabSequence.getTabIndex(disabled) ?? undefined;

    const handlePressedChange = (pressed: boolean): void => {
      if (disabled) {
        return /** UNUSED */;
      }

      if (pressed) {
        valueContext.onItemActivate(value);
      } else {
        valueContext.onItemDeactivate(value);
      }

      return /** UNUSED */;
    };

    const handlePointerDown = useComposedEvent(
      props.onPointerDown,
      (event): void => {
        let { button, ctrlKey } = event;

        if (disabled || button !== MOUSE_BUTTON.Left || ctrlKey) {
          event.preventDefault();

          return /** UNUSED */;
        }

        return /** UNUSED */;
      },
    );

    const handleFocus = useComposedEvent(props.onFocus, (): void => {
      if (disabled) {
        return /** UNUSED */;
      }

      focusableContext.onFocusableValueChange(value);

      return /** UNUSED */;
    });

    return (
      <>
        {context.rovingFocus ? (
          <Collection.SlotItem scope={props.__scopeToggleGroup}>
            <Toggle
              {...rest}
              ref={composedRefs}
              tabIndex={tabIndex}
              data-flt-orientation={context.orientation}
              disabled={disabled}
              pressed={pressed}
              onPressedChange={handlePressedChange}
              onPointerDown={handlePointerDown}
              onFocus={handleFocus}
            />
          </Collection.SlotItem>
        ) : (
          <Toggle
            {...rest}
            ref={composedRefs}
            tabIndex={0}
            data-flt-orientation={context.orientation}
            disabled={disabled}
            pressed={pressed}
            onPressedChange={handlePressedChange}
          />
        )}
      </>
    );
  }) as ToggleGroupItemFC;

  ToggleGroupItem.__ownerName = ownerName;

  return ToggleGroupItem;
}

const ToggleGroupItem: ToggleGroupItemFC = createToggleGroupItem(OWNER_NAME);

export { ToggleGroupItem, ToggleGroupItem as Item };
export type { ToggleGroupItemProps };

export { createToggleGroupItem };
export type { ToggleGroupItemFC };
