"use client";

import { AccordionDemo } from "../demos/accordion";
import { DisplayAspectRatioDemo } from "../demos/aspect-ratio";
import { CheckboxDemo } from "../demos/checkbox";
import { CollapsibleDemo } from "../demos/collapsible";
import { DialogDemo } from "../demos/dialog";
import { LabelDemo } from "../demos/label";
import { MeterDemo } from "../demos/meter";
import { PaginationDemo } from "../demos/pagination";
import { PopoverDemo } from "../demos/popover";
import { ProgressDemo } from "../demos/progress";
import { SeparatorDemo } from "../demos/separator";
import { SwitchDemo } from "../demos/switch";
import { TabsDemo } from "../demos/tabs";
import { ToggleGroupDemo } from "../demos/toggle-group";
import { ToggleDemo } from "../demos/toggle";
import { RadioGroupDemo } from "../demos/radio-group";
import { ToolbarDemo } from "../demos/toolbar";
import { VisuallyHiddenDemo } from "../demos/visually-hidden";

import type * as React from "react";

const demos = [
  {
    title: "Accordion",
    component: <AccordionDemo />,
  },
  {
    title: "Display Aspect Ratio",
    component: <DisplayAspectRatioDemo />,
  },
  {
    title: "Checkbox",
    component: <CheckboxDemo />,
  },
  {
    title: "Collapsible",
    component: <CollapsibleDemo />,
  },
  {
    title: "Dialog",
    component: <DialogDemo />,
  },
  {
    title: "Label",
    component: <LabelDemo />,
  },
  {
    title: "Meter",
    component: <MeterDemo />,
  },

  {
    title: "Pagination",
    component: <PaginationDemo />,
  },
  {
    title: "Popover",
    component: <PopoverDemo />,
  },
  {
    title: "Progress",
    component: <ProgressDemo />,
  },
  {
    title: "Radio Group",
    component: <RadioGroupDemo />,
  },
  {
    title: "Separator",
    component: <SeparatorDemo />,
  },
  {
    title: "Switch",
    component: <SwitchDemo />,
  },
  {
    title: "Tabs",
    component: <TabsDemo />,
  },
  {
    title: "Toggle",
    component: <ToggleDemo />,
  },
  {
    title: "ToggleGroup",
    component: <ToggleGroupDemo />,
  },
  {
    title: "Toolbar",
    component: <ToolbarDemo />,
  },
  {
    title: "Visually Hidden",
    component: <VisuallyHiddenDemo />,
  },
] as const;

export default function Home(): React.JSX.Element {
  return (
    <div className="flex flex-col gap-y-5 px-4 py-40">
      {demos.map((demo, index): React.JSX.Element => {
        return (
          <div key={index}>
            <h2 className="mb-4 font-semibold">{demo.title}</h2>
            {demo.component}
          </div>
        );
      })}
    </div>
  );
}
