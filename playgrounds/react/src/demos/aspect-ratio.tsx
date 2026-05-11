import { clsx } from "@flt-ui/clsx";
import * as DisplayAspectRatio from "@flt-ui/react-aspect-ratio";

import type * as React from "react";

function DisplayAspectRatioDemo(): React.JSX.Element {
  return (
    <DisplayAspectRatio.Root ratio={"16:9"}>
      <div className={clsx("size-full bg-slate-300")} />
    </DisplayAspectRatio.Root>
  );
}

export { DisplayAspectRatioDemo };
