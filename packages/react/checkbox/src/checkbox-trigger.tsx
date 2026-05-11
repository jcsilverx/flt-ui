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
import { isIndeterminate } from "@flt-ui/react-use-checkbox";
import { useComposedEvent, useEventListener } from "@flt-ui/react-use-event";
import { useComposedRefs } from "@flt-ui/react-use-composed-refs";
import { KEYBOARD_KEY } from "@flt-ui/a11y";

import { getState, useCheckboxContext } from "./checkbox";

import type * as React from "react";
import type { Scope } from "@flt-ui/react-context-scope";
import type { Omit, PrimitiveProps } from "@flt-ui/react-primitive";

const OWNER_NAME = "Checkbox.Trigger";
const SELECTOR = "form";

type ScopedProps<P> = P & {
  __scopeCheckbox?: Scope;
};

type FC<P> = (props: P) => React.ReactNode;

type CheckboxTriggerProps = Omit<
  PrimitiveProps<"button">,
  "defaultChecked" | "disabled" | "name" | "value" | "form"
> & {};

type CheckboxTriggerFC = FC<CheckboxTriggerProps> & {
  __ownerName?: string;
};

function createCheckboxTrigger(ownerName: string): CheckboxTriggerFC {
  const CheckboxTrigger = ((
    props: ScopedProps<CheckboxTriggerProps>,
  ): React.JSX.Element => {
    let { ref, ...rest } = props;

    let {
      id: _id,
      checked,
      onCheckedChange,
      onResetChange,
      disabled,
      required,
      value,
      control,
      onControlChange,
      form: _form,
    } = useCheckboxContext(OWNER_NAME, props.__scopeCheckbox);

    let composedRefs = useComposedRefs(ref, onControlChange);
    let form = control?.closest(SELECTOR);
    let isWithinForm = control ? !!_form || !!form : true;
    let id = props.id ?? _id;

    useEventListener(form, "reset", onResetChange);

    const handleKeyDown = useComposedEvent(props.onKeyDown, (event): void => {
      let { key } = event;

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
        aria-checked={isIndeterminate(checked) ? "mixed" : checked}
        aria-required={required}
        data-flt-state={getState(checked)}
        data-flt-disabled={disabled}
        disabled={disabled}
        value={value}
        onKeyDown={handleKeyDown}
        onClick={handleClick}
      />
    );
  }) as CheckboxTriggerFC;

  CheckboxTrigger.__ownerName = ownerName;

  return CheckboxTrigger;
}

const CheckboxTrigger: CheckboxTriggerFC = createCheckboxTrigger(OWNER_NAME);

export { CheckboxTrigger, CheckboxTrigger as Trigger };
export type { CheckboxTriggerProps };

export { createCheckboxTrigger };
export type { CheckboxTriggerFC };
