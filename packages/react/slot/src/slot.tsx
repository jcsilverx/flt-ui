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
import { mergeProps } from "@flt-ui/react-merge-props";

import { isSlottable } from "./slottable";

import type { SlottableProps } from "./slottable";
import type { AnyProps } from "@flt-ui/react-merge-props";

const OWNER_NAME = "Slot";
const FRAGMENT_IDENTIFIER = Symbol.for("react.fragment");

type FC<P> = (props: P) => React.ReactNode | null;

type SlotProps = React.HTMLAttributes<globalThis.Element> & {
  ref?: React.Ref<globalThis.Element>;
};

type SlotFC = FC<SlotProps> & {
  __ownerName?: string;
};

function createSlot(ownerName: string): SlotFC {
  const Slot = ((props: SlotProps): React.JSX.Element | null => {
    let { children, ...rest } = props;

    let childrenArray = React.Children.toArray(children);
    let slottable = childrenArray.filter(isSlottable);

    if (slottable.length === 1) {
      let element = slottable[0].props.children;

      let newChildren = childrenArray.map((child): React.ReactNode => {
        if (child === slottable[0]) {
          if (!React.isValidElement(element)) {
            if (React.Children.count(element) > 1) {
              return React.Children.only(null);
            } else {
              return null;
            }
          }

          if (isFragment(element.type)) {
            throw new Error(getErrorMessage("Slottable"));
          }

          return (element.props as SlottableProps).children;
        } else {
          return child;
        }
      });

      return (
        <>
          {React.isValidElement(element)
            ? React.cloneElement(
                element,
                { ...mergeProps(rest, element.props as AnyProps) },
                newChildren,
              )
            : null}
        </>
      );
    }

    if (!React.isValidElement(children)) {
      if (React.Children.count(children) > 1) {
        return React.Children.only(null);
      } else {
        return null;
      }
    }

    if (isFragment(children.type)) {
      throw new Error(getErrorMessage("Slot"));
    }

    return (
      <>
        {React.cloneElement(children, {
          ...mergeProps(rest, children.props as AnyProps),
        })}
      </>
    );
  }) as SlotFC;

  Slot.__ownerName = ownerName;

  return Slot;
}

const Slot: SlotFC = createSlot(OWNER_NAME);

const getErrorMessage = (ownerName: string): string =>
  `It looks like you’re trying to render a 'React.Fragment' within a '${ownerName}' component. ` +
  `However, a 'React.Fragment' can’t be used as an element—render an actual element instead` +
  ` so that we can forward props onto it.`;

const isFragment = (element: unknown): element is typeof React.Fragment => {
  return element === React.Fragment || element === FRAGMENT_IDENTIFIER;
};

export { Slot, Slot as Root };
export type { SlotProps };

export { createSlot };
export type { SlotFC };
