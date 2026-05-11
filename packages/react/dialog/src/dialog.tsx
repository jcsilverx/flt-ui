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
import { useDialog } from "@flt-ui/react-use-dialog";
import { createUseId } from "@flt-ui/react-use-id";

import type { Scope } from "@flt-ui/react-context-scope";
import type { IdString, UseId } from "@flt-ui/react-use-id";

const OWNER_NAME = "Dialog";

type ScopedProps<P> = P & {
  __scopeDialog?: Scope;
};

const [createDialogContext, createDialogScope] = createContextScope(OWNER_NAME);

type DialogContextValue = {
  id: IdString;
  open: boolean;
  onOpenChange: () => void;
  onCloseChange: () => void;
  modal: boolean;
  trigger: HTMLButtonElement | null;
  onTriggerChange: (trigger: HTMLButtonElement | null) => void;
};

const [DialogContext, useDialogContext] =
  createDialogContext<DialogContextValue>(OWNER_NAME);

type DialogState = "open" | "closed";

type FC<P> = (props: P) => React.ReactNode;

type PrimitiveProps = {
  children?: React.ReactNode;
};

type DialogProps = PrimitiveProps & {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  modal?: boolean;
};

type DialogFC = FC<DialogProps> & {
  __ownerName?: string;
};

function createDialog(ownerName: string): DialogFC {
  const useId: UseId = createUseId();

  const Dialog = ((props: ScopedProps<DialogProps>): React.JSX.Element => {
    let {
      open: _open,
      defaultOpen: _defaultOpen,
      onOpenChange: _onOpenChange,
      modal = true,
    } = props;

    let { open, onOpenChange, onCloseChange } = useDialog({
      open: _open,
      defaultOpen: _defaultOpen,
      onOpenChange: _onOpenChange,
      caller: ownerName,
    });

    let id = useId();
    let [trigger, setTrigger] = React.useState<HTMLButtonElement | null>(null);

    return (
      <DialogContext.Provider
        scope={props.__scopeDialog}
        id={id}
        open={open}
        onOpenChange={onOpenChange}
        onCloseChange={onCloseChange}
        modal={modal}
        trigger={trigger}
        onTriggerChange={setTrigger}
      >
        {props.children}
      </DialogContext.Provider>
    );
  }) as DialogFC;

  Dialog.__ownerName = ownerName;

  return Dialog;
}

const Dialog: DialogFC = createDialog(OWNER_NAME);

const getState = (open: boolean): DialogState => {
  return open ? "open" : "closed";
};

const makeTriggerId = (id: string): `${string}-trigger` => {
  return `${id}-trigger`;
};

const makeTitleId = (id: string): `${string}-title` => {
  return `${id}-title`;
};

const makeDescriptionId = (id: string): `${string}-description` => {
  return `${id}-description`;
};

const makeCloseId = (id: string): `${string}-close` => {
  return `${id}-close`;
};

export { Dialog, Dialog as Root };
export type { DialogProps };

export {
  createDialog,
  getState,
  makeTitleId,
  makeDescriptionId,
  makeTriggerId,
  makeCloseId,
};
export type { DialogFC };

export { createDialogScope, useDialogContext };
