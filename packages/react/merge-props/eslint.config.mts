import * as zphyrx from "@zphyrx/eslint-config";

import type { FlatConfig } from "@typescript-eslint/utils/ts-eslint";

const GLOB_TESTS = ["**/?(*.)+(spec|test).ts?(x)"];

const config: FlatConfig.ConfigArray = zphyrx.config(
  {
    framework: "react",
    testing: [
      "vitest",
      {
        lib: true,
      },
    ],
    prettier: false,
  },
  {
    name: "@zphyrx/eslint-config",
    rules: {
      "prefer-const": "off",
      "no-duplicate-imports": [
        "error",
        {
          allowSeparateTypeImports: true,
        },
      ],
    },
  },
  {
    name: "@zphyrx/eslint-config/typescript",
    rules: {
      "@typescript-eslint/no-unsafe-return": "off",
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
  {
    name: "@zphyrx/eslint-config/vitest",
    files: GLOB_TESTS,
    rules: {
      "vitest/max-expects": [
        "warn",
        {
          max: 2,
        },
      ],
    },
  },
  {
    name: "@zphyrx/eslint-config/testing-library",
    files: GLOB_TESTS,
    rules: {
      "testing-library/no-manual-cleanup": "off",
      "testing-library/no-render-in-lifecycle": [
        "error",
        {
          allowTestingFrameworkSetupHook: "beforeEach",
        },
      ],
    },
  },
);

export default config;
