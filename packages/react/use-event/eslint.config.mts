import * as zphyrx from "@zphyrx/eslint-config";

import type { FlatConfig } from "@typescript-eslint/utils/ts-eslint";

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
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/unified-signatures": "off",
    },
  },
);

export default config;
