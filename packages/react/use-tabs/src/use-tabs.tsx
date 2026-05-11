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

type TabsProps = {
  /**
   * The controlled value of the tab to activate.
   *
   * @note Must be used in conjunction with `onValueChange`.
   *
   * @default —
   */
  value?: string | null;
  /**
   * The value of the tab that should be active when initially
   * rendered.
   *
   * @note Use when you do **not** need to control the state of
   *       the tabs.
   *
   * @default —
   */
  defaultValue?: string | null;
  /**
   * Function that is invoked when the value changes.
   *
   * @default —
   */
  onValueChange?: (value: string | null) => void;
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

type TabsReturn = {
  /**
   * The current value of the active tab.
   */
  readonly value: string | null;
  /**
   * Function to handle changes to the value of the tabs.
   */
  onValueChange: (value: string | null) => void;
};

function useTabs(props: TabsProps): TabsReturn {
  let {
    value: _value,
    defaultValue: _defaultValue,
    onValueChange: _onValueChange,
    caller,
  } = props;

  let [value, setvalue] = useControlledState<string | null>({
    prop: _value,
    defaultProp: _defaultValue ?? null,
    onChange: _onValueChange,
    caller,
  });

  const onValueChange = (value: string | null): void => {
    setvalue(value);
  };

  return {
    value,
    onValueChange,
  };
}

export { useTabs };
export type { TabsProps, TabsReturn };
