import { clsx } from "../src/index";

describe("clsx method", (): void => {
  describe("when no class names are provided", (): void => {
    it("should be able to handle it gracefully", (): void => {
      let output = clsx();

      expect(output).toBe("");
    });
  });

  describe("given multiple classes", (): void => {
    it("should be able to combine them into a single string", (): void => {
      let output = clsx("px-4", "py-2", "bg-slate-500");

      expect(output).toBe("px-4 py-2 bg-slate-500");
    });

    it("should be able to add them conditionally", (): void => {
      let output = clsx("px-4", { "py-2": true }, { "bg-slate-500": false });

      expect(output).toBe("px-4 py-2");
    });
  });
});
