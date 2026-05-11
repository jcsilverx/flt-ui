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
import { useDialog as usePopoverState } from "@flt-ui/react-use-dialog";
import { createUseId } from "@flt-ui/react-use-id";

import type { Scope } from "@flt-ui/react-context-scope";
import type { IdString, UseId } from "@flt-ui/react-use-id";

const OWNER_NAME = "Popover";

type ScopedProps<P> = P & {
  __scopePopover?: Scope;
};

const [createPopoverContext, createPopoverScope] =
  createContextScope(OWNER_NAME);

type PopoverContextValue = {
  id: IdString;
  open: boolean;
  onOpenChange: () => void;
  onCloseChange: () => void;
  modal: boolean;
  trigger: HTMLButtonElement | null;
  onTriggerChange: (trigger: HTMLButtonElement | null) => void;
};

const [PopoverContext, usePopoverContext] =
  createPopoverContext<PopoverContextValue>(OWNER_NAME);

type PopoverState = "open" | "closed";

type FC<P> = (props: P) => React.ReactNode;

type PrimitiveProps = {
  children?: React.ReactNode;
};

type PopoverProps = PrimitiveProps & {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  modal?: boolean;
};

type PopoverFC = FC<PopoverProps> & {
  __ownerName?: string;
};

function createPopover(ownerName: string): PopoverFC {
  const useId: UseId = createUseId();

  const Popover = ((props: ScopedProps<PopoverProps>): React.JSX.Element => {
    let {
      open: _open,
      defaultOpen: _defaultOpen,
      onOpenChange: _onOpenChange,
      modal = false,
    } = props;

    let { open, onOpenChange, onCloseChange } = usePopoverState({
      open: _open,
      defaultOpen: _defaultOpen,
      onOpenChange: _onOpenChange,
      caller: ownerName,
    });

    let id = useId();
    let [trigger, setTrigger] = React.useState<HTMLButtonElement | null>(null);

    return (
      <PopoverContext.Provider
        scope={props.__scopePopover}
        id={id}
        open={open}
        onOpenChange={onOpenChange}
        onCloseChange={onCloseChange}
        modal={modal}
        trigger={trigger}
        onTriggerChange={setTrigger}
      >
        {props.children}
      </PopoverContext.Provider>
    );
  }) as PopoverFC;

  Popover.__ownerName = ownerName;

  return Popover;
}

const Popover: PopoverFC = createPopover(OWNER_NAME);

const getState = (open: boolean): PopoverState => {
  return open ? "open" : "closed";
};

const makeTriggerId = (id: string): `${string}-trigger` => {
  return `${id}-trigger`;
};

const makeDescriptionId = (id: string): `${string}-description` => {
  return `${id}-description`;
};

const makeCloseId = (id: string): `${string}-close` => {
  return `${id}-close`;
};

export { Popover, Popover as Root };
export type { PopoverProps };

export { createPopover, getState };
export type { PopoverFC };

export { createPopoverScope, usePopoverContext };

export { makeTriggerId, makeDescriptionId, makeCloseId };
