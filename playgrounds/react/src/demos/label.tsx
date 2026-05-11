import { clsx } from "@flt-ui/clsx";
import * as Label from "@flt-ui/react-label";
import * as Checkbox from "@flt-ui/react-checkbox";

import type * as React from "react";

function LabelDemo(): React.JSX.Element {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox.Root>
        <Checkbox.Trigger
          id="terms-1"
          className={clsx(
            "rounded-xs shadow-xs size-4 shrink-0 border outline-none transition-shadow focus-visible:ring-2 focus-visible:ring-slate-950/25 focus-visible:ring-offset-2",
          )}
        >
          <Checkbox.Indicator
            className={clsx(
              "flex items-center justify-center text-current transition-none",
            )}
          >
            <CheckboxIcon
              className={clsx("flex size-3.5 items-center justify-center")}
            />
          </Checkbox.Indicator>
        </Checkbox.Trigger>
      </Checkbox.Root>
      <Label.Root
        htmlFor="terms-1"
        className={clsx(
          "flex items-center gap-2 text-sm font-semibold leading-none",
        )}
      >
        Accept terms and conditions
      </Label.Root>
    </div>
  );
}

function CheckboxIcon({
  className,
}: {
  className?: string;
}): React.JSX.Element {
  return <span className={className}>&#x2713;</span>;
}

export { LabelDemo };
