import * as FLT from "../src/index";

const EXPECTED_EXPORTS = ["Label", "Root", "createLabel"] as const;

it("should expose the appropriate `Label` components", (): void => {
  let output = Object.keys(FLT);

  expect(output).toEqual(EXPECTED_EXPORTS);
});
