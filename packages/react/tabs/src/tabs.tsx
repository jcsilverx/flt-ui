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
import { createUseId } from "@flt-ui/react-use-id";
import { useTabs } from "@flt-ui/react-use-tabs";
import { createContextScope } from "@flt-ui/react-context-scope";
import { useDirection } from "@flt-ui/react-direction";
import { createCollection } from "@flt-ui/react-collection";

import type * as React from "react";
import type { Scope } from "@flt-ui/react-context-scope";
import type { Omit, PrimitiveProps } from "@flt-ui/react-primitive";
import type { UseId } from "@flt-ui/react-use-id";

const OWNER_NAME = "Tabs";

type ItemData = {
  value: string;
};

const [Collection, useCollection, createCollectionScope] =
  createCollection<ItemData>(OWNER_NAME);

type ScopedProps<P> = P & {
  __scopeTabs?: Scope;
};

const [createTabsContext, createTabsScope] = createContextScope(OWNER_NAME, [
  createCollectionScope,
]);

type TabsContextValue = {
  id: string;
  value: string | null;
  onValueChange: (value: string | null) => void;
  orientation: "horizontal" | "vertical";
  dir: "ltr" | "rtl";
  mode: "manual" | "automatic";
};

const [TabsContext, useTabsContext] =
  createTabsContext<TabsContextValue>(OWNER_NAME);

type FC<P> = (props: P) => React.ReactNode;

type TabsState = "active" | "inactive";

type TabsProps = Omit<PrimitiveProps<"div">, "defaultValue" | "dir"> & {
  value?: string | null;
  defaultValue?: string | null;
  onValueChange?: (value: string | null) => void;
  orientation?: "horizontal" | "vertical";
  dir?: "ltr" | "rtl";
  mode?: "manual" | "automatic";
};

type TabsFC = FC<TabsProps> & {
  __ownerName?: string;
};

function createTabs(ownerName: string): TabsFC {
  const useId: UseId = createUseId();

  const Tabs = ((props: ScopedProps<TabsProps>): React.JSX.Element => {
    let {
      ref,
      value: _value,
      defaultValue: _defaultValue,
      onValueChange: _onValueChange,
      orientation = "horizontal",
      dir,
      mode = "automatic",
      ...rest
    } = props;

    let { value, onValueChange } = useTabs({
      value: _value,
      defaultValue: _defaultValue,
      onValueChange: _onValueChange,
      caller: ownerName,
    });

    let id = useId();
    let direction = useDirection(dir);

    return (
      <TabsContext.Provider
        scope={props.__scopeTabs}
        id={id}
        value={value}
        onValueChange={onValueChange}
        orientation={orientation}
        dir={direction}
        mode={mode}
      >
        <Collection.Provider scope={props.__scopeTabs}>
          <Primitive.div
            {...rest}
            ref={ref}
            dir={direction}
            data-flt-orientation={orientation}
          />
        </Collection.Provider>
      </TabsContext.Provider>
    );
  }) as TabsFC;

  Tabs.__ownerName = ownerName;

  return Tabs;
}

const Tabs: TabsFC = createTabs(OWNER_NAME);

const getState = (selected: boolean): TabsState => {
  return selected ? "active" : "inactive";
};

const makeTriggerId = (
  id: string,
  value: string,
): `${string}-trigger-${string}` => {
  return `${id}-trigger-${value}`;
};

const makeContentId = (
  id: string,
  value: string,
): `${string}-content-${string}` => {
  return `${id}-content-${value}`;
};

export { Tabs, Tabs as Root };
export type { TabsProps };

export { createTabs, getState, makeTriggerId, makeContentId };
export type { TabsFC };

export { createTabsContext, createTabsScope };

export { useTabsContext };

export { Collection };
export { useCollection };

export type { ItemData };
