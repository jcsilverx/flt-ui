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

import { createRadioIndicator } from "@flt-ui/react-radio";

import { useRadioScope } from "./radio-group";

import type * as React from "react";
import type { Scope } from "@flt-ui/react-context-scope";
import type {
  RadioIndicatorFC,
  RadioIndicatorProps,
} from "@flt-ui/react-radio";

const OWNER_NAME = "RadioGroup.Indicator";

type ScopedProps<P> = P & {
  __scopeRadioGroup?: Scope;
};

type FC<P> = (props: P) => React.ReactNode;

type RadioGroupIndicatorProps = RadioIndicatorProps & {};

type RadioGroupIndicatorFC = FC<RadioGroupIndicatorProps> & {
  __ownerName?: string;
};

function createRadioGroupIndicator(ownerName: string): RadioGroupIndicatorFC {
  const RadioIndicator: RadioIndicatorFC = createRadioIndicator(ownerName);

  const RadioGroupIndicator = ((
    props: ScopedProps<RadioGroupIndicatorProps>,
  ): React.JSX.Element => {
    let { ref, ...rest } = props;

    let radioScope = useRadioScope(props.__scopeRadioGroup);

    return <RadioIndicator {...radioScope} {...rest} ref={ref} />;
  }) as RadioGroupIndicatorFC;

  RadioGroupIndicator.__ownerName = ownerName;

  return RadioGroupIndicator;
}

const RadioGroupIndicator: RadioGroupIndicatorFC =
  createRadioGroupIndicator(OWNER_NAME);

export { RadioGroupIndicator, RadioGroupIndicator as Indicator };
export type { RadioGroupIndicatorProps };

export { createRadioGroupIndicator };
export type { RadioGroupIndicatorFC };
