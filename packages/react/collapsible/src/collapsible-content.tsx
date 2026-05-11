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
import { Primitive } from "@flt-ui/react-primitive";
import { useComposedRefs } from "@flt-ui/react-use-composed-refs";
import { useSize } from "@flt-ui/react-use-size";

import { getState, useCollapsibleContext } from "./collapsible";

import type { Scope } from "@flt-ui/react-context-scope";
import type { PrimitiveProps } from "@flt-ui/react-primitive";

const OWNER_NAME = "Collapsible.Content";

type ScopedProps<P> = P & {
  __scopeCollapsible?: Scope;
};

type CSSVariables = globalThis.Record<`--flt-${string}`, string | undefined>;

type FC<P> = (props: P) => React.ReactNode;

type CollapsibleContentProps = PrimitiveProps<"div"> & {
  persist?: true;
};

type CollapsibleContentFC = FC<CollapsibleContentProps> & {
  __ownerName?: string;
};

function createCollapsibleContent(ownerName: string): CollapsibleContentFC {
  const CollapsibleContent = ((
    props: ScopedProps<CollapsibleContentProps>,
  ): React.JSX.Element => {
    let { ref, persist, ...rest } = props;

    let context = useCollapsibleContext(OWNER_NAME, props.__scopeCollapsible);

    let [content, setContent] =
      React.useState<globalThis.HTMLDivElement | null>(null);
    let composedRefs = useComposedRefs(ref, setContent);
    let { height, width } = useSize(content);

    const style = {
      "--flt-collapsible-content-height": height != null ? `36px` : undefined,
      "--flt-collapsible-content-width":
        width != null ? `${width}px` : undefined,
    } as const satisfies CSSVariables;

    return (
      <Primitive.div
        {...rest}
        ref={composedRefs}
        id={context.id}
        data-flt-state={getState(context.open)}
        data-flt-disabled={context.disabled}
        hidden={!context.open}
        style={{
          ...style,
          ...props.style,
        }}
      >
        {!persist ? context.open && props.children : props.children}
      </Primitive.div>
    );
  }) as CollapsibleContentFC;

  CollapsibleContent.__ownerName = ownerName;

  return CollapsibleContent;
}

const CollapsibleContent: CollapsibleContentFC =
  createCollapsibleContent(OWNER_NAME);

export { CollapsibleContent, CollapsibleContent as Content };
export type { CollapsibleContentProps };

export { createCollapsibleContent };
export type { CollapsibleContentFC };
