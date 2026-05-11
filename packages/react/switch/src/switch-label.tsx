import { createLabel } from "@flt-ui/react-label";

import { useSwitchContext } from "./switch";

import type * as React from "react";
import type { Scope } from "@flt-ui/react-context-scope";
import type { Omit } from "@flt-ui/react-primitive";
import type { LabelFC, LabelProps } from "@flt-ui/react-label";

const OWNER_NAME = "Switch.Label";

type ScopedProps<P> = P & {
  __scopeSwitch?: Scope;
};

type FC<P> = (props: P) => React.ReactNode;

type SwitchLabelProps = Omit<LabelProps, "htmlFor"> & {
  htmlFor?: string;
};

type SwitchLabelFC = FC<SwitchLabelProps> & {
  __ownerName?: string;
};

function createSwitchLabel(ownerName: string): SwitchLabelFC {
  const Label: LabelFC = createLabel(ownerName);

  const SwitchLabel = ((
    props: ScopedProps<SwitchLabelProps>,
  ): React.JSX.Element => {
    let { ref, htmlFor: _htmlFor, ...rest } = props;

    let context = useSwitchContext(OWNER_NAME, props.__scopeSwitch);

    let htmlFor = _htmlFor ?? context.id;

    return <Label {...rest} ref={ref} htmlFor={htmlFor} />;
  }) as SwitchLabelFC;

  SwitchLabel.__ownerName = ownerName;

  return SwitchLabel;
}

const SwitchLabel: SwitchLabelFC = createSwitchLabel(OWNER_NAME);

export { SwitchLabel, SwitchLabel as Label };
export type { SwitchLabelProps };

export { createSwitchLabel };
export type { SwitchLabelFC };
