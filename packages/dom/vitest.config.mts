import * as vitest from "@zphyrx/vitest-config";

import type { ViteUserConfig } from "vitest/config";

const config: ViteUserConfig = vitest.config({
  test: {
    environment: "node",
    coverage: {
      enabled: false,
    },
  },
});

export default config;
