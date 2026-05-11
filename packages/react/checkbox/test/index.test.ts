import * as FLT from "../src/index";

const EXPECTED_EXPORTS = [
  "Checkbox",
  "Root",
  "createCheckbox",
  "createCheckboxScope",

  "CheckboxTrigger",
  "Trigger",
  "createCheckboxTrigger",

  "CheckboxIndicator",
  "Indicator",
  "createCheckboxIndicator",

  "CheckboxLabel",
  "Label",
  "createCheckboxLabel",

  "CheckboxProxy",
  "Proxy",
  "createCheckboxProxy",
] as const;

it("should expose the appropriate `Checkbox` components", (): void => {
  let output = Object.keys(FLT);

  expect(output).toEqual(EXPECTED_EXPORTS);
});
