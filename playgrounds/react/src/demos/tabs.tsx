import { clsx } from "@flt-ui/clsx";
import * as Tabs from "@flt-ui/react-tabs";

import type * as React from "react";

const tabs = [
  {
    value: "account",
    name: "Account",
    children: "Make changes to your account here. Click save when you're done.",
  },
  {
    value: "password",
    name: "Password",
    children: "Change your password here. After saving, you'll be logged out.",
  },
] as const;

function TabsDemo(): React.JSX.Element {
  return (
    <Tabs.Root mode="automatic" defaultValue={"account"}>
      <Tabs.List
        className={clsx(
          "grid h-9 w-full grid-cols-2 items-center justify-center rounded-lg bg-slate-950/5 p-1 text-slate-950/60",
        )}
      >
        {tabs.map((tab, index): React.JSX.Element => {
          return (
            <Tabs.Trigger
              key={index}
              className={clsx(
                "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium outline-none ring-offset-white transition-all focus-visible:ring-2 focus-visible:ring-slate-950/25 focus-visible:ring-offset-2 data-[flt-state=active]:bg-white data-[flt-state=active]:text-slate-950 data-[flt-state=active]:shadow",
              )}
              value={tab.value}
            >
              {tab.name}
            </Tabs.Trigger>
          );
        })}
      </Tabs.List>

      {tabs.map((tab, index): React.JSX.Element => {
        return (
          <Tabs.Content
            key={index}
            className={clsx(
              "mt-2 ring-offset-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-950/25",
            )}
            value={tab.value}
          >
            <div
              className={clsx(
                "rounded-xl border border-slate-200 bg-slate-50 text-slate-950 shadow",
              )}
            >
              <div className={clsx("flex flex-col space-y-1.5 p-6")}>
                <h3
                  className={clsx("font-semibold leading-none tracking-tight")}
                >
                  {tab.name}
                </h3>
                <p className={clsx("text-sm text-slate-950/50")}>
                  {tab.children}
                </p>
              </div>
              <div className={clsx("space-y-2 p-6 pt-0")}>
                This is the content area.
              </div>
              <div className={clsx("flex items-center p-6 pt-0")}>
                This is the footer area.
              </div>
            </div>
          </Tabs.Content>
        );
      })}
    </Tabs.Root>
  );
}

export { TabsDemo };
