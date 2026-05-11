import * as FLT from "../src/index";

const EXPECTED_EXPORTS = [
  "Radio",
  "Root",
  "createRadio",
  "createRadioScope",

  "RadioTrigger",
  "Trigger",
  "createRadioTrigger",

  "RadioIndicator",
  "Indicator",
  "createRadioIndicator",

  "RadioLabel",
  "Label",
  "createRadioLabel",

  "RadioProxy",
  "Proxy",
  "createRadioProxy",
] as const;

it("should expose the appropriate `Radio` components", (): void => {
  let output = Object.keys(FLT);

  expect(output).toEqual(EXPECTED_EXPORTS);
});
