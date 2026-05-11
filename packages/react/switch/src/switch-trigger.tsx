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

import { Primitive } from "@flt-ui/react-primitive";
import { useComposedEvent } from "@flt-ui/react-use-event";
import { useComposedRefs } from "@flt-ui/react-use-composed-refs";
import { KEYBOARD_KEY } from "@flt-ui/a11y";

import { getState, useSwitchContext } from "./switch";

import type * as React from "react";
import type { Scope } from "@flt-ui/react-context-scope";
import type { Omit, PrimitiveProps } from "@flt-ui/react-primitive";

const OWNER_NAME = "Switch.Trigger";
const SELECTOR = "form";

type ScopedProps<P> = P & {
  __scopeSwitch?: Scope;
};

type FC<P> = (props: P) => React.ReactNode;

type SwitchTriggerProps = Omit<
  PrimitiveProps<"button">,
  "defaultChecked" | "disabled" | "name" | "value" | "form"
> & {};

type SwitchTriggerFC = FC<SwitchTriggerProps> & {
  __ownerName?: string;
};

function createSwitchTrigger(ownerName: string): SwitchTriggerFC {
  const SwitchTrigger = ((
    props: ScopedProps<SwitchTriggerProps>,
  ): React.JSX.Element => {
    let { ref, ...rest } = props;

    let {
      id: _id,
      checked,
      onCheckedChange,
      disabled,
      required,
      value,
      control,
      onControlChange,
      form: _form,
    } = useSwitchContext(OWNER_NAME, props.__scopeSwitch);

    let composedRefs = useComposedRefs(ref, onControlChange);
    let form = control?.closest(SELECTOR);
    let isWithinForm = control ? !!_form || !!form : true;
    let id = props.id ?? _id;

    const handleKeyDown = useComposedEvent(props.onKeyDown, (event): void => {
      let key = event.key;

      if (disabled) {
        return /** UNUSED */;
      }

      if (key === KEYBOARD_KEY.Enter) {
        event.preventDefault();
      }

      return /** UNUSED */;
    });

    const handleClick = useComposedEvent(props.onClick, (event): void => {
      if (disabled) {
        return /** UNUSED */;
      }

      if (isWithinForm) {
        event.stopPropagation();
      }

      onCheckedChange();

      return /** UNUSED */;
    });

    return (
      <Primitive.button
        {...rest}
        ref={composedRefs}
        id={id}
        type="button"
        role="checkbox"
        aria-checked={checked}
        aria-required={required}
        data-flt-state={getState(checked)}
        data-flt-disabled={disabled}
        disabled={disabled}
        value={value}
        onKeyDown={handleKeyDown}
        onClick={handleClick}
      />
    );
  }) as SwitchTriggerFC;

  SwitchTrigger.__ownerName = ownerName;

  return SwitchTrigger;
}

const SwitchTrigger: SwitchTriggerFC = createSwitchTrigger(OWNER_NAME);

export { SwitchTrigger, SwitchTrigger as Trigger };
export type { SwitchTriggerProps };

export { createSwitchTrigger };
export type { SwitchTriggerFC };
