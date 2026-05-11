import * as FLT from "../src/index";

const EXPECTED_EXPORTS = ["Separator", "Root", "createSeparator"] as const;

it("should expose the appropriate `Separator` components", (): void => {
  let output = Object.keys(FLT);

  expect(output).toEqual(EXPECTED_EXPORTS);
});
