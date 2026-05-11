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

import { makeDescriptionId, useDialogContext } from "./dialog";

import type * as React from "react";
import type { Scope } from "@flt-ui/react-context-scope";
import type { PrimitiveProps } from "@flt-ui/react-primitive";

const OWNER_NAME = "Dialog.Description";

type ScopedProps<P> = P & {
  __scopeDialog?: Scope;
};

type FC<P> = (props: P) => React.ReactNode;

type DialogDescriptionProps = PrimitiveProps<"p"> & {};

type DialogDescriptionFC = FC<DialogDescriptionProps> & {
  __ownerName?: string;
};

function createDialogDescription(ownerName: string): DialogDescriptionFC {
  const DialogDescription = ((
    props: ScopedProps<DialogDescriptionProps>,
  ): React.JSX.Element => {
    let { ref, ...rest } = props;

    let context = useDialogContext(OWNER_NAME, props.__scopeDialog);

    let descriptionId = makeDescriptionId(context.id);

    return <Primitive.p {...rest} ref={ref} id={descriptionId} />;
  }) as DialogDescriptionFC;

  DialogDescription.__ownerName = ownerName;

  return DialogDescription;
}

const DialogDescription: DialogDescriptionFC =
  createDialogDescription(OWNER_NAME);

export { DialogDescription, DialogDescription as Description };
export type { DialogDescriptionProps };

export { createDialogDescription };
export type { DialogDescriptionFC };
