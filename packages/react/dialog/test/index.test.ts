import * as FLT from "../src/index";

const EXPECTED_EXPORTS = [
  "Dialog",
  "Root",
  "createDialog",
  "createDialogScope",

  "DialogTrigger",
  "Trigger",
  "createDialogTrigger",

  "DialogBackdrop",
  "Backdrop",
  "createDialogBackdrop",

  "DialogContent",
  "Content",
  "createDialogContent",

  "DialogTitle",
  "Title",
  "createDialogTitle",

  "DialogDescription",
  "Description",
  "createDialogDescription",

  "DialogClose",
  "Close",
  "createDialogClose",
] as const;

it("should expose the appropriate `Dialog` components", (): void => {
  let output = Object.keys(FLT);

  expect(output).toEqual(EXPECTED_EXPORTS);
});
