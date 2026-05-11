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

import { getState, useCollapsibleContext } from "./collapsible";

import type * as React from "react";
import type { Scope } from "@flt-ui/react-context-scope";
import type { PrimitiveProps } from "@flt-ui/react-primitive";

const OWNER_NAME = "Collapsible.Trigger";

type ScopedProps<P> = P & {
  __scopeCollapsible?: Scope;
};

type FC<P> = (props: P) => React.ReactNode;

type CollapsibleTriggerProps = PrimitiveProps<"button"> & {};

type CollapsibleTriggerFC = FC<CollapsibleTriggerProps> & {
  __ownerName?: string;
};

function createCollapsibleTrigger(ownerName: string): CollapsibleTriggerFC {
  const CollapsibleTrigger = ((
    props: ScopedProps<CollapsibleTriggerProps>,
  ): React.JSX.Element => {
    let { ref, ...rest } = props;

    let context = useCollapsibleContext(OWNER_NAME, props.__scopeCollapsible);

    const handleClick = useComposedEvent(props.onClick, (): void => {
      if (context.disabled) {
        return /** UNUSED */;
      }

      context.onOpenChange();

      return /** UNUSED */;
    });

    return (
      <Primitive.button
        {...rest}
        ref={ref}
        type="button"
        tabIndex={0}
        aria-expanded={context.open}
        aria-controls={context.id}
        data-flt-state={getState(context.open)}
        data-flt-disabled={context.disabled}
        disabled={context.disabled}
        onClick={handleClick}
      />
    );
  }) as CollapsibleTriggerFC;

  CollapsibleTrigger.__ownerName = ownerName;

  return CollapsibleTrigger;
}

const CollapsibleTrigger: CollapsibleTriggerFC =
  createCollapsibleTrigger(OWNER_NAME);

export { CollapsibleTrigger, CollapsibleTrigger as Trigger };
export type { CollapsibleTriggerProps };

export { createCollapsibleTrigger };
export type { CollapsibleTriggerFC };
