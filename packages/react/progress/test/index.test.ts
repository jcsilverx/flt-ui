import * as FLT from "../src/index";

const EXPECTED_EXPORTS = [
  "Progress",
  "Root",
  "createProgress",
  "createProgressScope",

  "ProgressIndicator",
  "Indicator",
  "createProgressIndicator",
] as const;

it("should expose the appropriate `Progress` components", (): void => {
  let output = Object.keys(FLT);

  expect(output).toEqual(EXPECTED_EXPORTS);
});
