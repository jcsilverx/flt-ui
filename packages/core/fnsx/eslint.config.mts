import * as zphyrx from "@zphyrx/eslint-config";

import type { FlatConfig } from "@typescript-eslint/utils/ts-eslint";

const GLOB_TESTS = ["**/?(*.)+(spec|test).ts"];

const config: FlatConfig.ConfigArray = zphyrx.config(
  {
    framework: false,
    testing: "vitest",
    prettier: false,
  },
  {
    name: "@zphyrx/eslint-config",
    rules: {
      "prefer-const": "off",
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
);

export default config;
