import * as FLT from "../src/index";

const EXPECTED_EXPORTS = [
  "Portal",
  "Root",
  "createPortal",
  "usePortalContext",
] as const;

it("should expose the appropriate `Portal` components", (): void => {
  let output = Object.keys(FLT);

  expect(output).toEqual(EXPECTED_EXPORTS);
});
