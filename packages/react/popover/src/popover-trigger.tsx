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

import { getState, makeTriggerId, usePopoverContext } from "./popover";

import type * as React from "react";
import type { Scope } from "@flt-ui/react-context-scope";
import type { PrimitiveProps } from "@flt-ui/react-primitive";

const OWNER_NAME = "Popover.Trigger";

type ScopedProps<P> = P & {
  __scopePopover?: Scope;
};

type FC<P> = (props: P) => React.ReactNode;

type PopoverTriggerProps = PrimitiveProps<"button"> & {};

type PopoverTriggerFC = FC<PopoverTriggerProps> & {
  __ownerName?: string;
};

function createPopoverTrigger(ownerName: string): PopoverTriggerFC {
  const PopoverTrigger = ((
    props: ScopedProps<PopoverTriggerProps>,
  ): React.JSX.Element => {
    let { ref, ...rest } = props;

    let context = usePopoverContext(OWNER_NAME, props.__scopePopover);
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
  }) as PopoverTriggerFC;

  PopoverTrigger.__ownerName = ownerName;

  return PopoverTrigger;
}

const PopoverTrigger: PopoverTriggerFC = createPopoverTrigger(OWNER_NAME);

export { PopoverTrigger, PopoverTrigger as Trigger };
export type { PopoverTriggerProps };

export { createPopoverTrigger };
export type { PopoverTriggerFC };
