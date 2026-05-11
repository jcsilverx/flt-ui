import { clsx } from "@flt-ui/clsx";
import * as Toggle from "@flt-ui/react-toggle";
import * as VisuallyHidden from "@flt-ui/react-visually-hidden";

import type * as React from "react";

function ToggleDemo(): React.JSX.Element {
  return (
    <Toggle.Root
      className={clsx(
        "inline-flex h-9 items-center justify-center whitespace-nowrap rounded-md border border-gray-200 bg-transparent px-4 py-2 text-sm font-medium shadow-sm outline-none transition-[color,background,border,text] hover:bg-gray-100 hover:text-gray-900 focus-visible:ring-2 focus-visible:ring-slate-950/25 focus-visible:ring-offset-2 data-[flt-state=active]:bg-gray-200 data-[flt-state=on]:bg-slate-200",
      )}
    >
      <span className={clsx("font-bold")}>B</span>
      <VisuallyHidden.Root>Toggle</VisuallyHidden.Root>
    </Toggle.Root>
  );
}

export { ToggleDemo };
