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
import { useToggle } from "@flt-ui/react-use-toggle";
import { useComposedEvent } from "@flt-ui/react-use-event";

import type * as React from "react";
import type { PrimitiveProps } from "@flt-ui/react-primitive";

const OWNER_NAME = "Toggle";

type ToggleState = "on" | "off";

type FC<P> = (props: P) => React.ReactNode;

type ToggleProps = PrimitiveProps<"button"> & {
  pressed?: boolean;
  defaultPressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  disabled?: boolean;
};

type ToggleFC = FC<ToggleProps> & {
  __ownerName?: string;
};

function createToggle(ownerName: string): ToggleFC {
  const Toggle = ((props: ToggleProps): React.JSX.Element => {
    let {
      ref,
      pressed: _pressed,
      defaultPressed: _defaultPressed,
      onPressedChange: _onPressedChange,
      disabled: _disabled = false,
      ...rest
    } = props;

    let { pressed, onPressedChange } = useToggle({
      pressed: _pressed,
      defaultPressed: _defaultPressed,
      onPressedChange: _onPressedChange,
      caller: ownerName,
    });

    let disabled = _disabled || undefined;

    const handleClick = useComposedEvent(props.onClick, (): void => {
      if (disabled) {
        return /** UNUSED */;
      }

      onPressedChange();

      return /** UNUSED */;
    });

    return (
      <Primitive.button
        {...rest}
        ref={ref}
        type="button"
        // tabIndex={0}
        aria-pressed={pressed}
        data-flt-state={getState(pressed)}
        data-flt-disabled={disabled}
        onClick={handleClick}
      />
    );
  }) as ToggleFC;

  Toggle.__ownerName = ownerName;

  return Toggle;
}

const Toggle: ToggleFC = createToggle(OWNER_NAME);

const getState = (pressed: boolean): ToggleState => {
  return pressed ? "on" : "off";
};

export { Toggle, Toggle as Root };
export type { ToggleProps };

export { createToggle };
export type { ToggleFC };
