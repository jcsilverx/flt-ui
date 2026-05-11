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
import { omit, Primitive } from "@flt-ui/react-primitive";
import { useComposedEvent } from "@flt-ui/react-use-event";
import { useComposedRefs } from "@flt-ui/react-use-composed-refs";
import { KEYBOARD_KEY } from "@flt-ui/a11y";

import { getState, useRadioContext } from "./radio";

import type { Scope } from "@flt-ui/react-context-scope";
import type { Omit, PrimitiveProps } from "@flt-ui/react-primitive";

const OWNER_NAME = "Radio.Trigger";
const SELECTOR = "form";

type ScopedProps<P> = P & {
  __scopeRadio?: Scope;
};

type FC<P> = (props: P) => React.ReactNode;

type RadioTriggerProps = Omit<
  PrimitiveProps<"button">,
  "defaultChecked" | "disabled" | "name" | "value" | "form" | "aria-required"
> & {};

type RadioTriggerFC = FC<RadioTriggerProps> & {
  __ownerName?: string;
};

function createRadioTrigger(ownerName: string): RadioTriggerFC {
  const RadioTrigger = ((
    props: ScopedProps<RadioTriggerProps>,
  ): React.JSX.Element => {
    let { ref, ...rest } = props;

    let {
      id: _id,
      checked,
      onCheckedChange,
      disabled,
      // required,
      value,
      control,
      onControlChange,
      form: _form,
    } = useRadioContext(OWNER_NAME, props.__scopeRadio);

    let composedRefs = useComposedRefs(ref, onControlChange);
    let form = control?.closest(SELECTOR);
    let isWithinForm = control ? !!_form || !!form : true;
    let id = props.id ?? _id;

    let hasAriaRequired =
      "aria-required" in props && props["aria-required"] != null;

    React.useEffect(() => {
      if (process.env.NODE_ENV !== "production" && hasAriaRequired) {
        console.warn(
          `'${ownerName}': The attribute 'aria-required' is not supported by the role radio.`,
        );
      }
    }, [hasAriaRequired]);

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
        {...omit(rest, ["aria-required"])}
        ref={composedRefs}
        id={id}
        type="button"
        role="radio"
        aria-checked={checked}
        // aria-required={required} !! Note: The attribute `aria-required` is not supported by the role radio.
        data-flt-state={getState(checked)}
        data-flt-disabled={disabled}
        disabled={disabled}
        value={value}
        onKeyDown={handleKeyDown}
        onClick={handleClick}
      />
    );
  }) as RadioTriggerFC;

  RadioTrigger.__ownerName = ownerName;

  return RadioTrigger;
}

const RadioTrigger: RadioTriggerFC = createRadioTrigger(OWNER_NAME);

export { RadioTrigger, RadioTrigger as Trigger };
export type { RadioTriggerProps };

export { createRadioTrigger };
export type { RadioTriggerFC };
