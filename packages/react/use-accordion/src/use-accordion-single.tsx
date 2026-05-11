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

type AccordionSingleProps = {
  /**
   * The controlled value of the item to expand.
   *
   * @note Must be used in conjunction with `onValueChange`.
   *
   * @default —
   */
  value?: string | null;
  /**
   * The value of the item to expand when initially rendered.
   *
   * @note Use when you do **not** need to control the state
   *       of the accordion.
   *
   * @default —
   */
  defaultValue?: string | null;
  /**
   * Function that is invoked when the expanded state of an
   * item changes.
   *
   * @default —
   */
  onValueChange?: (value: string | null) => void;
  /**
   * Allows the content to be closed when the trigger for an
   * open item is clicked or pressed.
   *
   * @default false
   */
  collapsible?: boolean;
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

type AccordionSingleReturn = {
  /**
   * The currently expanded item in the accordion.
   */
  readonly value: string | null;
  /**
   * Function to open a specific item in the accordion.
   */
  onItemOpen: (itemValue: string) => void;
  /**
   * Function to close the currently expanded item in the accordion.
   */
  onItemClose: () => void;
};

function useAccordionSingle(
  props: AccordionSingleProps,
): AccordionSingleReturn {
  let {
    value: _value,
    defaultValue: _defaultValue,
    onValueChange: _onValueChange,
    collapsible,
    caller,
  } = props;

  let [value, setValue] = useControlledState<string | null>({
    prop: _value,
    defaultProp: _defaultValue ?? null,
    onChange: _onValueChange,
    caller,
  });

  const onItemOpen = (itemValue: string): void => {
    setValue(itemValue);
  };

  const onItemClose = (): void => {
    collapsible && setValue(null);
  };

  return {
    value,
    onItemOpen,
    onItemClose,
  };
}

export { useAccordionSingle };
export type { AccordionSingleProps, AccordionSingleReturn };
