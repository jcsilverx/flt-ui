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
import { createUseId } from "@flt-ui/react-use-id";
import { useCollapsible } from "@flt-ui/react-use-collapsible";
import { createContextScope } from "@flt-ui/react-context-scope";

import type * as React from "react";
import type { Scope } from "@flt-ui/react-context-scope";
import type { PrimitiveProps } from "@flt-ui/react-primitive";
import type { UseId } from "@flt-ui/react-use-id";

const OWNER_NAME = "Collapsible";

type ScopedProps<P> = P & {
  __scopeCollapsible?: Scope;
};

const [createCollapsibleContext, createCollapsibleScope] =
  createContextScope(OWNER_NAME);

type CollapsibleContextValue = {
  id: string;
  open: boolean;
  onOpenChange: () => void;
  disabled: true | undefined;
};

const [CollapsibleContext, useCollapsibleContext] =
  createCollapsibleContext<CollapsibleContextValue>(OWNER_NAME);

type CollapsibleState = "open" | "closed";

type FC<P> = (props: P) => React.ReactNode;

type CollapsibleProps = PrimitiveProps<"div"> & {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
};

type CollapsibleFC = FC<CollapsibleProps> & {
  __ownerName?: string;
};

function createCollapsible(ownerName: string): CollapsibleFC {
  const useId: UseId = createUseId();

  const Collapsible = ((
    props: ScopedProps<CollapsibleProps>,
  ): React.JSX.Element => {
    let {
      ref,
      open: _open,
      defaultOpen: _defaultOpen,
      onOpenChange: _onOpenChange,
      disabled: _disabled = false,
      ...rest
    } = props;

    let { open, onOpenChange } = useCollapsible({
      open: _open,
      defaultOpen: _defaultOpen,
      onOpenChange: _onOpenChange,
      caller: ownerName,
    });

    let id = useId();
    let disabled = _disabled || undefined;

    return (
      <CollapsibleContext.Provider
        scope={props.__scopeCollapsible}
        id={id}
        open={open}
        onOpenChange={onOpenChange}
        disabled={disabled}
      >
        <Primitive.div
          {...rest}
          ref={ref}
          data-flt-state={getState(open)}
          data-flt-disabled={disabled}
        />
      </CollapsibleContext.Provider>
    );
  }) as CollapsibleFC;

  Collapsible.__ownerName = ownerName;

  return Collapsible;
}

const Collapsible: CollapsibleFC = createCollapsible(OWNER_NAME);

const getState = (open: boolean): CollapsibleState => {
  return open ? "open" : "closed";
};

export { Collapsible, Collapsible as Root };
export type { CollapsibleProps };

export { createCollapsible, getState };
export type { CollapsibleFC };

export { createCollapsibleScope, useCollapsibleContext };
