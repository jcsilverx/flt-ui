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

type DialogProps = {
  /**
   * The controlled open state of the dialog.
   *
   * @note Must be used in conjunction with `onOpenChange`.
   *
   * @default —
   */
  open?: boolean;
  /**
   * The open state of the dialog when initially rendered.
   *
   * @note Use when you do **not** need to control the open
   *       state of the dialog.
   *
   * @default —
   */
  defaultOpen?: boolean;
  /**
   * Function that is invoked when the open state changes.
   *
   * @default —
   */
  onOpenChange?: (open: boolean) => void;
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

type DialogReturn = {
  /**
   * The open state of the dialog.
   */
  readonly open: boolean;
  /**
   * Function to handle changes to the open state of the dialog.
   */
  onOpenChange: () => void;
  /**
   *  Function to close the dialog.
   */
  onCloseChange: () => void;
};

function useDialog(props: DialogProps): DialogReturn {
  let {
    open: _open,
    defaultOpen: _defaultOpen,
    onOpenChange: _onOpenChange,
    caller,
  } = props;

  let [open, setOpen] = useControlledState<boolean>({
    prop: _open,
    defaultProp: _defaultOpen ?? false,
    onChange: _onOpenChange,
    caller,
  });

  const onOpenChange = (): void => {
    setOpen((prevOpen): boolean => {
      return !prevOpen;
    });
  };

  const onCloseChange = (): void => {
    setOpen(false);
  };

  return {
    open,
    onOpenChange,
    onCloseChange,
  };
}

export { useDialog };
export type { DialogProps, DialogReturn };
