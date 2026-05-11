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
import { createContextScope } from "@flt-ui/react-context-scope";
import { createSlot } from "@flt-ui/react-slot";
import { useComposedRefs } from "@flt-ui/react-use-composed-refs";
import { useIsoMorphicEffect } from "@flt-ui/react-use-iso-morphic-effect";
import { isInert, isVisible } from "@flt-ui/a11y";

import { BaseCollection } from "./base-collection";
import { both, right } from "./utils";

import type { CreateUseScope, Scope } from "@flt-ui/react-context-scope";
import type {
  Collection,
  ItemMap,
  ProviderFC,
  ProviderProps,
  SlotFC,
  SlotItemFC,
  SlotItemProps,
  SlotProps,
  These,
  UseCollection,
} from "./types";
import type { SlotFC as SlotImplFC } from "@flt-ui/react-slot";
import type { Options } from "./base-collection";

const OWNER_NAME = "Collection";

function createCollection<ItemData = {}>(
  ownerName: string,
): readonly [Collection<ItemData>, UseCollection<ItemData>, CreateUseScope] {
  const PROVIDER_NAME = ownerName + OWNER_NAME + "Provider";

  const [createCollectionContext, createCollectionScope] =
    createContextScope(PROVIDER_NAME);

  type CollectionContextValue = {
    node: globalThis.HTMLElement | null;
    onNodeChange: (node: globalThis.HTMLElement | null) => void;
    itemMap: ItemMap<ItemData>;
  };

  const [CollectionContext, useCollectionContext] =
    createCollectionContext<CollectionContextValue>(PROVIDER_NAME, {
      defaultValue: {
        node: null,
        onNodeChange: (): void => {
          return /** UNUSED */;
        },
        itemMap: new globalThis.WeakMap(),
      },
    });

  const Provider = ((props: ProviderProps): React.JSX.Element => {
    let { scope, children } = props;

    let [node, setNode] = React.useState<globalThis.HTMLElement | null>(null);
    let itemMap = React.useRef<ItemMap<ItemData>>(new globalThis.WeakMap());

    return (
      <CollectionContext.Provider
        scope={scope}
        node={node}
        onNodeChange={setNode}
        itemMap={itemMap.current}
      >
        {children}
      </CollectionContext.Provider>
    );
  }) as ProviderFC;

  Provider.__ownerName = PROVIDER_NAME;

  const SLOT_NAME = ownerName + OWNER_NAME + "Slot";

  const SlotImpl: SlotImplFC = createSlot(SLOT_NAME);

  const Slot = ((props: SlotProps): React.JSX.Element => {
    let { scope, ref, children } = props;

    let context = useCollectionContext(SLOT_NAME, scope);
    let composedRefs = useComposedRefs(ref, context.onNodeChange);

    return <SlotImpl ref={composedRefs}>{children}</SlotImpl>;
  }) as SlotFC;

  Slot.__ownerName = SLOT_NAME;

  const SLOT_ITEM_NAME = ownerName + OWNER_NAME + "SlotItem";
  const ITEM_DATA_ATTR = "data-flt-item-collection";

  const SlotItemImpl: SlotImplFC = createSlot(SLOT_ITEM_NAME);

  const SlotItem = ((props: SlotItemProps<ItemData>): React.JSX.Element => {
    let { scope, ref, children, ...rest } = props;

    let context = useCollectionContext(SLOT_ITEM_NAME, scope);

    let node = React.useRef<globalThis.HTMLElement | null>(null);
    let composedRefs = useComposedRefs(ref, node);

    useIsoMorphicEffect(() => {
      let element = node.current;

      if (element == null) {
        return /** UNUSED */;
      }

      let itemData = rest as ItemData;

      context.itemMap.set(element, { ...itemData });

      return (): void => {
        context.itemMap.delete(element);

        return /** UNUSED */;
      };
    }, [context.itemMap, rest]);

    return (
      <SlotItemImpl ref={composedRefs} {...{ [ITEM_DATA_ATTR]: "" }}>
        {children}
      </SlotItemImpl>
    );
  }) as SlotItemFC<ItemData>;

  SlotItem.__ownerName = SLOT_ITEM_NAME;

  const CONSUMER_NAME = ownerName + OWNER_NAME + "Consumer";
  const QUALIFIED_NAME = ITEM_DATA_ATTR;

  const useCollection = ((scope: Scope) => {
    let context = useCollectionContext(CONSUMER_NAME, scope);

    let collectionRef = React.useRef<BaseCollection | null>(null);

    const getFromContext = React.useCallback(
      (node: globalThis.Node | null): ItemData | null => {
        if (node == null) {
          return null;
        }

        return context.itemMap.get(node) as ItemData;
      },
      [context.itemMap],
    );

    const accept = React.useCallback((node: globalThis.Node): boolean => {
      return isHTMLElement(node) && hasQualifiedName(node, QUALIFIED_NAME);
    }, []);

    useIsoMorphicEffect(() => {
      let element = context.node;

      if (element == null) {
        return /** UNUSED */;
      }

      collectionRef.current = new BaseCollection(element, {
        accept: accept,
      });

      return (): void => {
        collectionRef.current = null;

        return /** UNUSED */;
      };
    }, [accept, context.node]);

    return {
      getFirstNode: React.useCallback((): These<ItemData, Node | null> => {
        let node = collectionRef.current?.getFirstNode() ?? null;
        let itemData = getFromContext(node);

        if (itemData != null) {
          return both(itemData, node);
        }

        return right(node);
      }, [getFromContext]),

      getPreviousNode: React.useCallback(
        (
          options: globalThis.Partial<Options> = {},
        ): These<ItemData, Node | null> => {
          let node = collectionRef.current?.getPreviousNode(options) ?? null;
          let itemData = getFromContext(node);

          if (itemData != null) {
            return both(itemData, node);
          }

          return right(node);
        },
        [getFromContext],
      ),

      getNextNode: React.useCallback(
        (
          options: globalThis.Partial<Options> = {},
        ): These<ItemData, Node | null> => {
          let node = collectionRef.current?.getNextNode(options) ?? null;
          let itemData = getFromContext(node);

          if (itemData != null) {
            return both(itemData, node);
          }

          return right(node);
        },
        [getFromContext],
      ),

      getLastNode: React.useCallback((): These<ItemData, Node | null> => {
        let node = collectionRef.current?.getLastNode() ?? null;
        let itemData = getFromContext(node);

        if (itemData != null) {
          return both(itemData, node);
        }

        return right(node);
      }, [getFromContext]),
    };
  }) as UseCollection<ItemData>;

  const Collection = Object.freeze({
    Provider,
    Slot,
    SlotItem,
  } as const) satisfies Collection<ItemData>;

  return [Collection, useCollection, createCollectionScope] as const;
}

const isHTMLElement = (element: unknown): element is globalThis.HTMLElement => {
  return element instanceof globalThis.HTMLElement;
};

const hasQualifiedName = (
  node: globalThis.Element,
  qualifiedName: string,
): boolean => {
  return node.hasAttribute(qualifiedName) && isVisible(node) && !isInert(node);
};

export { createCollection };
