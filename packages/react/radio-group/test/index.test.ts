import * as FLT from "../src/index";

const EXPECTED_EXPORTS = [
  "RadioGroup",
  "Root",
  "createRadioGroup",
  "createRadioGroupScope",

  "RadioGroupItem",
  "Item",
  "createRadioGroupItem",

  "RadioGroupTrigger",
  "Trigger",
  "createRadioGroupTrigger",

  "RadioGroupIndicator",
  "Indicator",
  "createRadioGroupIndicator",

  "RadioGroupLabel",
  "Label",
  "createRadioGroupLabel",

  "RadioGroupProxy",
  "Proxy",
  "createRadioGroupProxy",
] as const;

it("should expose the appropriate `RadioGroup` components", (): void => {
  let output = Object.keys(FLT);

  expect(output).toEqual(EXPECTED_EXPORTS);
});
