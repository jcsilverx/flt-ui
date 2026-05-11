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

import type * as React from "react";
import type { Scope } from "@flt-ui/react-context-scope";
import type { Options } from "./base-collection";

type PossibleRef<E extends globalThis.HTMLElement | globalThis.Node> =
  | E
  | React.RefObject<E | null>;

type ItemMap<ItemData = {}> = globalThis.WeakMap<
  PossibleRef<globalThis.HTMLElement | globalThis.Node>,
  ItemData
>;

type FC<P> = (props: P) => React.ReactNode;

type ProviderProps = {
  scope: Scope;
  children: React.ReactNode;
};

type ProviderFC = FC<ProviderProps> & {
  __ownerName?: string;
};

type SlotProps = {
  ref?: React.RefObject<globalThis.HTMLElement>;
  scope: Scope;
  children: React.ReactNode;
};

type SlotFC = FC<SlotProps> & {
  __ownerName?: string;
};

type SlotItemProps<ItemData = {}> = ItemData & {
  scope: Scope;
  ref?: React.RefObject<globalThis.HTMLElement>;
  children: React.ReactNode;
};

type SlotItemFC<ItemData = {}> = FC<SlotItemProps<ItemData>> & {
  __ownerName?: string;
};

type Left<E> = {
  readonly _kind: "Left";
  readonly left: E;
};

type Right<A> = {
  readonly _kind: "Right";
  readonly right: A;
};

type Either<E, A> = Left<E> | Right<A>;

type Both<E, A> = {
  readonly _kind: "Both";
  readonly left: E;
  readonly right: A;
};

type These<E, A> = Either<E, A> | Both<E, A>;

type UseCollection<ItemData = {}> = (scope: Scope) => {
  getFirstNode: () => These<ItemData, globalThis.Node | null>;
  getPreviousNode: (
    options?: globalThis.Partial<Options>,
  ) => These<ItemData, globalThis.Node | null>;
  getNextNode: (
    options?: globalThis.Partial<Options>,
  ) => These<ItemData, globalThis.Node | null>;
  getLastNode: () => These<ItemData, globalThis.Node | null>;
};

type Collection<ItemData = {}> = {
  readonly Provider: ProviderFC;
  readonly Slot: SlotFC;
  readonly SlotItem: SlotItemFC<ItemData>;
};

export type {
  PossibleRef,
  ItemMap,
  ProviderProps,
  ProviderFC,
  SlotProps,
  SlotFC,
  SlotItemProps,
  SlotItemFC,
  Left,
  Right,
  Either,
  Both,
  These,
  UseCollection,
  Collection,
};
