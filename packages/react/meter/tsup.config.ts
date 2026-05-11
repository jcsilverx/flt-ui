import * as tsup from "@zphyrx/tsup-config";

import type { TsupUserConfig } from "@zphyrx/tsup-config";

const config: TsupUserConfig = tsup.config({
  entry: ["src/**/*.ts*"],
  dts: true,
  splitting: false,
  platform: "browser",
});

export default config;
