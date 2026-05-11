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
import { useFromTabSequence } from "@flt-ui/react-use-from-tab-sequence";
import { MOUSE_BUTTON } from "@flt-ui/a11y";

import {
  Collection,
  getState,
  makeContentId,
  makeTriggerId,
  useTabsContext,
} from "./tabs";
import { useFocusableContext } from "./tabs-list";

import type { Scope } from "@flt-ui/react-context-scope";
import type { Omit, PrimitiveProps } from "@flt-ui/react-primitive";

const OWNER_NAME = "Tabs.Trigger";
const TABS_TRIGGER_KEYS = [" ", "Enter"];

type ScopedProps<P> = P & {
  __scopeTabs?: Scope;
};

type FC<P> = (props: P) => React.ReactNode;

type TabsTriggerProps = Omit<PrimitiveProps<"button">, "value" | "disabled"> & {
  value: string;
  disabled?: boolean;
};

type TabsTriggerFC = FC<TabsTriggerProps> & {
  __ownerName?: string;
};

function createTabsTrigger(ownerName: string): TabsTriggerFC {
  const TabsTrigger = ((
    props: ScopedProps<TabsTriggerProps>,
  ): React.JSX.Element => {
    let { ref, value, disabled: _disabled = false, ...rest } = props;

    let node = React.useRef<globalThis.HTMLButtonElement>(null);
    let composedRefs = useComposedRefs(ref, node);
    let context = useTabsContext(OWNER_NAME, props.__scopeTabs);
    let focusableContext = useFocusableContext(OWNER_NAME, props.__scopeTabs);

    let selected = context.value != null && value === context.value;
    let focused =
      context.value == null &&
      (value === focusableContext.focusableValue ||
        focusableContext.focusableValue == null);

    let fromTabSequence = useFromTabSequence(selected || focused);

    let triggerId = makeTriggerId(context.id, value);
    let contentId = makeContentId(context.id, value);

    let disabled = _disabled || undefined;
    let tabIndex = fromTabSequence.getTabIndex(disabled) ?? undefined;

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

    const handleClick = useComposedEvent(props.onClick, (): void => {
      if (disabled) {
        return /** UNUSED */;
      }

      context.onValueChange(value);

      return /** UNUSED */;
    });

    const handleKeyDown = useComposedEvent(props.onKeyDown, (event): void => {
      let { key } = event;

      if (disabled || context.mode !== "manual") {
        return /** UNUSED */;
      }

      if (!TABS_TRIGGER_KEYS.includes(key)) {
        return /** UNUSED */;
      }

      context.onValueChange(value);

      return /** UNUSED */;
    });

    const handleFocus = useComposedEvent(props.onFocus, (): void => {
      if (disabled) {
        return /** UNUSED */;
      }

      focusableContext.onFocusableValueChange(value);

      return /** UNUSED */;
    });

    return (
      <Collection.SlotItem scope={props.__scopeTabs} value={value}>
        <Primitive.button
          {...rest}
          ref={composedRefs}
          id={triggerId}
          type="button"
          role="tab"
          tabIndex={tabIndex}
          aria-selected={selected}
          aria-controls={contentId}
          data-flt-state={getState(selected)}
          data-flt-disabled={disabled}
          disabled={disabled}
          onPointerDown={handlePointerDown}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
        />
      </Collection.SlotItem>
    );
  }) as TabsTriggerFC;

  TabsTrigger.__ownerName = ownerName;

  return TabsTrigger;
}

const TabsTrigger: TabsTriggerFC = createTabsTrigger(OWNER_NAME);

export { TabsTrigger, TabsTrigger as Trigger };
export type { TabsTriggerProps };

export { createTabsTrigger };
export type { TabsTriggerFC };
