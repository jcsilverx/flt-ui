import { fnsx } from "../src/index";

describe("fnsx method", (): void => {
  describe("when no functions are provided", (): void => {
    it("should be able to handle it gracefully", (): void => {
      let fn = fnsx();

      expect((): void => {
        fn();
      }).not.toThrow();
    });
  });

  describe("given multiple functions", (): void => {
    let fn1Mock = vi.fn();
    let fn2Mock = vi.fn();

    it("should be able to combine them", (): void => {
      let fn = fnsx(fn1Mock, fn2Mock);

      fn();

      expect(fn1Mock).toBeCalledTimes(1);
      expect(fn2Mock).toBeCalledTimes(1);
    });
  });

  describe("given multiple functions with arguments", (): void => {
    let fn1Mock = vi.fn();
    let fn2Mock = vi.fn();
    let args: string[] = ["arg1", "arg2", "arg3"];

    it("should be able to combine them", (): void => {
      let fn = fnsx(fn1Mock, fn2Mock);

      fn(...args);

      expect(fn1Mock).toBeCalledTimes(1);
      expect(fn2Mock).toBeCalledTimes(1);

      // eslint-disable-next-line vitest/max-expects
      expect(fn1Mock).toHaveBeenCalledExactlyOnceWith(...args);
      // eslint-disable-next-line vitest/max-expects
      expect(fn2Mock).toHaveBeenCalledExactlyOnceWith(...args);
    });
  });

  describe("given an undefined function", (): void => {
    let fnMock = vi.fn();

    it("should be able to handle it gracefully", (): void => {
      let fn = fnsx(fnMock, undefined);

      fn();

      expect(fnMock).toBeCalledTimes(1);
      expect((): void => {
        fn();
      }).not.toThrow();
    });
  });
});
