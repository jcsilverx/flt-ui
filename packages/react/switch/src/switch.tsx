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
import { useSwitch } from "@flt-ui/react-use-switch";
import { createUseId } from "@flt-ui/react-use-id";

import type { Scope } from "@flt-ui/react-context-scope";
import type { UseId } from "@flt-ui/react-use-id";

const OWNER_NAME = "Switch";

type ScopedProps<P> = P & {
  __scopeSwitch?: Scope;
};

const [createSwitchContext, createSwitchScope] = createContextScope(OWNER_NAME);

type SwitchContextValue = {
  id: string;
  checked: boolean;
  defaultChecked: boolean | undefined;
  onCheckedChange: () => void;
  disabled: true | undefined;
  required: boolean;
  name: string | undefined;
  value: string;
  control: globalThis.HTMLButtonElement | null;
  onControlChange: (control: globalThis.HTMLButtonElement | null) => void;
  form: string | undefined;
  bubbles: boolean;
};

const [SwitchContext, useSwitchContext] =
  createSwitchContext<SwitchContextValue>(OWNER_NAME);

type SwitchState = "checked" | "unchecked";

type FC<P> = (props: P) => React.ReactNode;

type PrimitiveProps = {
  children?: React.ReactNode;
};

type SwitchProps = PrimitiveProps & {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  value?: string;
  form?: string;
};

type SwitchFC = FC<SwitchProps> & {
  __ownerName?: string;
};

function createSwitch(ownerName: string): SwitchFC {
  const useId: UseId = createUseId();

  const Switch = ((props: ScopedProps<SwitchProps>): React.JSX.Element => {
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

    let { checked, onCheckedChange } = useSwitch({
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
      <SwitchContext.Provider
        scope={props.__scopeSwitch}
        id={id}
        checked={checked}
        defaultChecked={_defaultChecked}
        onCheckedChange={onCheckedChange}
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
      </SwitchContext.Provider>
    );
  }) as SwitchFC;

  Switch.__ownerName = ownerName;

  return Switch;
}

const Switch: SwitchFC = createSwitch(OWNER_NAME);

const getState = (checked: boolean): SwitchState => {
  return checked ? "checked" : "unchecked";
};

export { Switch, Switch as Root };
export type { SwitchProps };

export { createSwitch, getState };
export type { SwitchFC };

export { createSwitchScope, useSwitchContext };
