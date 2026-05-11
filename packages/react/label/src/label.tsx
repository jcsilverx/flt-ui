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
import { useComposedEvent } from "@flt-ui/react-use-event";

import type * as React from "react";
import type { Omit, PrimitiveProps } from "@flt-ui/react-primitive";

const OWNER_NAME = "Label";
const SELECTORS = "button, input, select, textarea";

type FC<P> = (props: P) => React.ReactNode;

type LabelProps = Omit<PrimitiveProps<"label">, "htmlFor"> & {
  htmlFor?: string;
};

type LabelFC = FC<LabelProps> & {
  __ownerName?: string;
};

function createLabel(ownerName: string): LabelFC {
  const Label = ((props: LabelProps): React.JSX.Element => {
    let { ref, htmlFor, ...rest } = props;

    const handleMouseDown = useComposedEvent(
      props.onMouseDown,
      (event): void => {
        let { target } = event;

        if (!isHTMLElement(target) || target.closest(SELECTORS)) {
          return /** UNUSED */;
        }

        if (!event.defaultPrevented && event.detail > 1) {
          event.preventDefault();
        }

        return /** UNUSED */;
      },
    );

    return (
      <Primitive.label
        {...rest}
        ref={ref}
        htmlFor={htmlFor}
        onMouseDown={handleMouseDown}
      />
    );
  }) as LabelFC;

  Label.__ownerName = ownerName;

  return Label;
}

const Label: LabelFC = createLabel(OWNER_NAME);

const isHTMLElement = (element: unknown): element is globalThis.HTMLElement => {
  return element instanceof globalThis.HTMLElement;
};

export { Label, Label as Root };
export type { LabelProps };

export { createLabel };
export type { LabelFC };
