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
import { useComposedEvent } from "@flt-ui/react-use-event";
import { useComposedRefs } from "@flt-ui/react-use-composed-refs";

import { getState, makeTriggerId, useDialogContext } from "./dialog";

import type * as React from "react";
import type { Scope } from "@flt-ui/react-context-scope";
import type { PrimitiveProps } from "@flt-ui/react-primitive";

const OWNER_NAME = "Dialog.Trigger";

type ScopedProps<P> = P & {
  __scopeDialog?: Scope;
};

type FC<P> = (props: P) => React.ReactNode;

type DialogTriggerProps = PrimitiveProps<"button"> & {};

type DialogTriggerFC = FC<DialogTriggerProps> & {
  __ownerName?: string;
};

function createDialogTrigger(ownerName: string): DialogTriggerFC {
  const DialogTrigger = ((
    props: ScopedProps<DialogTriggerProps>,
  ): React.JSX.Element => {
    let { ref, ...rest } = props;

    let context = useDialogContext(OWNER_NAME, props.__scopeDialog);
    let composedRefs = useComposedRefs(ref, context.onTriggerChange);

    let triggerId = makeTriggerId(context.id);

    const handleClick = useComposedEvent(props.onClick, (): void => {
      context.onOpenChange();

      return /** UNUSED */;
    });

    return (
      <Primitive.button
        {...rest}
        ref={composedRefs}
        type="button"
        id={triggerId}
        tabIndex={0}
        aria-haspopup="dialog"
        aria-expanded={context.open}
        aria-controls={context.id}
        data-flt-state={getState(context.open)}
        onClick={handleClick}
      />
    );
  }) as DialogTriggerFC;

  DialogTrigger.__ownerName = ownerName;

  return DialogTrigger;
}

const DialogTrigger: DialogTriggerFC = createDialogTrigger(OWNER_NAME);

export { DialogTrigger, DialogTrigger as Trigger };
export type { DialogTriggerProps };

export { createDialogTrigger };
export type { DialogTriggerFC };
