import * as FLT from "../src/index";

const EXPECTED_EXPORTS = [
  "Meter",
  "Root",
  "createMeter",
  "createMeterScope",

  "MeterIndicator",
  "Indicator",
  "createMeterIndicator",
] as const;

it("should expose the appropriate `Meter` components", (): void => {
  let output = Object.keys(FLT);

  expect(output).toEqual(EXPECTED_EXPORTS);
});
