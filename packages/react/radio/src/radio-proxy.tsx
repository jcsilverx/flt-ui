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

import { useRadioContext } from "./radio";

import type { Scope } from "@flt-ui/react-context-scope";
import type { Omit, PrimitiveProps } from "@flt-ui/react-primitive";

const OWNER_NAME = "Radio.Proxy";

type ScopedProps<P> = P & {
  __scopeRadio?: Scope;
};

type FC<P> = (props: P) => React.ReactNode;

type RadioProxyProps = Omit<PrimitiveProps<"input">, "checked" | "form"> & {};

type RadioProxyFC = FC<RadioProxyProps> & {
  __ownerName?: string;
};

function createRadioProxy(ownerName: string): RadioProxyFC {
  let style = Object.freeze({
    position: "absolute",
    pointerEvents: "none",
    opacity: 0,
    margin: 0,
    transform: `translate3d(-100%, 0, 0)`,
  } as const) satisfies React.CSSProperties;

  const RadioProxy = ((
    props: ScopedProps<RadioProxyProps>,
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
    } = useRadioContext(OWNER_NAME, props.__scopeRadio);

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
        type="radio"
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
  }) as RadioProxyFC;

  RadioProxy.__ownerName = ownerName;

  return RadioProxy;
}

const RadioProxy: RadioProxyFC = createRadioProxy(OWNER_NAME);

const isHTMLInputElement = (
  element: unknown,
): element is globalThis.HTMLInputElement => {
  return element instanceof globalThis.HTMLInputElement;
};

export { RadioProxy, RadioProxy as Proxy };
export type { RadioProxyProps };

export { createRadioProxy };
export type { RadioProxyFC };
