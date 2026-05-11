import { clsx } from "@flt-ui/clsx";
import * as ToggleGroup from "@flt-ui/react-toggle-group";

import type * as React from "react";

const toggles = [
  { value: "bold", text: "B" },
  { value: "italic", text: "I" },
  { value: "underline", text: "U" },
] as const;

function ToggleGroupDemo(): React.JSX.Element {
  return (
    <ToggleGroup.Root className={clsx("flex gap-1.5")} mode="multiple">
      {toggles.map((toggle, index): React.JSX.Element => {
        return (
          <ToggleGroup.Item
            key={index}
            className={clsx(
              "inline-flex h-9 items-center justify-center whitespace-nowrap rounded-md border border-gray-200 bg-transparent px-4 py-2 text-sm font-medium shadow-sm outline-none transition-[color,background,border,text] hover:bg-gray-100 hover:text-gray-900 focus-visible:ring-2 focus-visible:ring-slate-950/25 focus-visible:ring-offset-2 data-[flt-state=active]:bg-gray-200 data-[flt-state=on]:bg-slate-200",
            )}
            value={toggle.value}
          >
            <span
              className={clsx({
                "font-bold": toggle.value === "bold",
                italic: toggle.value === "italic",
                "underline underline-offset-4": toggle.value === "underline",
              })}
            >
              {toggle.text}
            </span>
          </ToggleGroup.Item>
        );
      })}
    </ToggleGroup.Root>
  );
}

export { ToggleGroupDemo };
