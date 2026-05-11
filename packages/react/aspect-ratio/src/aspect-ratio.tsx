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
import { useDisplayAspectRatio } from "@flt-ui/react-use-aspect-ratio";

import type * as React from "react";
import type { PrimitiveProps } from "@flt-ui/react-primitive";

const OWNER_NAME = "DisplayAspectRatio";

type FC<P> = (props: P) => React.ReactNode;

type DisplayAspectRatio = `${number}:${number}`;

type DisplayAspectRatioProps = PrimitiveProps<"div"> & {
  ratio?: number | DisplayAspectRatio | null;
};

type DisplayAspectRatioFC = FC<DisplayAspectRatioProps> & {
  __ownerName?: string;
};

function createDisplayAspectRatio(ownerName: string): DisplayAspectRatioFC {
  const style = Object.freeze({
    position: "absolute",
    inset: 0,
  } as const) satisfies React.CSSProperties;

  const DisplayAspectRatio = ((
    props: DisplayAspectRatioProps,
  ): React.JSX.Element => {
    let { ref, ratio: _ratio = null, ...rest } = props;

    let { value } = useDisplayAspectRatio({
      ratio: _ratio,
      caller: ownerName,
    });

    return (
      <div
        data-flt-dar-wrapper={value}
        style={{
          position: "relative",
          width: "100%",
          paddingBottom: `${100 / value}%`,
        }}
      >
        <Primitive.div
          {...rest}
          ref={ref}
          style={{
            ...style,
            ...props.style,
          }}
        />
      </div>
    );
  }) as DisplayAspectRatioFC;

  DisplayAspectRatio.__ownerName = ownerName;

  return DisplayAspectRatio;
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
const DisplayAspectRatio: DisplayAspectRatioFC =
  createDisplayAspectRatio(OWNER_NAME);

export { DisplayAspectRatio, DisplayAspectRatio as Root };
export type { DisplayAspectRatioProps };

export { createDisplayAspectRatio };
export type { DisplayAspectRatioFC };
