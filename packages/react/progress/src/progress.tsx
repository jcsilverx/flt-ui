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
import { useProgress } from "@flt-ui/react-use-progress";
import { createContextScope } from "@flt-ui/react-context-scope";

import type * as React from "react";
import type { Scope } from "@flt-ui/react-context-scope";
import type { PrimitiveProps } from "@flt-ui/react-primitive";

const OWNER_NAME = "Progress";

type ScopedProps<P> = P & {
  __scopeProgress?: Scope;
};

const [createProgressContext, createProgressScope] =
  createContextScope(OWNER_NAME);

type ProgressContextValue = {
  value: number | null;
  min: number;
  max: number;
};

const [ProgressContext, useProgressContext] =
  createProgressContext<ProgressContextValue>(OWNER_NAME);

type ProgressLoadingStatus = "complete" | "indeterminate" | "loading";

type FC<P> = (props: P) => React.ReactNode;

type ProgressProps = PrimitiveProps<"div"> & {
  value?: number | null;
  min?: number;
  max?: number;
  getValueText?: (value: number, min: number, max: number) => string;
};

type ProgressFC = FC<ProgressProps> & {
  __ownerName?: string;
};

function createProgress(ownerName: string): ProgressFC {
  const Progress = ((props: ScopedProps<ProgressProps>): React.JSX.Element => {
    let {
      ref,
      value: _value = null,
      min: _min,
      max: _max,
      getValueText: _getValueText,
      ...rest
    } = props;

    let { value, valueText, min, max } = useProgress({
      value: _value,
      min: _min,
      max: _max,
      getValueText: _getValueText,
      caller: ownerName,
    });

    return (
      <ProgressContext.Provider
        scope={props.__scopeProgress}
        value={value}
        min={min}
        max={max}
      >
        <Primitive.div
          {...rest}
          ref={ref}
          role="progressbar"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value ?? undefined}
          aria-valuetext={valueText ?? undefined}
          data-flt-value={value ?? undefined}
          data-flt-state={getState(value, max)}
          data-flt-min={min}
          data-flt-max={max}
        />
      </ProgressContext.Provider>
    );
  }) as ProgressFC;

  Progress.__ownerName = ownerName;

  return Progress;
}

const Progress: ProgressFC = createProgress(OWNER_NAME);

const isIndeterminate = (value: number | null): value is null => {
  return value === null;
};

const getState = (value: number | null, max: number): ProgressLoadingStatus => {
  return isIndeterminate(value)
    ? "indeterminate"
    : value === max
      ? "complete"
      : "loading";
};

export { Progress, Progress as Root };
export type { ProgressProps };

export { createProgress, getState };
export type { ProgressFC };

export { createProgressScope, useProgressContext };
