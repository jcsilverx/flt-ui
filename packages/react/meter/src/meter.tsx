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
import { useProgress as useMeter } from "@flt-ui/react-use-progress";
import { createContextScope } from "@flt-ui/react-context-scope";

import type * as React from "react";
import type { Scope } from "@flt-ui/react-context-scope";
import type { PrimitiveProps } from "@flt-ui/react-primitive";

const OWNER_NAME = "Meter";

type ScopedProps<P> = P & {
  __scopeMeter?: Scope;
};

const [createMeterContext, createMeterScope] = createContextScope(OWNER_NAME);

type MeterContextValue = {
  value: number | null;
  min: number;
  max: number;
};

const [MeterContext, useMeterContext] =
  createMeterContext<MeterContextValue>(OWNER_NAME);

type FC<P> = (props: P) => React.ReactNode;

type MeterProps = PrimitiveProps<"div"> & {
  value?: number | null;
  min?: number;
  max?: number;
  getValueText?: (value: number, min: number, max: number) => string;
};

type MeterFC = FC<MeterProps> & {
  __ownerName?: string;
};

function createMeter(ownerName: string): MeterFC {
  const Meter = ((props: ScopedProps<MeterProps>): React.JSX.Element => {
    let {
      ref,
      value: _value = null,
      min: _min,
      max: _max,
      getValueText: _getValueText,
      ...rest
    } = props;

    let { value, valueText, min, max } = useMeter({
      value: _value,
      min: _min,
      max: _max,
      getValueText: _getValueText,
      caller: ownerName,
    });

    return (
      <MeterContext.Provider
        scope={props.__scopeMeter}
        value={value}
        min={min}
        max={max}
      >
        <Primitive.div
          {...rest}
          ref={ref}
          role="meter progressbar"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value ?? undefined}
          aria-valuetext={valueText ?? undefined}
          data-flt-value={value ?? undefined}
          data-flt-min={min}
          data-flt-max={max}
        />
      </MeterContext.Provider>
    );
  }) as MeterFC;

  Meter.__ownerName = ownerName;

  return Meter;
}

const Meter: MeterFC = createMeter(OWNER_NAME);

export { Meter, Meter as Root };
export type { MeterProps };

export { createMeter };
export type { MeterFC };

export { createMeterScope, useMeterContext };
