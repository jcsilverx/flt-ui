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

import { createSlot } from "@flt-ui/react-slot";

import { omit } from "./omit";

import type * as React from "react";
import type { SlotFC } from "@flt-ui/react-slot";
import type { PropsOf } from "./types";

const OWNER_NAME = "Primitive";
const REGX_PATTERNS = [/^__scope/] as const;

const Elements = [
  "a",
  "button",
  "div",
  "form",
  "h2",
  "h3",
  "img",
  "input",
  "label",
  "li",
  "nav",
  "ol",
  "p",
  "span",
  "svg",
  "ul",
] as const;

type Element = (typeof Elements)[number];

type FC<P> = (props: P) => React.ReactNode;

type PrimitiveProps<E extends React.ElementType> = PropsOf<E> & {
  /**
   * If true, renders the `Slot` component instead of the HTML element.
   *
   * @default false
   */
  asChild?: boolean;
};

type PrimitiveFC<E extends React.ElementType> = FC<PrimitiveProps<E>> & {
  __ownerName?: string;
};

function createPrimitive<E extends Element>(element: E): PrimitiveFC<E> {
  let ownerName = `${OWNER_NAME}.${element}` as const;

  const Slot: SlotFC = createSlot(ownerName);

  const Primitive = ((props: PrimitiveProps<E>): React.JSX.Element => {
    let { ref, asChild = false, ...rest } = props;

    let Comp = asChild ? Slot : (element as React.ElementType);

    return <Comp ref={ref} {...omit(rest, REGX_PATTERNS)} />;
  }) as PrimitiveFC<E>;

  Primitive.__ownerName = ownerName;

  return Primitive;
}

type Primitives = {
  [K in Element]: ReturnType<typeof createPrimitive<K>>;
};

const Primitive = Elements.reduce((primitive, element): Primitives => {
  return {
    ...primitive,
    [element]: createPrimitive(element),
  };
}, {} as Primitives);

export { Primitive };
export type { PrimitiveProps };

export { createPrimitive };
export type { PrimitiveFC };
