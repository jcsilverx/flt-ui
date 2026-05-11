import { clsx } from "@flt-ui/clsx";
import * as Popover from "@flt-ui/react-popover";
// import * as Portal from "@flt-ui/react-portal";
import * as Switch from "@flt-ui/react-switch";

import type * as React from "react";

function PopoverDemo(): React.JSX.Element {
  return (
    <Popover.Root>
      <Popover.Trigger
        className={clsx(
          "inline-flex h-9 items-center justify-center whitespace-nowrap rounded-md bg-slate-950 px-4 py-2 text-sm font-medium text-slate-50 outline-none transition-colors hover:bg-slate-950/90 focus-visible:ring-2 focus-visible:ring-slate-950/25 focus-visible:ring-offset-2",
        )}
      >
        Settings
      </Popover.Trigger>
      {/* <Portal.Root> */}
      <Popover.Content
        className={clsx(
          "max-w-37 z-1050 absolute mt-1 grid w-full gap-4 border border-slate-200 bg-slate-50 p-6 shadow-lg sm:rounded-lg",
        )}
      >
        <div className={clsx("flex items-center gap-2")}>
          <Switch.Root defaultChecked={true}>
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
              Wi-Fi
            </Switch.Label>
          </Switch.Root>
        </div>
        <div className={clsx("flex items-center gap-2")}>
          <Switch.Root defaultChecked={true}>
            <Switch.Trigger
              className={clsx(
                "inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow transition-[border,background,shadow] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-950/25 data-[flt-state=checked]:bg-slate-950 data-[flt-state=unchecked]:bg-slate-950/10",
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
              Bluetooth
            </Switch.Label>
          </Switch.Root>
        </div>
        <div className={clsx("flex items-center gap-2")}>
          <Switch.Root>
            <Switch.Trigger
              className={clsx(
                "inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow transition-[border,background,shadow] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-950/25 data-[flt-state=checked]:bg-slate-950 data-[flt-state=unchecked]:bg-slate-950/10",
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
              Mute
            </Switch.Label>
          </Switch.Root>
        </div>
      </Popover.Content>
      {/* </Portal.Root> */}
    </Popover.Root>
  );
}

export { PopoverDemo };
