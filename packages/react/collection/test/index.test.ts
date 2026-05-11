import * as FLT from "../src/index";

const EXPECTED_EXPORTS = [
  "createCollection",

  "isLeft",
  "isRight",
  "isBoth",
  "left",
  "right",
  "both",
] as const;

it("should expose the appropriate `Collection` components", (): void => {
  let output = Object.keys(FLT);

  expect(output).toEqual(EXPECTED_EXPORTS);
});
