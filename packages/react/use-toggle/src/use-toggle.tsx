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

type ToggleProps = {
  /**
   * The controlled pressed state of the toggle.
   *
   * @note Must be used in conjunction with `onPressedChange`.
   *
   * @default —
   */
  pressed?: boolean;
  /**
   * The pressed state of the toggle when initially rendered.
   *
   * @note Use when you do **not** need to control the pressed
   *       state of the toggle.
   *
   * @default —
   */
  defaultPressed?: boolean;
  /**
   * Function that is invoked when the pressed state changes.
   *
   * @default —
   */
  onPressedChange?: (pressed: boolean) => void;
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

type ToggleReturn = {
  /**
   * The pressed state of the toggle.
   */
  readonly pressed: boolean;
  /**
   * Function to handle changes to the pressed state of the toggle.
   */
  onPressedChange: () => void;
};

function useToggle(props: ToggleProps): ToggleReturn {
  let {
    pressed: _pressed,
    defaultPressed: _defaultPressed,
    onPressedChange: _onPressedChange,
    caller,
  } = props;

  let [pressed, setPressed] = useControlledState<boolean>({
    prop: _pressed,
    defaultProp: _defaultPressed ?? false,
    onChange: _onPressedChange,
    caller,
  });

  const onPressedChange = (): void => {
    setPressed(!pressed);
  };

  return {
    pressed,
    onPressedChange,
  };
}

export { useToggle };
export type { ToggleProps, ToggleReturn };
