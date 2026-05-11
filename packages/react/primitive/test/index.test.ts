import * as FLT from "../src/index";

const EXPECTED_EXPORTS = ["Primitive", "createPrimitive", "omit"] as const;

it("should expose the appropriate `Primitive` components", (): void => {
  let output = Object.keys(FLT);

  expect(output).toEqual(EXPECTED_EXPORTS);
});
