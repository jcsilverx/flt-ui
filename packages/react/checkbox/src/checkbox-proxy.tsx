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
import { isIndeterminate } from "@flt-ui/react-use-checkbox";
import { useComposedRefs } from "@flt-ui/react-use-composed-refs";
import { useSize } from "@flt-ui/react-use-size";
import { usePrevious } from "@flt-ui/react-use-previous";

import { useCheckboxContext } from "./checkbox";

import type { Scope } from "@flt-ui/react-context-scope";
import type { Omit, PrimitiveProps } from "@flt-ui/react-primitive";

const OWNER_NAME = "Checkbox.Proxy";

type ScopedProps<P> = P & {
  __scopeCheckbox?: Scope;
};

type FC<P> = (props: P) => React.ReactNode;

type CheckboxProxyProps = Omit<
  PrimitiveProps<"input">,
  "checked" | "form"
> & {};

type CheckboxProxyFC = FC<CheckboxProxyProps> & {
  __ownerName?: string;
};

function createCheckboxProxy(ownerName: string): CheckboxProxyFC {
  const style = Object.freeze({
    position: "absolute",
    pointerEvents: "none",
    opacity: 0,
    margin: 0,
    transform: `translate3d(-100%, 0, 0)`,
  } as const) satisfies React.CSSProperties;

  const CheckboxProxy = ((
    props: ScopedProps<CheckboxProxyProps>,
  ): React.JSX.Element => {
    let { ref, ...rest } = props;

    let {
      checked,
      defaultChecked,
      disabled,
      required,
      name,
      value,
      control,
      form,
      bubbles,
    } = useCheckboxContext(OWNER_NAME, props.__scopeCheckbox);

    let [input, setInput] = React.useState<globalThis.HTMLInputElement | null>(
      null,
    );
    let composedRefs = useComposedRefs(ref, setInput);
    let size = useSize(control);
    let prevChecked = usePrevious(checked);

    React.useEffect(() => {
      if (input == null || !isHTMLInputElement(input)) {
        return /** UNUSED */;
      }

      let event = new globalThis.Event("change", { bubbles });

      if (prevChecked !== checked) {
        input.checked = getCheckedState(checked);
        input.indeterminate = isIndeterminate(checked);

        input.dispatchEvent(event);
      }
    }, [bubbles, checked, input, prevChecked]);

    return (
      <Primitive.input
        {...rest}
        ref={composedRefs}
        type="checkbox"
        aria-hidden={true}
        defaultChecked={getCheckedState(defaultChecked ?? checked)}
        tabIndex={-1}
        disabled={disabled}
        required={required}
        name={name}
        value={value}
        form={form}
        style={{
          ...style,
          ...size,
          ...props.style,
        }}
      />
    );
  }) as CheckboxProxyFC;

  CheckboxProxy.__ownerName = ownerName;

  return CheckboxProxy;
}

const CheckboxProxy: CheckboxProxyFC = createCheckboxProxy(OWNER_NAME);

const getCheckedState = (checked: boolean | "indeterminate"): boolean => {
  return isIndeterminate(checked) ? false : checked;
};

const isHTMLInputElement = (
  element: unknown,
): element is globalThis.HTMLInputElement => {
  return element instanceof globalThis.HTMLInputElement;
};

export { CheckboxProxy, CheckboxProxy as Proxy };
export type { CheckboxProxyProps };

export { createCheckboxProxy };
export type { CheckboxProxyFC };
