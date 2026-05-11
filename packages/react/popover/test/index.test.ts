import * as FLT from "../src/index";

const EXPECTED_EXPORTS = [
  "Popover",
  "Root",
  "createPopover",
  "createPopoverScope",

  "PopoverTrigger",
  "Trigger",
  "createPopoverTrigger",

  "PopoverContent",
  "Content",
  "createPopoverContent",

  "PopoverClose",
  "Close",
  "createPopoverClose",
] as const;

it("should expose the appropriate `Popover` components", (): void => {
  let output = Object.keys(FLT);

  expect(output).toEqual(EXPECTED_EXPORTS);
});
