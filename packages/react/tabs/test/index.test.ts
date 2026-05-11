import * as FLT from "../src/index";

const EXPECTED_EXPORTS = [
  "Tabs",
  "Root",
  "createTabs",
  "createTabsScope",

  "TabsList",
  "List",
  "createTabsList",

  "TabsTrigger",
  "Trigger",
  "createTabsTrigger",

  "TabsContent",
  "Content",
  "createTabsContent",
] as const;

it("should expose the appropriate `Tabs` components", (): void => {
  let output = Object.keys(FLT);

  expect(output).toEqual(EXPECTED_EXPORTS);
});
