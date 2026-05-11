import * as FLT from "../src/index";

const EXPECTED_EXPORTS = [
  "ToggleGroup",
  "Root",
  "createToggleGroup",
  "createToggleGroupScope",

  "ToggleGroupItem",
  "Item",
  "createToggleGroupItem",
] as const;

it("should expose the appropriate `ToggleGroup` components", (): void => {
  let output = Object.keys(FLT);

  expect(output).toEqual(EXPECTED_EXPORTS);
});
