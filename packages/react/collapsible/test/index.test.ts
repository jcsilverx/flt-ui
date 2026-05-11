import * as FLT from "../src/index";

const EXPECTED_EXPORTS = [
  "Collapsible",
  "Root",
  "createCollapsible",
  "createCollapsibleScope",

  "CollapsibleTrigger",
  "Trigger",
  "createCollapsibleTrigger",

  "CollapsibleContent",
  "Content",
  "createCollapsibleContent",
] as const;

it("should expose the appropriate `Collapsible` components", (): void => {
  let output = Object.keys(FLT);

  expect(output).toEqual(EXPECTED_EXPORTS);
});
