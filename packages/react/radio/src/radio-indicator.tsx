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

import { getState, useRadioContext } from "./radio";

import type * as React from "react";
import type { Scope } from "@flt-ui/react-context-scope";
import type { PrimitiveProps } from "@flt-ui/react-primitive";

const OWNER_NAME = "Radio.Indicator";

type ScopedProps<P> = P & {
  __scopeRadio?: Scope;
};

type FC<P> = (props: P) => React.ReactNode;

type RadioIndicatorProps = PrimitiveProps<"span"> & {
  persist?: true;
};

type RadioIndicatorFC = FC<RadioIndicatorProps> & {
  __ownerName?: string;
};

function createRadioIndicator(ownerName: string): RadioIndicatorFC {
  const style = Object.freeze({
    pointerEvents: "none",
  } as const) satisfies React.CSSProperties;

  const RadioIndicator = ((
    props: ScopedProps<RadioIndicatorProps>,
  ): React.JSX.Element => {
    let { ref, persist, ...rest } = props;

    let context = useRadioContext(OWNER_NAME, props.__scopeRadio);

    return (
      <Primitive.span
        {...rest}
        ref={ref}
        data-flt-state={getState(context.checked)}
        data-flt-disabled={context.disabled}
        style={{
          ...style,
          ...props.style,
        }}
      >
        {!persist ? context.checked && props.children : props.children}
      </Primitive.span>
    );
  }) as RadioIndicatorFC;

  RadioIndicator.__ownerName = ownerName;

  return RadioIndicator;
}

const RadioIndicator: RadioIndicatorFC = createRadioIndicator(OWNER_NAME);

export { RadioIndicator, RadioIndicator as Indicator };
export type { RadioIndicatorProps };

export { createRadioIndicator };
export type { RadioIndicatorFC };
