import { clsx } from "@flt-ui/clsx";
import * as RadioGroup from "@flt-ui/react-radio-group";

import type * as React from "react";

const radios = [
  {
    value: "default",
    label: "Default",
  },
  {
    value: "comfortable",
    label: "Comfortable",
  },
  {
    value: "compact",
    label: "Compact",
  },
] as const;

function RadioGroupDemo(): React.JSX.Element {
  return (
    <form action="#">
      <RadioGroup.Root className={clsx("grid gap-3")} defaultValue={null}>
        {radios.map((radio, index): React.JSX.Element => {
          return (
            <div
              key={index}
              className={clsx("flex items-center justify-start gap-3")}
            >
              <RadioGroup.Item value={radio.value}>
                <RadioGroup.Trigger
                  className={clsx(
                    "shadow-xs flex aspect-square size-4 shrink-0 items-center justify-center rounded-full border outline-none transition-[color,box-shadow_border] focus-visible:border-slate-950/55 focus-visible:ring-2 focus-visible:ring-slate-950/25 focus-visible:ring-offset-2 data-[flt-state=checked]:bg-slate-950",
                  )}
                >
                  <RadioGroup.Indicator
                    className={clsx(
                      "block rounded-full bg-slate-50 transition-all duration-300 ease-in-out data-[flt-state=checked]:size-1 data-[flt-state=unchecked]:size-2.5",
                    )}
                    persist={true}
                  />
                </RadioGroup.Trigger>
                <RadioGroup.Label
                  className={clsx(
                    "flex items-center gap-2 text-sm font-semibold leading-none",
                  )}
                >
                  {radio.label}
                </RadioGroup.Label>
                <RadioGroup.Proxy />
              </RadioGroup.Item>
            </div>
          );
        })}
      </RadioGroup.Root>
    </form>
  );
}

export { RadioGroupDemo };
