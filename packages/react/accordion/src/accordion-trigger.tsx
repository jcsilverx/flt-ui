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
import { createCollapsibleTrigger } from "@flt-ui/react-collapsible";
import { useComposedRefs } from "@flt-ui/react-use-composed-refs";

import {
  Collection,
  useAccordionContext,
  useCollapsibleContext,
  useCollapsibleScope,
} from "./accordion";
import { useAccordionItemContext } from "./accordion-item";

import type { Scope } from "@flt-ui/react-context-scope";
import type {
  CollapsibleTriggerFC,
  CollapsibleTriggerProps,
} from "@flt-ui/react-collapsible";

const OWNER_NAME = "Accordion.Trigger";

type ScopedProps<P> = P & {
  __scopeAccordion?: Scope;
};

type FC<P> = (props: P) => React.ReactNode;

type AccordionTriggerProps = CollapsibleTriggerProps & {};

type AccordionTriggerFC = FC<AccordionTriggerProps> & {
  __ownerName?: string;
};

function createAccordionTrigger(ownerName: string): AccordionTriggerFC {
  const CollapsibleTrigger: CollapsibleTriggerFC =
    createCollapsibleTrigger(ownerName);

  const AccordionTrigger = ((
    props: ScopedProps<AccordionTriggerProps>,
  ): React.JSX.Element => {
    let { ref, ...rest } = props;

    let node = React.useRef<globalThis.HTMLButtonElement | null>(null);
    let composedRefs = useComposedRefs(ref, node);
    let context = useAccordionContext(OWNER_NAME, props.__scopeAccordion);
    let itemContext = useAccordionItemContext(
      OWNER_NAME,
      props.__scopeAccordion,
    );
    let collapsibleContext = useCollapsibleContext(
      OWNER_NAME,
      props.__scopeAccordion,
    );
    let collapsibleScope = useCollapsibleScope(props.__scopeAccordion);

    let disabled =
      (itemContext.open && !collapsibleContext.collapsible) || undefined;

    return (
      <Collection.SlotItem scope={props.__scopeAccordion}>
        <CollapsibleTrigger
          {...collapsibleScope}
          {...rest}
          ref={composedRefs}
          id={itemContext.id}
          aria-disabled={disabled}
          data-flt-orientation={context.orientation}
        />
      </Collection.SlotItem>
    );
  }) as AccordionTriggerFC;

  AccordionTrigger.__ownerName = ownerName;

  return AccordionTrigger;
}

const AccordionTrigger: AccordionTriggerFC = createAccordionTrigger(OWNER_NAME);

export { AccordionTrigger, AccordionTrigger as Trigger };
export type { AccordionTriggerProps };

export { createAccordionTrigger };
export type { AccordionTriggerFC };
