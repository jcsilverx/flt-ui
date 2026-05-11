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

import { NODE_FILTER } from "./constants";

type ACCEPT_NODE = (node: globalThis.Node) => number;

type Traverse = {
  active: boolean;
  whatToShow: number;
  filter: {
    acceptNode: ACCEPT_NODE;
  } | null;
};

const traverse = (traverser: Traverse, node: globalThis.Node): number => {
  if (traverser.active) {
    throw new DOMException(
      "The traverser is already active.",
      "InvalidStateError",
    );
  }

  let mask = 1 << (node.nodeType - 1);

  if ((traverser.whatToShow & mask) === 0) {
    return NODE_FILTER.FILTER_SKIP;
  }

  if (traverser.filter === null) {
    return NODE_FILTER.FILTER_ACCEPT;
  }

  traverser.active = true;

  let result: number;

  try {
    result = traverser.filter.acceptNode(node);
  } catch (error) {
    traverser.active = false;

    throw error;
  }

  traverser.active = false;

  return result;
};

export { traverse };
export type { Traverse };
