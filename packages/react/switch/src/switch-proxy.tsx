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
import { useSize } from "@flt-ui/react-use-size";
import { usePrevious } from "@flt-ui/react-use-previous";

import { useSwitchContext } from "./switch";

import type { Scope } from "@flt-ui/react-context-scope";
import type { Omit, PrimitiveProps } from "@flt-ui/react-primitive";

const OWNER_NAME = "Switch.Proxy";

type ScopedProps<P> = P & {
  __scopeSwitch?: Scope;
};

type FC<P> = (props: P) => React.ReactNode;

type SwitchProxyProps = Omit<PrimitiveProps<"input">, "checked" | "form"> & {};

type SwitchProxyFC = FC<SwitchProxyProps> & {
  __ownerName?: string;
};

function createSwitchProxy(ownerName: string): SwitchProxyFC {
  let style = Object.freeze({
    position: "absolute",
    pointerEvents: "none",
    opacity: 0,
    margin: 0,
    transform: `translate3d(-100%, 0, 0)`,
  } as const) satisfies React.CSSProperties;

  const SwitchProxy = ((
    props: ScopedProps<SwitchProxyProps>,
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
    } = useSwitchContext(OWNER_NAME, props.__scopeSwitch);

    let [input, setInput] = React.useState<globalThis.HTMLInputElement | null>(
      null,
    );
    let composedRefs = useComposedRefs(ref, setInput);
    let size = useSize(control);
    let prevChecked = usePrevious(checked);

    React.useEffect((): void => {
      if (input == null || !isHTMLInputElement(input)) {
        return /** UNUSED */;
      }

      let event = new Event("change", { bubbles });

      if (prevChecked !== checked) {
        input.checked = checked;

        input.dispatchEvent(event);
      }
    }, [bubbles, checked, input, prevChecked]);

    return (
      <Primitive.input
        {...rest}
        ref={composedRefs}
        type="checkbox"
        aria-hidden={true}
        defaultChecked={defaultChecked ?? checked}
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
  }) as SwitchProxyFC;

  SwitchProxy.__ownerName = ownerName;

  return SwitchProxy;
}

const SwitchProxy: SwitchProxyFC = createSwitchProxy(OWNER_NAME);

const isHTMLInputElement = (
  element: unknown,
): element is globalThis.HTMLInputElement => {
  return element instanceof globalThis.HTMLInputElement;
};

export { SwitchProxy, SwitchProxy as Proxy };
export type { SwitchProxyProps };

export { createSwitchProxy };
export type { SwitchProxyFC };
