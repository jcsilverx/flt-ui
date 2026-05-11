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

import { getState, makeContentId, makeTriggerId, useTabsContext } from "./tabs";

import type * as React from "react";
import type { Scope } from "@flt-ui/react-context-scope";
import type { PrimitiveProps } from "@flt-ui/react-primitive";

const OWNER_NAME = "Tabs.Content";

type ScopedProps<P> = P & {
  __scopeTabs?: Scope;
};

type FC<P> = (props: P) => React.ReactNode;

type TabsContentProps = PrimitiveProps<"div"> & {
  value: string;
  persist?: true;
};

type TabsContentFC = FC<TabsContentProps> & {
  __ownerName?: string;
};

function createTabsContent(ownerName: string): TabsContentFC {
  const TabsContent = ((
    props: ScopedProps<TabsContentProps>,
  ): React.JSX.Element => {
    let { ref, value, persist, ...rest } = props;

    let context = useTabsContext(OWNER_NAME, props.__scopeTabs);

    let triggerId = makeTriggerId(context.id, value);
    let contentId = makeContentId(context.id, value);
    let selected = context.value != null && value === context.value;

    return (
      <Primitive.div
        {...rest}
        ref={ref}
        id={contentId}
        role="tabpanel"
        tabIndex={0}
        aria-labelledby={triggerId}
        data-flt-state={getState(selected)}
        data-flt-orientation={context.orientation}
        hidden={!selected}
      >
        {!persist ? selected && props.children : props.children}
      </Primitive.div>
    );
  }) as TabsContentFC;

  TabsContent.__ownerName = ownerName;

  return TabsContent;
}

const TabsContent: TabsContentFC = createTabsContent(OWNER_NAME);

export { TabsContent, TabsContent as Content };
export type { TabsContentProps };

export { createTabsContent };
export type { TabsContentFC };
