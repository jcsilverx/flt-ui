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

import { getState, useCheckboxContext } from "./checkbox";

import type * as React from "react";
import type { Scope } from "@flt-ui/react-context-scope";
import type { PrimitiveProps } from "@flt-ui/react-primitive";

const OWNER_NAME = "Checkbox.Indicator";

type ScopedProps<P> = P & {
  __scopeCheckbox?: Scope;
};

type FC<P> = (props: P) => React.ReactNode;

type CheckboxIndicatorProps = PrimitiveProps<"span"> & {};

type CheckboxIndicatorFC = FC<CheckboxIndicatorProps> & {
  __ownerName?: string;
};

function createCheckboxIndicator(ownerName: string): CheckboxIndicatorFC {
  const style = Object.freeze({
    pointerEvents: "none",
  } as const) satisfies React.CSSProperties;

  const CheckboxIndicator = ((
    props: ScopedProps<CheckboxIndicatorProps>,
  ): React.JSX.Element => {
    let { ref, ...rest } = props;

    let context = useCheckboxContext(OWNER_NAME, props.__scopeCheckbox);

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
        {context.checked && props.children}
      </Primitive.span>
    );
  }) as CheckboxIndicatorFC;

  CheckboxIndicator.__ownerName = ownerName;

  return CheckboxIndicator;
}

const CheckboxIndicator: CheckboxIndicatorFC =
  createCheckboxIndicator(OWNER_NAME);

export { CheckboxIndicator, CheckboxIndicator as Indicator };
export type { CheckboxIndicatorProps };

export { createCheckboxIndicator };
export type { CheckboxIndicatorFC };
