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

import { createCollapsibleContent } from "@flt-ui/react-collapsible";

import { useAccordionContext, useCollapsibleScope } from "./accordion";
import { useAccordionItemContext } from "./accordion-item";

import type * as React from "react";
import type { Scope } from "@flt-ui/react-context-scope";
import type {
  CollapsibleContentFC,
  CollapsibleContentProps,
} from "@flt-ui/react-collapsible";

const OWNER_NAME = "Accordion.Content";

type ScopedProps<P> = P & {
  __scopeAccordion?: Scope;
};

type CSSVariables = globalThis.Record<`--flt-${string}`, string | undefined>;

type FC<P> = (props: P) => React.ReactNode;

type AccordionContentProps = CollapsibleContentProps & {};

type AccordionContentFC = FC<AccordionContentProps> & {
  __ownerName?: string;
};

function createAccordionContent(ownerName: string): AccordionContentFC {
  const CollapsibleContent: CollapsibleContentFC =
    createCollapsibleContent(ownerName);

  let style = Object.freeze({
    "--flt-accordion-content-height": "var(--flt-collapsible-content-height)",
    "--flt-accordion-content-width": "var(--flt-collapsible-content-width)",
  }) satisfies CSSVariables;

  const AccordionContent = ((
    props: ScopedProps<AccordionContentProps>,
  ): React.JSX.Element => {
    let { ref, ...rest } = props;

    let context = useAccordionContext(OWNER_NAME, props.__scopeAccordion);
    let itemContext = useAccordionItemContext(
      OWNER_NAME,
      props.__scopeAccordion,
    );
    let collapsibleScope = useCollapsibleScope(props.__scopeAccordion);

    return (
      <CollapsibleContent
        {...collapsibleScope}
        {...rest}
        ref={ref}
        role="region"
        aria-labelledby={itemContext.id}
        data-flt-orientation={context.orientation}
        style={{
          ...style,
          ...props.style,
        }}
      />
    );
  }) as AccordionContentFC;

  AccordionContent.__ownerName = ownerName;

  return AccordionContent;
}

const AccordionContent: AccordionContentFC = createAccordionContent(OWNER_NAME);

export { AccordionContent, AccordionContent as Content };
export type { AccordionContentProps };

export { createAccordionContent };
export type { AccordionContentFC };
