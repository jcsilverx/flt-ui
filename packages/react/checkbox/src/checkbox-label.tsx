import { createLabel } from "@flt-ui/react-label";

import { useCheckboxContext } from "./checkbox";

import type * as React from "react";
import type { Scope } from "@flt-ui/react-context-scope";
import type { Omit } from "@flt-ui/react-primitive";
import type { LabelFC, LabelProps } from "@flt-ui/react-label";

const OWNER_NAME = "Checkbox.Label";

type ScopedProps<P> = P & {
  __scopeCheckbox?: Scope;
};

type FC<P> = (props: P) => React.ReactNode;

type CheckboxLabelProps = Omit<LabelProps, "htmlFor"> & {
  htmlFor?: string;
};

type CheckboxLabelFC = FC<CheckboxLabelProps> & {
  __ownerName?: string;
};

function createCheckboxLabel(ownerName: string): CheckboxLabelFC {
  const Label: LabelFC = createLabel(ownerName);

  const CheckboxLabel = ((
    props: ScopedProps<CheckboxLabelProps>,
  ): React.JSX.Element => {
    let { ref, htmlFor: _htmlFor, ...rest } = props;

    let context = useCheckboxContext(OWNER_NAME, props.__scopeCheckbox);

    let htmlFor = _htmlFor ?? context.id;

    return <Label {...rest} ref={ref} htmlFor={htmlFor} />;
  }) as CheckboxLabelFC;

  CheckboxLabel.__ownerName = ownerName;

  return CheckboxLabel;
}

const CheckboxLabel: CheckboxLabelFC = createCheckboxLabel(OWNER_NAME);

export { CheckboxLabel, CheckboxLabel as Label };
export type { CheckboxLabelProps };

export { createCheckboxLabel };
export type { CheckboxLabelFC };
