import { clsx } from "@flt-ui/clsx";
import * as Accordion from "@flt-ui/react-accordion";

import type * as React from "react";

const items = [
  {
    value: "personal",
    trigger: "Personal Info",
    content: "This is the personal info content.",
  },
  {
    value: "billing",
    trigger: "Billing Address",
    content: "This is the billing address content.",
  },
] as const;

function AccordionDemo(): React.JSX.Element {
  return (
    <Accordion.Root
      mode="single"
      defaultValue={"personal"}
      collapsible={true}
      className={clsx("min-w-65 max-w-87.5 flex flex-col")}
    >
      {items.map((item) => (
        <Accordion.Item
          key={item.value}
          value={item.value}
          className={clsx("flex flex-col gap-1 text-balance")}
        >
          <Accordion.Header className="flex">
            <Accordion.Trigger
              className={clsx(
                "flex flex-1 items-start justify-between gap-4 rounded-md px-1 py-2 text-left text-sm font-semibold outline-none focus-visible:ring-2 focus-visible:ring-slate-950/25 focus-visible:ring-offset-2",
              )}
            >
              {item.trigger}
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content
            className={clsx(
              "data-[flt-state=closed]:animate-accordion-up data-[flt-state=open]:animate-accordion-down text-clip text-sm",
            )}
          >
            <div className={clsx("pyt-0 px-1 pb-2")}>{item.content}</div>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}

export { AccordionDemo };
