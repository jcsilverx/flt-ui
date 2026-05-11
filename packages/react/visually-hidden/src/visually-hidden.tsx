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
import { useFocusWithin } from "@flt-ui/react-use-focus-within";
import { useComposedEvent } from "@flt-ui/react-use-event";

import type { PrimitiveProps } from "@flt-ui/react-primitive";

const OWNER_NAME = "VisuallyHidden";
const PX_TO_REM = 1 / 16; // 1px in rem units assuming the root font-size is 16px

type FC<P> = (props: P) => React.ReactNode;

type VisuallyHiddenProps = PrimitiveProps<"span"> & {
  /**
   * Whether the element should become visible on focus, for example skip links.
   *
   * @default false
   */
  focusable?: boolean;
};

type VisuallyHiddenFC = FC<VisuallyHiddenProps> & {
  __ownerName?: string;
};

function createSrOnly(ownerName: string): VisuallyHiddenFC {
  const style = Object.freeze({
    position: "absolute",
    height: `${PX_TO_REM}rem`,
    width: `${PX_TO_REM}rem`,
    padding: 0,
    margin: `-${PX_TO_REM}rem`,
    overflow: "clip",
    // @see https://developer.mozilla.org/en-US/docs/Web/CSS/clip
    clipPath: "inset(50%)",
    whiteSpace: "nowrap",
    borderWidth: 0,
  } as const) satisfies React.CSSProperties;

  const VisuallyHidden = ((props: VisuallyHiddenProps): React.JSX.Element => {
    let { ref, focusable = false, ...rest } = props;

    let [IsFocusedWithin, setIsFocusedWithin] = React.useState<boolean>(false);

    let { onFocus, onBlur } = useFocusWithin({
      onFocusWithin: (): void => {
        if (!focusable) {
          return /** UNUSED */;
        }

        setIsFocusedWithin(true);

        return /** UNUSED */;
      },

      onBlurWithin: (): void => {
        if (!focusable) {
          return /** UNUSED */;
        }

        setIsFocusedWithin(false);

        return /** UNUSED */;
      },
    });

    const handleFocus = useComposedEvent(props.onFocus, onFocus);

    const handleBlur = useComposedEvent(props.onBlur, onBlur);

    return (
      <Primitive.span
        {...rest}
        ref={ref}
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={{
          ...(IsFocusedWithin ? {} : style),
          ...props.style,
        }}
      />
    );
  }) as VisuallyHiddenFC;

  VisuallyHidden.__ownerName = ownerName;

  return VisuallyHidden;
}

const VisuallyHidden: VisuallyHiddenFC = createSrOnly(OWNER_NAME);

export { VisuallyHidden, VisuallyHidden as Root };
export type { VisuallyHiddenProps };

export { createSrOnly };
export type { VisuallyHiddenFC };
