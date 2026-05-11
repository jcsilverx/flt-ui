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

import { makeTitleId, useDialogContext } from "./dialog";

import type * as React from "react";
import type { Scope } from "@flt-ui/react-context-scope";
import type { PrimitiveProps } from "@flt-ui/react-primitive";

const OWNER_NAME = "Dialog.Title";

type ScopedProps<P> = P & {
  __scopeDialog?: Scope;
};

type FC<P> = (props: P) => React.ReactNode;

type DialogTitleProps = PrimitiveProps<"h2"> & {};

type DialogTitleFC = FC<DialogTitleProps> & {
  __ownerName?: string;
};

function createDialogTitle(ownerName: string): DialogTitleFC {
  const DialogTitle = ((
    props: ScopedProps<DialogTitleProps>,
  ): React.JSX.Element => {
    let { ref, ...rest } = props;

    let context = useDialogContext(OWNER_NAME, props.__scopeDialog);

    let titleId = makeTitleId(context.id);

    return <Primitive.h2 {...rest} ref={ref} id={titleId} />;
  }) as DialogTitleFC;

  DialogTitle.__ownerName = ownerName;

  return DialogTitle;
}

const DialogTitle: DialogTitleFC = createDialogTitle(OWNER_NAME);

export { DialogTitle, DialogTitle as Title };
export type { DialogTitleProps };

export { createDialogTitle };
export type { DialogTitleFC };
