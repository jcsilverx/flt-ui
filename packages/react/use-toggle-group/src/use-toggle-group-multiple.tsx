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

import { useControlledState } from "@flt-ui/react-use-controlled-state";

type ToggleGroupMultipleProps = {
  /**
   * The controlled value of the item to press.
   *
   * @note Must be used in conjunction with `onValueChange`.
   *
   * @default —
   */
  value?: string[];
  /**
   * The value of the item to press when initially rendered.
   *
   * @note Use when you do **not** need to control the state
   *       of the items.
   *
   * @default —
   */
  defaultValue?: string[];
  /**
   * Function that is invoked when the pressed state of an
   * item changes.
   *
   * @default —
   */
  onValueChange?: (value: string[]) => void;
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

type ToggleGroupMultipleReturn = {
  /**
   * The currently pressed item in the toggle group.
   */
  readonly value: string[];
  /**
   * Function to activate a specific item in the toggle group.
   */
  onItemActivate: (itemValue: string) => void;
  /**
   * Function to deactivate a specific item in the toggle group.
   */
  onItemDeactivate: (itemValue: string) => void;
};

function useToggleGroupMultiple(
  props: ToggleGroupMultipleProps,
): ToggleGroupMultipleReturn {
  let {
    value: _value,
    defaultValue: _defaultValue,
    onValueChange: _onValueChange,
    caller,
  } = props;

  let [value, setValue] = useControlledState<string[]>({
    prop: _value,
    defaultProp: _defaultValue ?? [],
    onChange: _onValueChange,
    caller,
  });

  const onItemActivate = (itemValue: string): void => {
    setValue((prevValue = []): string[] => {
      return append(prevValue, itemValue);
    });
  };

  const onItemDeactivate = (itemValue: string): void => {
    setValue((prevValue = []): string[] => {
      return prevValue.filter((value): boolean => {
        return value !== itemValue;
      });
    });
  };

  return {
    value,
    onItemActivate,
    onItemDeactivate,
  };
}

const append = <T,>(init: readonly T[], end: T): T[] => [...init, end];

export { useToggleGroupMultiple };
export type { ToggleGroupMultipleProps, ToggleGroupMultipleReturn };
