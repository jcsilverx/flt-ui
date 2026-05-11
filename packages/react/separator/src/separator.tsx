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

import type * as React from "react";
import type { PrimitiveProps } from "@flt-ui/react-primitive";

const OWNER_NAME = "Separator";

type FC<P> = (props: P) => React.ReactNode;

type Role = React.AriaRole;

type Orientation = "horizontal" | "vertical";

type SeparatorProps = PrimitiveProps<"div"> & {
  orientation?: Orientation;
  decorative?: boolean;
};

type SeparatorFC = FC<SeparatorProps> & {
  __ownerName?: string;
};

function createSeparator(ownerName: string): SeparatorFC {
  const Separator = ((props: SeparatorProps): React.JSX.Element => {
    let {
      ref,
      orientation = "horizontal",
      decorative = false,
      ...rest
    } = props;

    return (
      <Primitive.div
        {...rest}
        ref={ref}
        role={getRole(decorative)}
        aria-orientation={getAriaOrientation(decorative, orientation)}
        data-flt-orientation={orientation}
      />
    );
  }) as SeparatorFC;

  Separator.__ownerName = ownerName;

  return Separator;
}

const Separator: SeparatorFC = createSeparator(OWNER_NAME);

const getRole = (decorative: boolean): Role => {
  return decorative ? "none" : "separator";
};

const getAriaOrientation = (
  decorative: boolean,
  orientation: Orientation,
): "vertical" | undefined => {
  return !decorative && orientation === "vertical" ? "vertical" : undefined;
};

export { Separator, Separator as Root };
export type { SeparatorProps };

export { createSeparator };
export type { SeparatorFC };
