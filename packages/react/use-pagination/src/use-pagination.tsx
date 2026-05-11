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

const DEFAULT_MIN_VALUE = 1;

type PaginationProps = {
  /**
   * The controlled value of the pagination.
   *
   * @note Must be used in conjunction with `onValueChange`.
   *
   * @default —
   */
  value?: number;
  /**
   * The value of the pagination when initially rendered.
   *
   * @note Use when you do **not** need to control the state
   *       of the pagination.
   *
   * @default —
   */
  defaultValue?: number;
  /**
   * Function that is invoked when the value changes.
   *
   * @default —
   */
  onValueChange?: (value: number) => void;
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
  /**
   * The total number of pages.
   *
   * @default —
   */
  totalPages: number;
};

type PaginationReturn = {
  /**
   * The current page number.
   */
  readonly value: number;
  /**
   * Function to set the page to the first page.
   */
  onFirstChange: () => void;
  /**
   * Function to set the page to the last page.
   */
  onLastChange: () => void;
  /**
   * Function to decrement the page to the previous page.
   */
  onPrevChange: () => void;
  /**
   * Function to increment the page to the next page.
   */
  onNextChange: () => void;
  /**
   * Function to select a specific page.
   */
  onSelectChange: (newValue: number) => void;
};

function usePagination(props: PaginationProps): PaginationReturn {
  let {
    value: _value,
    defaultValue: _defaultValue,
    onValueChange: _onValueChange,
    caller,
    totalPages,
  } = props;

  let [value, setValue] = useControlledState<number>({
    prop: _value,
    defaultProp: _defaultValue ?? DEFAULT_MIN_VALUE,
    onChange: _onValueChange,
    caller,
  });

  const paginate = (newDirection: number): void => {
    setValue(value + newDirection);
  };

  const onFirstChange = (): void => {
    setValue(1);
  };

  const onLastChange = (): void => {
    setValue(totalPages);
  };

  const onPrevChange = (): void => {
    paginate(-1);
  };

  const onNextChange = (): void => {
    paginate(1);
  };

  const onSelectChange = (newValue: number): void => {
    setValue(newValue);
  };

  return {
    value,
    onFirstChange,
    onLastChange,
    onPrevChange,
    onNextChange,
    onSelectChange,
  };
}

export { usePagination };
export type { PaginationProps, PaginationReturn };
