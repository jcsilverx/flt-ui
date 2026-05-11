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

import { getState, useAccordionContext } from "./accordion";
import { useAccordionItemContext } from "./accordion-item";

import type * as React from "react";
import type { Scope } from "@flt-ui/react-context-scope";
import type { PrimitiveProps } from "@flt-ui/react-primitive";

const OWNER_NAME = "Accordion.Header";

type ScopedProps<P> = P & {
  __scopeAccordion?: Scope;
};

type FC<P> = (props: P) => React.ReactNode;

type AccordionHeaderProps = PrimitiveProps<"h3"> & {};

type AccordionHeaderFC = FC<AccordionHeaderProps> & {
  __ownerName?: string;
};

function createAccordionHeader(ownerName: string): AccordionHeaderFC {
  const AccordionHeader = ((
    props: ScopedProps<AccordionHeaderProps>,
  ): React.JSX.Element => {
    let { ref, ...rest } = props;

    let context = useAccordionContext(OWNER_NAME, props.__scopeAccordion);
    let itemContext = useAccordionItemContext(
      OWNER_NAME,
      props.__scopeAccordion,
    );

    return (
      <Primitive.h3
        {...rest}
        ref={ref}
        data-flt-state={getState(itemContext.open)}
        data-flt-orientation={context.orientation}
        data-flt-disabled={context.disabled}
      />
    );
  }) as AccordionHeaderFC;

  AccordionHeader.__ownerName = ownerName;

  return AccordionHeader;
}

const AccordionHeader: AccordionHeaderFC = createAccordionHeader(OWNER_NAME);

export { AccordionHeader, AccordionHeader as Header };
export type { AccordionHeaderProps };

export { createAccordionHeader };
export type { AccordionHeaderFC };
