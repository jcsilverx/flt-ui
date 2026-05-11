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

import { getState, useDialogContext } from "./dialog";

import type * as React from "react";
import type { Scope } from "@flt-ui/react-context-scope";
import type { PrimitiveProps } from "@flt-ui/react-primitive";

const OWNER_NAME = "Dialog.Backdrop";

type ScopedProps<P> = P & {
  __scopeDialog?: Scope;
};

type FC<P> = (props: P) => React.ReactNode;

type DialogBackdropProps = Omit<
  PrimitiveProps<"div">,
  "children" | "asChild"
> & {
  persist?: true;
};

type DialogBackdropFC = FC<DialogBackdropProps> & {
  __ownerName?: string;
};

function createDialogBackdrop(ownerName: string): DialogBackdropFC {
  const style = Object.freeze({
    pointerEvents: "auto",
  } as const) satisfies React.CSSProperties;

  const DialogBackdrop = ((
    props: ScopedProps<DialogBackdropProps>,
  ): React.JSX.Element | null => {
    let { ref, persist, ...rest } = props;

    let context = useDialogContext(OWNER_NAME, props.__scopeDialog);

    return (
      <>
        {context.modal ? (
          persist || context.open ? (
            <Primitive.div
              {...rest}
              ref={ref}
              data-flt-state={getState(context.open)}
              style={{
                ...style,
                ...props.style,
              }}
            />
          ) : null
        ) : null}
      </>
    );
  }) as DialogBackdropFC;

  DialogBackdrop.__ownerName = ownerName;

  return DialogBackdrop;
}

const DialogBackdrop: DialogBackdropFC = createDialogBackdrop(OWNER_NAME);

export { DialogBackdrop, DialogBackdrop as Backdrop };
export type { DialogBackdropProps };

export { createDialogBackdrop };
export type { DialogBackdropFC };
