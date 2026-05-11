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
import { useLatestValue } from "@flt-ui/react-use-latest-value";
import { EventHandler } from "@flt-ui/dom";

function useDocumentEvent<K extends keyof globalThis.DocumentEventMap>(
  enabled: boolean,
  type: K,
  listener: (event: globalThis.DocumentEventMap[K]) => void,
): void;
function useDocumentEvent<K extends keyof globalThis.DocumentEventMap>(
  enabled: boolean,
  type: K,
  listener: (event: globalThis.DocumentEventMap[K]) => void,
  options: boolean | globalThis.AddEventListenerOptions,
): void;

function useDocumentEvent<K extends keyof globalThis.DocumentEventMap>(
  enabled: boolean,
  type: K,
  listener: (event: globalThis.DocumentEventMap[K]) => void,
  options?: boolean | globalThis.AddEventListenerOptions,
): void {
  let listenerRef = useLatestValue(listener);

  React.useEffect(() => {
    if (!enabled) {
      return;
    }

    const handler = (event: globalThis.DocumentEventMap[K]): void => {
      listenerRef.current(event);

      return;
    };

    EventHandler.on(globalThis.document, type, handler, options);

    return (): void => {
      EventHandler.off(globalThis.document, type, handler, options);

      return;
    };
  }, [enabled, listenerRef, options, type]);

  return;
}

export { useDocumentEvent };
