import * as zphyrx from "@zphyrx/eslint-config";

import type { FlatConfig } from "@typescript-eslint/utils/ts-eslint";

const config: FlatConfig.ConfigArray = zphyrx.config(
  {
    framework: "react",
    testing: false,
    prettier: false,
  },
  {
    name: "@zphyrx/eslint-config",
    rules: {
      "prefer-const": "off",
    },
  },
);

export default config;
