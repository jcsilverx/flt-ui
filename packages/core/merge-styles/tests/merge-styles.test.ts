import { mergeStyles } from "../src/index";

import type * as CSS from "csstype";

describe("mergeStyles method", (): void => {
  describe("when no style objects are provided", (): void => {
    it("should return undefined", (): void => {
      let output = mergeStyles({});

      expect(output).toBe(undefined);
    });
  });

  describe("given a css property", (): void => {
    let styles: CSS.Properties = {
      backgroundColor: "#000",
    };

    it("should be able to override properties with later ones", (): void => {
      let output = mergeStyles(styles, {
        backgroundColor: "#fff",
        color: "#000",
      });

      expect(output).toEqual({
        backgroundColor: "#fff",
        color: "#000",
      });
    });

    it("should be able to combine them into a single style object", (): void => {
      let output = mergeStyles(styles, { color: "#000" });

      expect(output).toEqual({
        backgroundColor: "#000",
        color: "#000",
      });
    });
  });
});
