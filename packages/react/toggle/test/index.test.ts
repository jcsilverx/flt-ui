import * as FLT from "../src/index";

const EXPECTED_EXPORTS = ["Toggle", "Root", "createToggle"] as const;

it("should expose the appropriate `Toggle` components", (): void => {
  let output = Object.keys(FLT);

  expect(output).toEqual(EXPECTED_EXPORTS);
});
