import * as FLT from "../src/index";

const EXPECTED_EXPORTS = [
  "DisplayAspectRatio",
  "Root",
  "createDisplayAspectRatio",
] as const;

it("should expose the appropriate `AspectRatio` components", (): void => {
  let output = Object.keys(FLT);

  expect(output).toEqual(EXPECTED_EXPORTS);
});
