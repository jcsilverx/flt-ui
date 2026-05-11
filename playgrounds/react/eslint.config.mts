import * as zphyrx from "@zphyrx/eslint-config";

import type { FlatConfig } from "@typescript-eslint/utils/ts-eslint";

const config: FlatConfig.ConfigArray = zphyrx.config(
  {
    framework: [
      "react",
      {
        jsxA11y: true,
      },
    ],
    testing: [
      "vitest",
      {
        lib: true,
      },
    ],
    tailwindcss: true,
    storybook: true,
    prettier: false,
  },
  {
    name: "@zphyrx/eslint-config",
    rules: {
      "prefer-const": "off",
    },
  },
  {
    name: "@zphyrx/eslint-config/typescript",
    rules: {
      "@typescript-eslint/restrict-template-expressions": [
        "error",
        {
          allowNumber: true,
        },
      ],
    },
  },
  {
    name: "@zphyrx/eslint-config/vitest",
    files: ["**/?(*.)+(spec|test).ts"],
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
    name: "@zphyrx/eslint-config/react",
    files: ["**/*.tsx"],
    rules: {
      "react/jsx-pascal-case": "off",
    },
  },
  {
    name: "@zphyrx/eslint-config/tailwindcss",
    files: ["**/*.ts?(x)"],
    rules: {
      "tailwindcss/no-custom-classname": [
        "warn",
        {
          callees: ["cx"],
        },
      ],
    },
  },
);

export default config;
