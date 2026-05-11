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
import { createRadioTrigger } from "@flt-ui/react-radio";
import { useComposedRefs } from "@flt-ui/react-use-composed-refs";
import { useFromTabSequence } from "@flt-ui/react-use-from-tab-sequence";
import { useComposedEvent } from "@flt-ui/react-use-event";
import { MOUSE_BUTTON } from "@flt-ui/a11y";

import {
  Collection,
  useFocusableContext,
  useRadioGroupContext,
  useRadioScope,
} from "./radio-group";
import { useRadioGroupItemContext } from "./radio-group-item";

import type { Scope } from "@flt-ui/react-context-scope";
import type { RadioTriggerFC, RadioTriggerProps } from "@flt-ui/react-radio";

const OWNER_NAME = "RadioGroup.Trigger";

type ScopedProps<P> = P & {
  __scopeRadioGroup?: Scope;
};

type FC<P> = (props: P) => React.ReactNode;

type RadioGroupTriggerProps = RadioTriggerProps & {};

type RadioGroupTriggerFC = FC<RadioGroupTriggerProps> & {
  __ownerName?: string;
};

function createRadioGroupTrigger(ownerName: string): RadioGroupTriggerFC {
  const RadioTrigger: RadioTriggerFC = createRadioTrigger(ownerName);

  const RadioGroupTrigger = ((
    props: ScopedProps<RadioGroupTriggerProps>,
  ): React.JSX.Element => {
    let { ref, ...rest } = props;

    let node = React.useRef<globalThis.HTMLButtonElement | null>(null);
    let composedRefs = useComposedRefs(ref, node);
    let context = useRadioGroupContext(OWNER_NAME, props.__scopeRadioGroup);
    let focusableContext = useFocusableContext(
      OWNER_NAME,
      props.__scopeRadioGroup,
    );
    let itemContext = useRadioGroupItemContext(
      OWNER_NAME,
      props.__scopeRadioGroup,
    );
    let radioScope = useRadioScope(props.__scopeRadioGroup);

    let checked = context.value != null && itemContext.value === context.value;
    let focused =
      context.value == null &&
      (itemContext.value === focusableContext.focusableValue ||
        focusableContext.focusableValue == null);

    let fromTabSequence = useFromTabSequence(checked || focused);

    let tabIndex =
      fromTabSequence.getTabIndex(itemContext.disabled) ?? undefined;

    const handlePointerDown = useComposedEvent(
      props.onPointerDown,
      (event): void => {
        let { button, ctrlKey } = event;

        if (itemContext.disabled || button !== MOUSE_BUTTON.Left || ctrlKey) {
          event.preventDefault();

          return /** UNUSED */;
        }

        return /** UNUSED */;
      },
    );

    const handleFocus = useComposedEvent(props.onFocus, (): void => {
      if (itemContext.disabled) {
        return /** UNUSED */;
      }

      focusableContext.onFocusableValueChange(itemContext.value);

      return /** UNUSED */;
    });

    return (
      <Collection.SlotItem
        scope={props.__scopeRadioGroup}
        value={itemContext.value}
      >
        <RadioTrigger
          {...rest}
          {...radioScope}
          ref={composedRefs}
          tabIndex={tabIndex}
          onPointerDown={handlePointerDown}
          onFocus={handleFocus}
        />
      </Collection.SlotItem>
    );
  }) as RadioGroupTriggerFC;

  RadioGroupTrigger.__ownerName = ownerName;

  return RadioGroupTrigger;
}

const RadioGroupTrigger: RadioGroupTriggerFC =
  createRadioGroupTrigger(OWNER_NAME);

export { RadioGroupTrigger, RadioGroupTrigger as Trigger };
export type { RadioGroupTriggerProps };

export { createRadioGroupTrigger };
export type { RadioGroupTriggerFC };
