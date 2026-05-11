import * as FLT from "../src/index";

const EXPECTED_EXPORTS = [
  "Slot",
  "Root",
  "createSlot",

  "Slottable",
  "createSlottable",
  "isSlottable",
] as const;

it("should expose the appropriate `Slot` components", (): void => {
  let output = Object.keys(FLT);

  expect(output).toEqual(EXPECTED_EXPORTS);
});
