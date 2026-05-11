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

import { makeCloseId, usePopoverContext } from "./popover";

import type * as React from "react";
import type { Scope } from "@flt-ui/react-context-scope";
import type { PrimitiveProps } from "@flt-ui/react-primitive";

const OWNER_NAME = "Popover.Close";

type ScopedProps<P> = P & {
  __scopePopover?: Scope;
};

type FC<P> = (props: P) => React.ReactNode;

type PopoverCloseProps = PrimitiveProps<"button"> & {};

type PopoverCloseFC = FC<PopoverCloseProps> & {
  __ownerName?: string;
};

function createPopoverClose(ownerName: string): PopoverCloseFC {
  const PopoverClose = ((
    props: ScopedProps<PopoverCloseProps>,
  ): React.JSX.Element => {
    let { ref, ...rest } = props;

    let context = usePopoverContext(OWNER_NAME, props.__scopePopover);

    let closeId = makeCloseId(context.id);

    const handleClick = useComposedEvent(props.onClick, (): void => {
      context.onCloseChange();

      return /** UNUSED */;
    });

    return (
      <Primitive.button
        {...rest}
        ref={ref}
        type="button"
        id={closeId}
        tabIndex={0}
        onClick={handleClick}
      />
    );
  }) as PopoverCloseFC;

  PopoverClose.__ownerName = ownerName;

  return PopoverClose;
}

const PopoverClose: PopoverCloseFC = createPopoverClose(OWNER_NAME);

export { PopoverClose, PopoverClose as Close };
export type { PopoverCloseProps };

export { createPopoverClose };
export type { PopoverCloseFC };
