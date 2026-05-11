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

import { createRadioProxy } from "@flt-ui/react-radio";

import { useRadioScope } from "./radio-group";

import type * as React from "react";
import type { Scope } from "@flt-ui/react-context-scope";
import type { RadioProxyFC, RadioProxyProps } from "@flt-ui/react-radio";

const OWNER_NAME = "RadioGroup.Proxy";

type ScopedProps<P> = P & {
  __scopeRadioGroup?: Scope;
};

type FC<P> = (props: P) => React.ReactNode;

type RadioGroupProxyProps = RadioProxyProps & {};

type RadioGroupProxyFC = FC<RadioGroupProxyProps> & {
  __ownerName?: string;
};

function createRadioGroupProxy(ownerName: string): RadioGroupProxyFC {
  const RadioProxy: RadioProxyFC = createRadioProxy(ownerName);

  const RadioGroupProxy = ((
    props: ScopedProps<RadioGroupProxyProps>,
  ): React.JSX.Element => {
    let { ref, ...rest } = props;

    let radioScope = useRadioScope(props.__scopeRadioGroup);

    return <RadioProxy {...radioScope} {...rest} ref={ref} />;
  }) as RadioGroupProxyFC;

  RadioGroupProxy.__ownerName = ownerName;

  return RadioGroupProxy;
}

const RadioGroupProxy: RadioGroupProxyFC = createRadioGroupProxy(OWNER_NAME);

export { RadioGroupProxy, RadioGroupProxy as Proxy };
export type { RadioGroupProxyProps };

export { createRadioGroupProxy };
export type { RadioGroupProxyFC };
