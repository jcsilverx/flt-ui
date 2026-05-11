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

import { useMeterContext } from "./meter";

import type * as React from "react";
import type { Scope } from "@flt-ui/react-context-scope";
import type { PrimitiveProps } from "@flt-ui/react-primitive";

const OWNER_NAME = "Meter.Indicator";

type ScopedProps<P> = P & {
  __scopeMeter?: Scope;
};

type FC<P> = (props: P) => React.ReactNode;

type MeterIndicatorProps = PrimitiveProps<"div"> & {};

type MeterIndicatorFC = FC<MeterIndicatorProps> & {
  __ownerName?: string;
};

function createMeterIndicator(ownerName: string): MeterIndicatorFC {
  const style = Object.freeze({
    pointerEvents: "none",
  } as const) satisfies React.CSSProperties;

  const MeterIndicator = ((
    props: ScopedProps<MeterIndicatorProps>,
  ): React.JSX.Element => {
    let { ref, ...rest } = props;

    const context = useMeterContext(OWNER_NAME, props.__scopeMeter);

    return (
      <Primitive.div
        {...rest}
        ref={ref}
        data-flt-value={context.value}
        data-flt-min={context.min}
        data-flt-max={context.max}
        style={{
          ...style,
          ...props.style,
        }}
      />
    );
  }) as MeterIndicatorFC;

  MeterIndicator.__ownerName = ownerName;

  return MeterIndicator;
}

const MeterIndicator: MeterIndicatorFC = createMeterIndicator(OWNER_NAME);

export { MeterIndicator, MeterIndicator as Indicator };
export type { MeterIndicatorProps };

export { createMeterIndicator };
export type { MeterIndicatorFC };
