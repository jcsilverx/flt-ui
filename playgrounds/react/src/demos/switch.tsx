import { clsx } from "@flt-ui/clsx";
import * as Switch from "@flt-ui/react-switch";

import type * as React from "react";

function SwitchDemo(): React.JSX.Element {
  return (
    <div className={clsx("flex items-center space-x-2")}>
      <Switch.Root>
        <Switch.Trigger
          className={clsx(
            "inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow outline-none transition-[border,background,shadow] focus-visible:ring-2 focus-visible:ring-slate-950/25 focus-visible:ring-offset-2 data-[flt-state=checked]:bg-slate-950 data-[flt-state=unchecked]:bg-slate-950/10",
          )}
        >
          <Switch.Thumb
            className={clsx(
              "block size-4 rounded-full bg-slate-50 shadow-lg ring-0 transition-transform data-[flt-state=checked]:translate-x-4 data-[flt-state=unchecked]:translate-x-0",
            )}
          />
        </Switch.Trigger>
        <Switch.Label
          className={clsx(
            "flex items-center gap-2 text-sm font-semibold leading-none",
          )}
        >
          Airplane Mode
        </Switch.Label>
        {/* <Switch.Proxy /> -- */}
      </Switch.Root>
    </div>
  );
}

export { SwitchDemo };
