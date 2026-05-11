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

import { createCollapsible } from "@flt-ui/react-collapsible";
import { createUseId } from "@flt-ui/react-use-id";

import {
  getState,
  createAccordionContext,
  useAccordionContext,
  useCollapsibleScope,
  useValueContext,
} from "./accordion";

import type * as React from "react";
import type { Scope } from "@flt-ui/react-context-scope";
import type {
  CollapsibleFC,
  CollapsibleProps,
} from "@flt-ui/react-collapsible";
import type { Omit } from "@flt-ui/react-primitive";
import type { UseId } from "@flt-ui/react-use-id";

const OWNER_NAME = "Accordion.Item";

type ScopedProps<P> = P & {
  __scopeAccordion?: Scope;
};

type AccordionItemContextValue = {
  id: string;
  open: boolean;
  disabled: true | undefined;
};

const [AccordionItemContext, useAccordionItemContext] =
  createAccordionContext<AccordionItemContextValue>(OWNER_NAME);

type FC<P> = (props: P) => React.ReactNode;

type AccordionItemProps = Omit<
  CollapsibleProps,
  "open" | "defaultOpen" | "onOpenChange" | "disabled"
> & {
  value: string;
  disabled?: boolean;
};

type AccordionItemFC = FC<AccordionItemProps> & {
  __ownerName?: string;
};

function createAccordionItem(ownerName: string): AccordionItemFC {
  const Collapsible: CollapsibleFC = createCollapsible(ownerName);

  const useId: UseId = createUseId();

  const AccordionItem = ((
    props: ScopedProps<AccordionItemProps>,
  ): React.JSX.Element => {
    let { ref, value, disabled: _disabled = false, ...rest } = props;

    let context = useAccordionContext(OWNER_NAME, props.__scopeAccordion);
    let valueContext = useValueContext(OWNER_NAME, props.__scopeAccordion);
    let collapsibleScope = useCollapsibleScope(props.__scopeAccordion);
    let id = useId();

    let open = (value && valueContext.value.includes(value)) || false;
    let disabled = _disabled || context.disabled;

    const handleOpenChange = (open: boolean): void => {
      if (disabled) {
        return /** UNUSED */;
      }

      if (open) {
        valueContext.onItemOpen(value);
      } else {
        valueContext.onItemClose(value);
      }

      return /** UNUSED */;
    };

    return (
      <AccordionItemContext.Provider
        scope={props.__scopeAccordion}
        id={id}
        open={open}
        disabled={disabled}
      >
        <Collapsible
          {...collapsibleScope}
          {...rest}
          ref={ref}
          data-flt-state={getState(open)}
          data-flt-orientation={context.orientation}
          disabled={disabled}
          open={open}
          onOpenChange={handleOpenChange}
        />
      </AccordionItemContext.Provider>
    );
  }) as AccordionItemFC;

  AccordionItem.__ownerName = ownerName;

  return AccordionItem;
}

const AccordionItem: AccordionItemFC = createAccordionItem(OWNER_NAME);

export { AccordionItem, AccordionItem as Item };
export type { AccordionItemProps };

export { createAccordionItem };
export type { AccordionItemFC };

export { useAccordionItemContext };
