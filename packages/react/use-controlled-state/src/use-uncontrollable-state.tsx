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
import { useLatestValue } from "@flt-ui/react-use-latest-value";

type UncontrolledStateProps<T> = {
  /**
   * The value of the component when initially rendered.
   *
   * @note Use when you do **not** need to control the state
   *       of the component.
   *
   * @default —
   */
  readonly defaultProp: T;
  /**
   * Function that is invoked when the state changes.
   *
   * @default —
   */
  onChange?: (state: T) => void;
};

type UncontrolledStateReturn<T> = readonly [
  T,
  React.Dispatch<React.SetStateAction<T>>,
  React.RefObject<((state: T) => void) | undefined>,
];

function useUncontrolledState<T>(
  props: UncontrolledStateProps<T>,
): UncontrolledStateReturn<T> {
  let { defaultProp, onChange } = props;

  let [value, setValue] = React.useState<T>(defaultProp);
  let prevValue = React.useRef<T>(value);

  let onChangeRef = useLatestValue(onChange);

  React.useEffect((): void => {
    if (prevValue.current !== value) {
      onChangeRef.current?.(value);

      prevValue.current = value;
    }
  }, [onChangeRef, value]);

  return [value, setValue, onChangeRef] as const;
}

export { useUncontrolledState };
