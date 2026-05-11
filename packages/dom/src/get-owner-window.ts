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

import { getOwnerDocument } from "./get-owner-document";

type Window = typeof globalThis.window;

const getOwnerWindow = (
  element: (Window | globalThis.Element) | null | undefined,
): Window => {
  if (element != null && "window" in element) {
    return element.window;
  }

  let ownerDocument: globalThis.Document = getOwnerDocument(element);

  if (ownerDocument.defaultView == null) {
    return globalThis.window;
  }

  return ownerDocument.defaultView;
};

export { getOwnerWindow };
export type { Window };
