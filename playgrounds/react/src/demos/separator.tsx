import * as Separator from "@flt-ui/react-separator";

import type * as React from "react";

function SeparatorDemo(): React.JSX.Element {
  return (
    <div className="my-4 h-8 space-y-4 px-4">
      <Separator.Root className="bg-slate-950/20 data-[flt-orientation=horizontal]:h-px data-[flt-orientation=horizontal]:w-full" />

      <Separator.Root
        className="bg-slate-950/20 data-[flt-orientation=vertical]:h-full data-[flt-orientation=vertical]:w-px"
        orientation="vertical"
        decorative={true}
      />
    </div>
  );
}

export { SeparatorDemo };
