import * as React from "react";
import { render as testRender, screen, cleanup } from "@testing-library/react";

import { mergeProps } from "../src/merge-props";

const COMP_TEST_ID = "test-comp";

describe("mergeProps method", (): void => {
  describe("given multiple `onClick` events", (): void => {
    let fn1Mock = vi.fn();
    let fn2Mock = vi.fn();

    it("should be able to combine them into a single `onClick`", (): void => {
      let output = mergeProps({ onClick: fn1Mock }, { onClick: fn2Mock });

      output.onClick();

      expect(fn1Mock).toHaveBeenCalledTimes(1);
      expect(fn2Mock).toHaveBeenCalledTimes(1);
    });
  });

  describe("given multiple class names", (): void => {
    it("should be able to combine them into a single `className`", (): void => {
      let output = mergeProps({ className: "a" }, { className: "b" });

      expect(output.className).toBe("a b");
    });
  });

  describe("given multiple styles", (): void => {
    it("should be able to combine them into a single `style`", (): void => {
      let output = mergeProps(
        {
          style: {
            color: "#000",
            fontSize: "1rem",
          },
        },
        {
          style: {
            color: "#fff",
          },
        },
      );

      expect(output.style).toEqual({
        color: "#fff",
        fontSize: "1rem",
      });
    });
  });

  describe("given multiple refs", (): void => {
    const ref1 = React.createRef<HTMLDivElement>();
    const ref2 = React.createRef<HTMLDivElement>();

    beforeEach((): void => {
      testRender(<TestComp ref1={ref1} ref2={ref2} />);
    });

    afterEach(cleanup);

    it("should be able to combine them into a single `ref`", (): void => {
      let output = screen.getByTestId(COMP_TEST_ID);

      expect(ref1.current).toBe(output);
      expect(ref2.current).toBe(output);
    });
  });

  describe("given other props", (): void => {
    it("should be able to pass them as-is", (): void => {
      let output = mergeProps({ id: "a" }, { title: "b" });

      expect(output).toEqual({ id: "a", title: "b" });
    });
  });
});

type TestCompProps = {
  ref1: React.Ref<HTMLDivElement>;
  ref2: React.Ref<HTMLDivElement>;
};

function TestComp(props: TestCompProps): React.JSX.Element {
  let { ref1, ref2 } = props;

  let merged = mergeProps({ ref: ref1 }, { ref: ref2 });

  return <div ref={merged.ref} data-testid={COMP_TEST_ID} />;
}
