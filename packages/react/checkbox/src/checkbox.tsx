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
import { createContextScope } from "@flt-ui/react-context-scope";
import { isIndeterminate, useCheckbox } from "@flt-ui/react-use-checkbox";
import { createUseId } from "@flt-ui/react-use-id";

import type { Scope } from "@flt-ui/react-context-scope";
import type { UseId } from "@flt-ui/react-use-id";

const OWNER_NAME = "Checkbox";

type ScopedProps<P> = P & {
  __scopeCheckbox?: Scope;
};

const [createCheckboxContext, createCheckboxScope] =
  createContextScope(OWNER_NAME);

type CheckboxContextValue = {
  id: string;
  checked: boolean | "indeterminate";
  defaultChecked: boolean | "indeterminate" | undefined;
  onCheckedChange: () => void;
  onResetChange: () => void;
  disabled: true | undefined;
  required: boolean;
  name: string | undefined;
  value: string;
  control: globalThis.HTMLButtonElement | null;
  onControlChange: (control: globalThis.HTMLButtonElement | null) => void;
  form: string | undefined;
  bubbles: boolean;
};

const [CheckboxContext, useCheckboxContext] =
  createCheckboxContext<CheckboxContextValue>(OWNER_NAME);

type CheckboxState = "indeterminate" | "checked" | "unchecked";

type FC<P> = (props: P) => React.ReactNode;

type PrimitiveProps = {
  children?: React.ReactNode;
};

type CheckboxProps = PrimitiveProps & {
  checked?: boolean | "indeterminate";
  defaultChecked?: boolean | "indeterminate";
  onCheckedChange?: (checked: boolean | "indeterminate") => void;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  value?: string;
  form?: string;
};

type CheckboxFC = FC<CheckboxProps> & {
  __ownerName?: string;
};

function createCheckbox(ownerName: string): CheckboxFC {
  const useId: UseId = createUseId();

  const Checkbox = ((props: ScopedProps<CheckboxProps>): React.JSX.Element => {
    let {
      checked: _checked,
      defaultChecked: _defaultChecked,
      onCheckedChange: _onCheckedChange,
      disabled: _disabled = false,
      required = false,
      name,
      value = "on",
      form,
    } = props;

    let { checked, onCheckedChange, onResetChange } = useCheckbox({
      checked: _checked,
      defaultChecked: _defaultChecked,
      onCheckedChange: _onCheckedChange,
      caller: ownerName,
    });

    let [control, setControl] =
      React.useState<globalThis.HTMLButtonElement | null>(null);
    let id = useId();
    let disabled = _disabled || undefined;

    return (
      <CheckboxContext.Provider
        scope={props.__scopeCheckbox}
        id={id}
        checked={checked}
        defaultChecked={_defaultChecked}
        onCheckedChange={onCheckedChange}
        onResetChange={onResetChange}
        disabled={disabled}
        required={required}
        name={name}
        value={value}
        control={control}
        onControlChange={setControl}
        form={form}
        bubbles={!!form}
      >
        {props.children}
      </CheckboxContext.Provider>
    );
  }) as CheckboxFC;

  Checkbox.__ownerName = ownerName;

  return Checkbox;
}

const Checkbox: CheckboxFC = createCheckbox(OWNER_NAME);

const getState = (checked: boolean | "indeterminate"): CheckboxState => {
  return isIndeterminate(checked)
    ? "indeterminate"
    : checked
      ? "checked"
      : "unchecked";
};

export { Checkbox, Checkbox as Root };
export type { CheckboxProps };

export { createCheckbox, getState };
export type { CheckboxFC };

export { createCheckboxScope, useCheckboxContext };
