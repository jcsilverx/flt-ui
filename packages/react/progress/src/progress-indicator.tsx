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

import { getState, useProgressContext } from "./progress";

import type * as React from "react";
import type { Scope } from "@flt-ui/react-context-scope";
import type { PrimitiveProps } from "@flt-ui/react-primitive";

const OWNER_NAME = "Progress.Indicator";

type ScopedProps<P> = P & {
  __scopeProgress?: Scope;
};

type FC<P> = (props: P) => React.ReactNode;

type ProgressIndicatorProps = PrimitiveProps<"div"> & {};

type ProgressIndicatorFC = FC<ProgressIndicatorProps> & {
  __ownerName?: string;
};

function createProgressIndicator(ownerName: string): ProgressIndicatorFC {
  const style = Object.freeze({
    pointerEvents: "none",
  } as const) satisfies React.CSSProperties;

  const ProgressIndicator = ((
    props: ScopedProps<ProgressIndicatorProps>,
  ): React.JSX.Element => {
    let { ref, ...rest } = props;

    const context = useProgressContext(OWNER_NAME, props.__scopeProgress);

    return (
      <Primitive.div
        {...rest}
        ref={ref}
        data-flt-state={getState(context.value, context.max)}
        data-flt-value={context.value}
        data-flt-min={context.min}
        data-flt-max={context.max}
        style={{
          ...style,
          ...props.style,
        }}
      />
    );
  }) as ProgressIndicatorFC;

  ProgressIndicator.__ownerName = ownerName;

  return ProgressIndicator;
}

const ProgressIndicator: ProgressIndicatorFC =
  createProgressIndicator(OWNER_NAME);

export { ProgressIndicator, ProgressIndicator as Indicator };
export type { ProgressIndicatorProps };

export { createProgressIndicator };
export type { ProgressIndicatorFC };
