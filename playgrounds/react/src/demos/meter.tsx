"use client";

import * as React from "react";
import { clsx } from "@flt-ui/clsx";
import * as Meter from "@flt-ui/react-meter";

function MeterDemo(): React.JSX.Element {
  const [value, setValue] = React.useState<number>(13);

  React.useEffect(() => {
    let timer = window.setTimeout((): void => {
      setValue(35);
    }, 500);

    return (): void => {
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <div className={clsx("min-w-65 max-w-87.5 w-full")}>
      <div
        className={clsx("mb-1 flex items-center justify-between font-semibold")}
      >
        <h3 id="storage_label">Storage space</h3>
        <span>{value}%</span>
      </div>

      <Meter.Root
        value={value}
        aria-labelledby="storage_label"
        className={clsx("relative h-2 rounded-full bg-slate-950/20")}
        style={{
          overflow: "clip",
        }}
      >
        <Meter.Indicator
          className={clsx("size-full flex-1 bg-slate-950 transition-all")}
          style={{
            transform: `translateX(-${100 - value}%)`,
          }}
        />
      </Meter.Root>
    </div>
  );
}

export { MeterDemo };
