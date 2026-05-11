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
import { useControlledState } from "@flt-ui/react-use-controlled-state";

type CheckboxProps = {
  /**
   * The controlled checked state of the checkbox.
   *
   * @note Must be used in conjunction with `onCheckedChange`.
   *
   * @default —
   */
  checked?: boolean | "indeterminate";
  /**
   * The checked state of the checkbox when initially rendered.
   *
   * @note Use when you do **not** need to control the checked
   *       state of the checkbox.
   *
   * @default —
   */
  defaultChecked?: boolean | "indeterminate";
  /**
   * Function that is invoked when the checked state changes.
   *
   * @default —
   */
  onCheckedChange?: (checked: boolean | "indeterminate") => void;
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

type CheckboxReturn = {
  /**
   * The checked state of the checkbox.
   */
  readonly checked: boolean | "indeterminate";
  /**
   * Function to handle changes to the checked state of the checkbox.
   */
  onCheckedChange: () => void;
  /**
   * Function to reset the checkbox to its initial checked state.
   */
  onResetChange: () => void;
};

function useCheckbox(props: CheckboxProps): CheckboxReturn {
  let {
    checked: _checked,
    defaultChecked: _defaultChecked,
    onCheckedChange: _onCheckedChange,
    caller,
  } = props;

  let [checked, setChecked] = useControlledState<boolean | "indeterminate">({
    prop: _checked,
    defaultProp: _defaultChecked ?? false,
    onChange: _onCheckedChange,
    caller,
  });
  let initialCheckedState = React.useRef<boolean | "indeterminate">(checked);

  const onCheckedChange = (): void => {
    setChecked((prevChecked): boolean => {
      return isIndeterminate(prevChecked) ? true : !prevChecked;
    });
  };

  const onResetChange = (): void => {
    setChecked(initialCheckedState.current);
  };

  return {
    checked,
    onCheckedChange,
    onResetChange,
  };
}

const isIndeterminate = (
  checked: boolean | "indeterminate",
): checked is "indeterminate" => {
  return checked === "indeterminate";
};

export { useCheckbox };
export type { CheckboxProps, CheckboxReturn };

export { isIndeterminate };
