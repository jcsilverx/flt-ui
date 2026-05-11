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
import { useIsoMorphicEffect } from "@flt-ui/react-use-iso-morphic-effect";

import { UID } from "./uid";

import type { UIDString } from "./uid";

const DEFAULT_PREFIX = "flt";

type IdString = UIDString;

type UseId = () => IdString;

function createUseId(prefix = DEFAULT_PREFIX): UseId {
  let uid: UID = new UID(prefix);

  const useId = ((): IdString => {
    let [id, setId] = React.useState<IdString>(`${prefix}-\u00AB\u00BB`);

    useIsoMorphicEffect(() => {
      setId(uid.random(3, 10));
    }, []);

    return id;
  }) as UseId;

  return useId;
}

const useId: UseId = createUseId(DEFAULT_PREFIX);

export { useId };
export type { IdString };

export { createUseId };
export type { UseId };
