import * as FLT from "../src/index";

const EXPECTED_EXPORTS = [
  "Switch",
  "Root",
  "createSwitch",
  "createSwitchScope",

  "SwitchTrigger",
  "Trigger",
  "createSwitchTrigger",

  "SwitchThumb",
  "Thumb",
  "createSwitchThumb",

  "SwitchLabel",
  "Label",
  "createSwitchLabel",

  "SwitchProxy",
  "Proxy",
  "createSwitchProxy",
] as const;

it("should expose the appropriate `Switch` components", (): void => {
  let output = Object.keys(FLT);

  expect(output).toEqual(EXPECTED_EXPORTS);
});
