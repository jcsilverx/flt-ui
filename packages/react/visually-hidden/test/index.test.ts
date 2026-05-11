import * as FLT from "../src/index";

const EXPECTED_EXPORTS = ["VisuallyHidden", "Root", "createSrOnly"] as const;

it("should expose the appropriate `VisuallyHidden` components", (): void => {
  let output = Object.keys(FLT);

  expect(output).toEqual(EXPECTED_EXPORTS);
});
