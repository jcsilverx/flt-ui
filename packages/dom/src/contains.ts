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

import { isShadowRoot } from "./is-shadow-root";

const contains = (
  node: globalThis.Node | null,
  other: globalThis.Node | null,
): boolean => {
  if (node == null || other == null) {
    return false;
  }

  if (node.contains(other)) {
    return true;
  }

  let nextNode: globalThis.Node | null = other.parentNode;

  while (nextNode != null) {
    if (nextNode === node) {
      return true;
    }

    if (isShadowRoot(nextNode)) {
      nextNode = nextNode.host;
    } else {
      nextNode = nextNode.parentNode;
    }
  }

  return false;
};

export { contains };
