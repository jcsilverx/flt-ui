import { createLabel } from "@flt-ui/react-label";

import { useRadioContext } from "./radio";

import type * as React from "react";
import type { Scope } from "@flt-ui/react-context-scope";
import type { Omit } from "@flt-ui/react-primitive";
import type { LabelFC, LabelProps } from "@flt-ui/react-label";

const OWNER_NAME = "Radio.Label";

type ScopedProps<P> = P & {
  __scopeRadio?: Scope;
};

type FC<P> = (props: P) => React.ReactNode;

type RadioLabelProps = Omit<LabelProps, "htmlFor"> & {
  htmlFor?: string;
};

type RadioLabelFC = FC<RadioLabelProps> & {
  __ownerName?: string;
};

function createRadioLabel(ownerName: string): RadioLabelFC {
  const Label: LabelFC = createLabel(ownerName);

  const RadioLabel = ((
    props: ScopedProps<RadioLabelProps>,
  ): React.JSX.Element => {
    let { ref, htmlFor: _htmlFor, ...rest } = props;

    let context = useRadioContext(OWNER_NAME, props.__scopeRadio);

    let htmlFor = _htmlFor ?? context.id;

    return <Label {...rest} ref={ref} htmlFor={htmlFor} />;
  }) as RadioLabelFC;

  RadioLabel.__ownerName = ownerName;

  return RadioLabel;
}

const RadioLabel: RadioLabelFC = createRadioLabel(OWNER_NAME);

export { RadioLabel, RadioLabel as Label };
export type { RadioLabelProps };

export { createRadioLabel };
export type { RadioLabelFC };
