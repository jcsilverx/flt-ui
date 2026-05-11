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
import { useEvent } from "@flt-ui/react-use-event";

import { useUncontrolledState } from "./use-uncontrollable-state";

type State = "controlled" | "uncontrolled";

type Value = "defined" | "undefined";

type SetStateFn<T> = (prevState: T) => T;

type ControlledStateProps<T> = {
  /**
   * The controlled value of the component.
   *
   * @note Must be used in conjunction with `onChange`.
   *
   * @default —
   */
  prop?: T | undefined;
  /**
   * The value of the component when initially rendered.
   *
   * @note Use when you do **not** need to control the state
   *       of the component.
   *
   * @default —
   */
  defaultProp: T;
  /**
   * Function that is invoked when the state changes.
   *
   * @default —
   */
  onChange?: (state: T) => void;
  /**
   * The name of the caller that triggers warnings during state
   * transitions.
   *
   * @note This prop is primarily used for debugging purposes to
   *       identify which component is undergoing transitions between
   *       controlled and uncontrolled states.
   *
   * @default —
   */
  caller?: string;
};

type ControlledStateReturn<T> = readonly [
  T,
  React.Dispatch<React.SetStateAction<T>>,
];

function useControlledState<T>(
  props: ControlledStateProps<T>,
): ControlledStateReturn<T> {
  let { prop, defaultProp, onChange, caller } = props;

  let [internalProp, setInternalProp, onChangeRef] = useUncontrolledState<T>({
    defaultProp,
    onChange,
  });

  const isControlled = prop !== undefined;

  let isControlledRef = React.useRef<boolean>(isControlled);

  React.useEffect((): void => {
    let wasControlled = isControlledRef.current;

    if (
      wasControlled !== isControlled &&
      process.env.NODE_ENV !== "production"
    ) {
      let callerName = caller ?? "Anonymous";

      console.warn(
        `'${callerName}' component is changing from '${getState(wasControlled)}' to '${getState(isControlled)}'. ` +
          `This may be caused by the value changing from '${getValue(wasControlled)}' to a '${getValue(isControlled)}' value,` +
          ` which should not happen.`,
      );
    }

    isControlledRef.current = isControlled;
  }, [caller, isControlled]);

  let value = isControlled ? prop : internalProp;

  const setValue: React.Dispatch<React.SetStateAction<T>> = useEvent(
    (next): void => {
      let setter = next as SetStateFn<T>;
      let newValue = typeof next === "function" ? setter(value) : next;

      if (isControlled) {
        onChangeRef.current?.(newValue);
      } else {
        setInternalProp(newValue);
      }

      return void 0;
    },
  );

  return [value, setValue] as const;
}

const getState = (controlled: boolean): State => {
  return controlled ? "controlled" : "uncontrolled";
};

const getValue = (controlled: boolean): Value => {
  return controlled ? "defined" : "undefined";
};

export { useControlledState };
export type { ControlledStateProps, ControlledStateReturn };
