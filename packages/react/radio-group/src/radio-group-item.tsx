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

import { createRadio } from "@flt-ui/react-radio";

import {
  createRadioGroupContext,
  useRadioGroupContext,
  useRadioScope,
} from "./radio-group";

import type * as React from "react";
import type { Scope } from "@flt-ui/react-context-scope";
import type { Omit } from "@flt-ui/react-primitive";
import type { RadioFC, RadioProps } from "@flt-ui/react-radio";

const OWNER_NAME = "RadioGroup.Item";

type ScopedProps<P> = P & {
  __scopeRadioGroup?: Scope;
};

type RadioGroupItemContextValue = {
  value: string;
  disabled: boolean;
};

const [RadioGroupItemContext, useRadioGroupItemContext] =
  createRadioGroupContext<RadioGroupItemContextValue>(OWNER_NAME);

type FC<P> = (props: P) => React.ReactNode;

type RadioGroupItemProps = Omit<
  RadioProps,
  | "checked"
  | "defaultChecked"
  | "onCheckedChange"
  | "disabled"
  | "required"
  | "name"
  | "value"
  | "form"
> & {
  value: string;
  disabled?: boolean;
  required?: boolean;
};

type RadioGroupItemFC = FC<RadioGroupItemProps> & {
  __ownerName?: string;
};

function createRadioGroupItem(ownerName: string): RadioGroupItemFC {
  const Radio: RadioFC = createRadio(ownerName);

  const RadioGroupItem = ((
    props: ScopedProps<RadioGroupItemProps>,
  ): React.JSX.Element => {
    let {
      value,
      disabled: _disabled = false,
      required: _required = false,
      ...rest
    } = props;

    let context = useRadioGroupContext(OWNER_NAME, props.__scopeRadioGroup);
    let radioScope = useRadioScope(props.__scopeRadioGroup);

    let checked = context.value != null && value === context.value;
    let disabled = context.disabled ?? _disabled;
    let required = context.required || _required;

    const handleCheckedChange = (): void => {
      if (disabled) {
        return /** UNUSED */;
      }

      context.onValueChange(value);

      return /** UNUSED */;
    };

    return (
      <RadioGroupItemContext.Provider
        scope={props.__scopeRadioGroup}
        value={value}
        disabled={disabled}
      >
        <Radio
          {...radioScope}
          {...rest}
          checked={checked}
          onCheckedChange={handleCheckedChange}
          disabled={disabled}
          required={required}
          name={context.name}
          value={value}
          form={context.form}
        />
      </RadioGroupItemContext.Provider>
    );
  }) as RadioGroupItemFC;

  RadioGroupItem.__ownerName = ownerName;

  return RadioGroupItem;
}

const RadioGroupItem: RadioGroupItemFC = createRadioGroupItem(OWNER_NAME);

export { RadioGroupItem, RadioGroupItem as Item };
export type { RadioGroupItemProps };

export { createRadioGroupItem };
export type { RadioGroupItemFC };

export { useRadioGroupItemContext };
