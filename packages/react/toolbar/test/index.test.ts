import * as FLT from "../src/index";

const EXPECTED_EXPORTS = ["Toolbar", "Root", "createToolbar"] as const;

it("should expose the appropriate `Toolbar` components", (): void => {
  let output = Object.keys(FLT);

  expect(output).toEqual(EXPECTED_EXPORTS);
});
