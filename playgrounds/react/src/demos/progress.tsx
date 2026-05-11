"use client";

import * as React from "react";
import { clsx } from "@flt-ui/clsx";
import * as Progress from "@flt-ui/react-progress";

function ProgressDemo(): React.JSX.Element {
  const [progress, setProgress] = React.useState<number>(13);

  React.useEffect(() => {
    let timer = window.setTimeout((): void => {
      setProgress(66);
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
        <h3 id="loading_label">Loading...</h3>
        <span>{progress}%</span>
      </div>

      <Progress.Root
        value={progress}
        aria-labelledby="loading_label"
        className={clsx("relative h-2  rounded-full bg-slate-950/20")}
        style={{
          overflow: "clip",
        }}
      >
        <Progress.Indicator
          className={clsx("size-full flex-1 bg-slate-950 transition-all")}
          style={{
            transform: `translateX(-${100 - progress}%)`,
          }}
        />
      </Progress.Root>
    </div>
  );
}

export { ProgressDemo };
