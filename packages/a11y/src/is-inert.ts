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

import { getOwnerDocument } from "@flt-ui/dom";

const isInert = (element: globalThis.Element): boolean => {
  let ownerDocument = getOwnerDocument(element);
  let node: globalThis.Element | null = element;

  while (node != null) {
    let defaultView = ownerDocument.defaultView;

    if (
      defaultView != null &&
      node instanceof defaultView.HTMLElement &&
      node.inert
    ) {
      return true;
    }

    node = node.parentElement;
  }

  return false;
};

export { isInert };
