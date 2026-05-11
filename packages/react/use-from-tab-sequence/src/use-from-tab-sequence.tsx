/**
 * Copyright 2025 flt/ui. All rights reserved.
 *
 * This file is Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as React from "react";
import { fromTabSequence } from "@flt-ui/a11y";

import type { IncludedOrExcluded, PossibleNumber } from "@flt-ui/a11y";

type FromTabSequence = {
  getTabIndex: (disabled?: boolean) => PossibleNumber<IncludedOrExcluded>;
};

function useFromTabSequence(
  ...args: globalThis.Parameters<typeof fromTabSequence>
): FromTabSequence {
  return {
    getTabIndex: React.useMemo(() => {
      return fromTabSequence(...args);
    }, [args]),
  };
}

export { useFromTabSequence };
export type { FromTabSequence };
