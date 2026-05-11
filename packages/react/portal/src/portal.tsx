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
import * as ReactDOM from "react-dom";
import { createContext } from "@flt-ui/react-context";
import { useIsoMorphicEffect } from "@flt-ui/react-use-iso-morphic-effect";
import { getOwnerDocument } from "@flt-ui/dom";

const OWNER_NAME = "Portal";

type PortalContextValue = {
  persist?: true;
};

const [PortalContext, usePortalContext] = createContext<PortalContextValue>(
  OWNER_NAME,
  {
    defaultValue: {
      persist: undefined,
    },
  },
);

type FC<P> = (props: P) => React.ReactNode;

type PrimitiveProps = {
  children: React.ReactNode;
};

type PortalProps = PrimitiveProps & {
  container?: globalThis.Element | null;
  persist?: true;
};

type PortalFC = FC<PortalProps> & {
  __ownerName?: string;
};

function createPortal(ownerName: string): PortalFC {
  const Portal = ((props: PortalProps): React.JSX.Element | null => {
    let { container: _container, persist } = props;

    let [isMounted, setIsMounted] = React.useState<boolean>(false);

    useIsoMorphicEffect(() => {
      setIsMounted(true);

      return (): void => {
        setIsMounted(false);

        return;
      };
    }, []);

    let ownerDocument = getOwnerDocument(_container);

    let container = _container ?? (isMounted && ownerDocument.body);

    if (!container) {
      return null;
    }

    return (
      <PortalContext.Provider persist={persist}>
        {ReactDOM.createPortal(<>{props.children}</>, container)}
      </PortalContext.Provider>
    );
  }) as PortalFC;

  Portal.__ownerName = ownerName;

  return Portal;
}

const Portal: PortalFC = createPortal(OWNER_NAME);

export { Portal, Portal as Root };
export type { PortalProps };

export { createPortal };
export type { PortalFC };

export { usePortalContext };
