import * as FLT from "../src/index";

const EXPECTED_EXPORTS = [
  "Accordion",
  "Root",
  "createAccordion",
  "createAccordionScope",

  "AccordionItem",
  "Item",
  "createAccordionItem",

  "AccordionHeader",
  "Header",
  "createAccordionHeader",

  "AccordionTrigger",
  "Trigger",
  "createAccordionTrigger",

  "AccordionContent",
  "Content",
  "createAccordionContent",
] as const;

it("should expose the appropriate `Accordion` components", (): void => {
  let output = Object.keys(FLT);

  expect(output).toEqual(EXPECTED_EXPORTS);
});
