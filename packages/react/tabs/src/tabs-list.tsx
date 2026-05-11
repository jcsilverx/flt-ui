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
import { useFocusIntent } from "@flt-ui/react-use-focus-intent";
import { useComposedEvent } from "@flt-ui/react-use-event";
import { useFocusWithin } from "@flt-ui/react-use-focus-within";
import { isBoth } from "@flt-ui/react-collection";
import { focusElement } from "@flt-ui/a11y";

import {
  Collection,
  createTabsContext,
  useCollection,
  useTabsContext,
} from "./tabs";

import type { Scope } from "@flt-ui/react-context-scope";
import type { Omit, PrimitiveProps } from "@flt-ui/react-primitive";
import type { These } from "@flt-ui/react-collection";
import type { ItemData } from "./tabs";

const OWNER_NAME = "Tabs.List";

type ScopedProps<P> = P & {
  __scopeTabs?: Scope;
};

/**
 * FocusableContext
 */
type FocusableContextValue = {
  focusableValue: string | null;
  onFocusableValueChange: (focusableValue: string | null) => void;
};

const [FocusableContext, useFocusableContext] =
  createTabsContext<FocusableContextValue>(OWNER_NAME);

type FC<P> = (props: P) => React.ReactNode;

type TabsListProps = Omit<PrimitiveProps<"div">, "defaultValue" | "dir"> & {
  loop?: boolean;
};

type TabsListFC = FC<TabsListProps> & {
  __ownerName?: string;
};

function createTabsList(ownerName: string): TabsListFC {
  const TabsList = ((props: ScopedProps<TabsListProps>): React.JSX.Element => {
    let { ref, loop = true, ...rest } = props;

    let node = React.useRef<globalThis.HTMLDivElement>(null);
    let composedRefs = useComposedRefs(ref, node);
    let context = useTabsContext(OWNER_NAME, props.__scopeTabs);
    let fromCollection = useCollection(props.__scopeTabs);
    let [focusableValue, setFocusableValue] = React.useState<string | null>(
      null,
    );

    let focusIntent = useFocusIntent(context.dir, context.orientation);

    let { onFocus, onBlur } = useFocusWithin({
      onFocusWithin: (): void => {
        return /** UNUSED */;
      },

      onBlurWithin: (): void => {
        if (context.value != null) {
          return /** UNUSED */;
        }

        setFocusableValue(null);

        return /** UNUSED */;
      },
    });

    const handleKeyDown = useComposedEvent(props.onKeyDown, (event): void => {
      let { key } = event;

      let intent = focusIntent.getFocusIntent(key);

      if (intent == null) {
        return /** UNUSED */;
      }

      let next: These<ItemData, globalThis.Node | null>;

      event.preventDefault();

      switch (intent) {
        case "FIRST":
          next = fromCollection.getFirstNode();
          break;
        case "PREV":
          next = fromCollection.getPreviousNode({
            loop: loop,
          });
          break;
        case "NEXT":
          next = fromCollection.getNextNode({
            loop: loop,
          });
          break;
        case "LAST":
          next = fromCollection.getLastNode();
          break;
      }

      if (!isBoth(next) || next.right == null) {
        return /** UNUSED */;
      }

      focusElement(next.right);

      context.onValueChange(next.left.value);

      return /** UNUSED */;
    });

    const handleFocus = useComposedEvent(props.onFocus, onFocus);

    const handleBlur = useComposedEvent(props.onBlur, onBlur);

    return (
      <FocusableContext.Provider
        scope={props.__scopeTabs}
        focusableValue={focusableValue}
        onFocusableValueChange={setFocusableValue}
      >
        <Collection.Slot scope={props.__scopeTabs}>
          <Primitive.div
            {...rest}
            ref={composedRefs}
            role="tablist"
            aria-orientation={context.orientation}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </Collection.Slot>
      </FocusableContext.Provider>
    );
  }) as TabsListFC;

  TabsList.__ownerName = ownerName;

  return TabsList;
}

const TabsList: TabsListFC = createTabsList(OWNER_NAME);

export { TabsList, TabsList as List };
export type { TabsListProps };

export { createTabsList };
export type { TabsListFC };

export { useFocusableContext };
