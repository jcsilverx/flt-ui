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

import { isNode } from "./is-node";

const isShadowRoot = (node: unknown): node is globalThis.ShadowRoot => {
  return (
    node != null &&
    isNode(node) &&
    node.nodeType === globalThis.Node.DOCUMENT_FRAGMENT_NODE &&
    "host" in node
  );
};

export { isShadowRoot };
