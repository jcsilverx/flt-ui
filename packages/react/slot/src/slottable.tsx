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

const OWNER_NAME = "Slottable";
const SLOTTABLE_IDENTIFIER = globalThis.Symbol("fltId.slottable");

type FC<P> = (props: P) => React.ReactNode;

type SlottableProps = {
  children: React.ReactNode;
};

type SlottableFC = FC<SlottableProps> & {
  __fltId: symbol;
  __ownerName?: string;
};

function createSlottable(ownerName: string): SlottableFC {
  const Slottable = ((props: SlottableProps): React.JSX.Element => {
    let { children } = props;

    return <>{children}</>;
  }) as SlottableFC;

  Slottable.__fltId = SLOTTABLE_IDENTIFIER;
  Slottable.__ownerName = ownerName;

  return Slottable;
}

const Slottable: SlottableFC = createSlottable(OWNER_NAME);

const isSlottable = (
  child: React.ReactNode,
): child is React.ReactElement<SlottableProps, SlottableFC> =>
  React.isValidElement(child) &&
  typeof child.type === "function" &&
  "__fltId" in child.type &&
  child.type.__fltId === SLOTTABLE_IDENTIFIER;

export { Slottable };
export type { SlottableProps };

export { createSlottable, isSlottable };
export type { SlottableFC };
