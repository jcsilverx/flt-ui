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

import { createContext } from "@flt-ui/react-context";

import type * as React from "react";

const OWNER_NAME = "Direction";

type Direction = "ltr" | "rtl";

type DirectionContextValue = {
  dir: Direction;
};

const [DirectionContext, useDirectionContext] =
  createContext<DirectionContextValue>(OWNER_NAME, {
    defaultValue: {
      dir: "ltr",
    },
  });

type FC<P> = (props: P) => React.ReactNode;

type PrimitiveProps = {
  children?: React.ReactNode;
};

type DirectionProps = PrimitiveProps & {
  dir: Direction;
};

type DirectionFC = FC<DirectionProps> & {
  __ownerName?: string;
};

function createDirection(ownerName: string): DirectionFC {
  const Direction = ((props: DirectionProps): React.JSX.Element => {
    let { dir, children } = props;

    return (
      <DirectionContext.Provider dir={dir}>
        {children}
      </DirectionContext.Provider>
    );
  }) as DirectionFC;

  Direction.__ownerName = ownerName;

  return Direction;
}

function useDirection(localDir?: Direction): Direction {
  let globalDir = useDirectionContext(OWNER_NAME);

  return localDir ?? globalDir.dir;
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
const Direction: DirectionFC = createDirection(OWNER_NAME);

const isDirectionLTR = (direction: Direction): direction is "ltr" => {
  return direction === "ltr";
};

export { Direction, Direction as Provider };
export type { DirectionProps };

export { createDirection };
export type { DirectionFC };

export { useDirection };

export { isDirectionLTR };
