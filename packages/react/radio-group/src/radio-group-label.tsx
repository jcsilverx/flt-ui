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

import { createRadioLabel } from "@flt-ui/react-radio";

import { useRadioScope } from "./radio-group";

import type * as React from "react";
import type { Scope } from "@flt-ui/react-context-scope";
import type { Omit } from "@flt-ui/react-primitive";
import type { RadioLabelFC, RadioLabelProps } from "@flt-ui/react-radio";

const OWNER_NAME = "RadioGroup.Label";

type ScopedProps<P> = P & {
  __scopeRadioGroup?: Scope;
};

type FC<P> = (props: P) => React.ReactNode;

type RadioGroupLabelProps = Omit<RadioLabelProps, "htmlFor"> & {
  htmlFor?: string;
};

type RadioGroupLabelFC = FC<RadioGroupLabelProps> & {
  __ownerName?: string;
};

function createRadioGroupLabel(ownerName: string): RadioGroupLabelFC {
  const RadioLabel: RadioLabelFC = createRadioLabel(ownerName);

  const RadioGroupLabel = ((
    props: ScopedProps<RadioGroupLabelProps>,
  ): React.JSX.Element => {
    let { ref, htmlFor, ...rest } = props;

    let radioScope = useRadioScope(props.__scopeRadioGroup);

    return <RadioLabel {...radioScope} {...rest} ref={ref} htmlFor={htmlFor} />;
  }) as RadioGroupLabelFC;

  RadioGroupLabel.__ownerName = ownerName;

  return RadioGroupLabel;
}

const RadioGroupLabel: RadioGroupLabelFC = createRadioGroupLabel(OWNER_NAME);

export { RadioGroupLabel, RadioGroupLabel as Label };
export type { RadioGroupLabelProps };

export { createRadioGroupLabel };
export type { RadioGroupLabelFC };
