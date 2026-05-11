import { clsx } from "@flt-ui/clsx";
import * as Collapsible from "@flt-ui/react-collapsible";
import * as VisuallyHidden from "@flt-ui/react-visually-hidden";

import type * as React from "react";

function CollapsibleDemo(): React.JSX.Element {
  return (
    <Collapsible.Root
      className={clsx("min-w-65 max-w-87.5 flex flex-col gap-2")}
    >
      <div className={clsx("flex items-center justify-between gap-4 px-4")}>
        <h4 className={clsx("text-sm font-semibold")}>
          @jcsilverx has starred 3 repositories
        </h4>
        <Collapsible.Trigger
          className={clsx(
            "inline-flex size-8 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md bg-slate-50 text-sm font-medium outline-none hover:bg-slate-950/5 focus-visible:ring-2 focus-visible:ring-slate-950/25 focus-visible:ring-offset-2",
          )}
        >
          <span className={clsx("text-[1.2rem]")}>&#x2195;</span>
          <VisuallyHidden.Root>Toggle</VisuallyHidden.Root>
        </Collapsible.Trigger>
      </div>
      <div
        className={clsx(
          "rounded-md border border-slate-950/15 px-4 py-2 font-mono text-sm",
        )}
      >
        @flt-ui/react-primitives
      </div>
      <Collapsible.Content className={clsx("flex flex-col gap-2")}>
        <div
          className={clsx(
            "rounded-md border border-slate-950/15 px-4 py-2 font-mono text-sm",
          )}
        >
          @flt-ui/react-themes
        </div>
        <div
          className={clsx(
            "rounded-md border border-slate-950/15 px-4 py-2 font-mono text-sm",
          )}
        >
          @flt-ui/react-headlessuse
        </div>
      </Collapsible.Content>
    </Collapsible.Root>
  );
}

export { CollapsibleDemo };
